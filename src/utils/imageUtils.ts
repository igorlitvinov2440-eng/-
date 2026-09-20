/**
 * Image processing utilities for product photo cleanup & background removal
 */

export async function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export async function urlToDataUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.referrerPolicy = "no-referrer";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Cap max dimension to 2048 to prevent memory blowup while keeping crisp resolution
      let { width, height } = img;
      const maxDim = 2048;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Unable to create canvas context"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      try {
        const dataUrl = canvas.toDataURL("image/png");
        resolve(dataUrl);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = (err) => reject(new Error(`Failed to load image from ${url}: ${err}`));
    img.src = url;
  });
}

export function downloadImage(dataUrl: string, filename = "cleaned-product-photo.png") {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function copyImageToClipboard(dataUrl: string): Promise<boolean> {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    if (navigator.clipboard && window.ClipboardItem) {
      const item = new ClipboardItem({ [blob.type]: blob });
      await navigator.clipboard.write([item]);
      return true;
    }
  } catch (e) {
    console.warn("Clipboard copy failed:", e);
  }
  return false;
}

/**
 * Local fast background transparency processor using flood-fill and corner color sampling
 */
export async function createTransparentCutout(
  sourceDataUrl: string,
  tolerance = 28,
  featherRadius = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context failed"));
        return;
      }
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      const width = canvas.width;
      const height = canvas.height;

      // Sample 4 corners to detect background color
      const sampleCorners = [
        [0, 0],
        [width - 1, 0],
        [0, height - 1],
        [width - 1, height - 1],
      ];

      const bgSamples = sampleCorners.map(([x, y]) => {
        const idx = (y * width + x) * 4;
        return [data[idx], data[idx + 1], data[idx + 2]];
      });

      // Average background color from corners
      const bgR = Math.round(bgSamples.reduce((s, c) => s + c[0], 0) / bgSamples.length);
      const bgG = Math.round(bgSamples.reduce((s, c) => s + c[1], 0) / bgSamples.length);
      const bgB = Math.round(bgSamples.reduce((s, c) => s + c[2], 0) / bgSamples.length);

      const colorDist = (r: number, g: number, b: number) => {
        return Math.sqrt(
          (r - bgR) ** 2 * 0.299 +
          (g - bgG) ** 2 * 0.587 +
          (b - bgB) ** 2 * 0.114
        );
      };

      // Mask array: 1 for foreground, 0 for background
      const mask = new Uint8Array(width * height);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const dist = colorDist(data[idx], data[idx + 1], data[idx + 2]);
          if (dist > tolerance) {
            mask[y * width + x] = 255;
          } else {
            mask[y * width + x] = 0;
          }
        }
      }

      // Apply feathered transparency mask
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pIdx = y * width + x;
          const idx = pIdx * 4;

          if (featherRadius > 0 && mask[pIdx] > 0) {
            // Count neighboring mask values for edge anti-aliasing
            let sum = 0;
            let count = 0;
            for (let dy = -featherRadius; dy <= featherRadius; dy++) {
              for (let dx = -featherRadius; dx <= featherRadius; dx++) {
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  sum += mask[ny * width + nx];
                  count++;
                }
              }
            }
            const alphaRatio = sum / (count * 255);
            data[idx + 3] = Math.round(alphaRatio * 255);
          } else {
            data[idx + 3] = mask[pIdx];
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = (e) => reject(e);
    img.src = sourceDataUrl;
  });
}
