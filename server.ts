import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";

dotenv.config();

const PORT = 3000;

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Proxy audio with CORS headers so Web Audio API AnalyserNode works seamlessly
  app.get("/api/proxy-audio", async (req: Request, res: Response) => {
    const audioUrl = req.query.url as string;
    if (!audioUrl) {
      res.status(400).send("Missing audio url parameter");
      return;
    }

    try {
      const response = await fetch(audioUrl);
      if (!response.ok) {
        res.status(response.status).send(`Upstream audio fetch failed: ${response.statusText}`);
        return;
      }

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", response.headers.get("content-type") || "audio/mpeg");
      const contentLength = response.headers.get("content-length");
      if (contentLength) {
        res.setHeader("Content-Length", contentLength);
      }
      res.setHeader("Accept-Ranges", "bytes");

      const arrayBuffer = await response.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (err: any) {
      res.status(500).send(err?.message || "Failed to stream audio");
    }
  });

  // Vite middleware in development or static serve in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[PlayerServer] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Fatal error starting server:", err);
  process.exit(1);
});
