import React, { useEffect, useRef } from "react";
import { AudioEngine } from "../../services/audioEngine";
import { VisualizerType } from "../../types/music";

interface VisualizerCanvasProps {
  audioEngine: AudioEngine;
  isPlaying: boolean;
  type: VisualizerType;
  accentColor?: string;
  className?: string;
}

export function VisualizerCanvas({
  audioEngine,
  isPlaying,
  type,
  accentColor = "#6366f1",
  className = "",
}: VisualizerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 300);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 80);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (type === "bars") {
        const freqData = audioEngine.getFrequencyData();
        const barCount = Math.min(48, Math.floor(width / 7));
        const barWidth = Math.max(3, width / barCount - 2.5);

        for (let i = 0; i < barCount; i++) {
          const dataIdx = Math.floor((i / barCount) * freqData.length);
          const rawVal = freqData[dataIdx];
          // If not playing, keep a subtle ambient resting idle bar
          const value = isPlaying ? rawVal : 12 + Math.sin(Date.now() / 300 + i * 0.4) * 8;
          const barHeight = Math.max(4, (value / 255) * (height - 8));
          const x = i * (barWidth + 2.5);
          const y = height - barHeight;

          // Gradient bar
          const grad = ctx.createLinearGradient(0, height, 0, y);
          grad.addColorStop(0, accentColor);
          grad.addColorStop(1, "#f43f5e");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [2, 2, 0, 0]);
          ctx.fill();
        }
      } else if (type === "wave") {
        const timeData = audioEngine.getTimeDomainData();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = accentColor;
        ctx.shadowBlur = 8;
        ctx.shadowColor = accentColor;

        ctx.beginPath();
        const sliceWidth = width / timeData.length;
        let x = 0;

        for (let i = 0; i < timeData.length; i++) {
          const raw = timeData[i];
          const v = isPlaying ? raw / 128.0 : 1 + Math.sin(Date.now() / 400 + i * 0.1) * 0.08;
          const y = (v * height) / 2;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
          x += sliceWidth;
        }

        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else if (type === "circle") {
        const freqData = audioEngine.getFrequencyData();
        const centerX = width / 2;
        const centerY = height / 2;
        const baseRadius = Math.min(width, height) * 0.28;
        const count = 40;

        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          const dataIdx = Math.floor((i / count) * (freqData.length / 2));
          const val = isPlaying ? freqData[dataIdx] : 16 + Math.sin(Date.now() / 350 + i) * 10;
          const len = (val / 255) * (baseRadius * 0.7);

          const x1 = centerX + Math.cos(angle) * baseRadius;
          const y1 = centerY + Math.sin(angle) * baseRadius;
          const x2 = centerX + Math.cos(angle) * (baseRadius + len);
          const y2 = centerY + Math.sin(angle) * (baseRadius + len);

          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 3;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      resizeObserver.disconnect();
    };
  }, [audioEngine, isPlaying, type, accentColor]);

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
}
