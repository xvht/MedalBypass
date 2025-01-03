"use client";

import React from "react";
import staticAssets from "@/static";
import { useEffect, useRef, useCallback } from "react";

const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  interface Star {
    x: number;
    y: number;
    size: number;
    speed: number;
  }

  const animate = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      stars: Star[],
      canvas: HTMLCanvasElement,
    ) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size,
        );
        gradient.addColorStop(0, staticAssets.colors.first);
        gradient.addColorStop(1, staticAssets.colors.second);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        star.y = (star.y + star.speed) % canvas.height;
        star.x = (star.x + star.speed) % canvas.width;

        star.y = (star.y + star.speed) % canvas.height;
        ctx.fill();
      });

      requestAnimationFrame(() => animate(ctx, stars, canvas));
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    const stars = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2.2,
      speed: Math.random() * 0.5,
    }));

    animate(ctx, stars, canvas);

    return () => window.removeEventListener("resize", setSize);
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: "#111" }}
    />
  );
};

export default StarryBackground;
