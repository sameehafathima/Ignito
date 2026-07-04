import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const particlesRef = useRef([]);
  const canvasRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(isFinePointer && !reduceMotion);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mx = width / 2;
    let my = height / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;

      particlesRef.current.push({
        x: mx,
        y: my,
        r: Math.random() * 1.6 + 0.6,
        life: 0,
        max: 22 + Math.random() * 10,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
      });
      if (particlesRef.current.length > 80) particlesRef.current.shift();

      const target = e.target;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('resize', onResize);

    let raf;
    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;

      ctx.clearRect(0, 0, width, height);
      particlesRef.current.forEach((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        const a = Math.max(0, 1 - p.life / p.max);
        ctx.beginPath();
        ctx.fillStyle = `rgba(17,17,17,${a * 0.7})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life < p.max);

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998]" aria-hidden="true" />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-[width,height,border-color] duration-200 ${
          hovering ? 'h-11 w-11 border-cyan bg-cyan/10' : 'h-7 w-7 border-ink/50'
        }`}
        aria-hidden="true"
      />
    </>
  );
}
