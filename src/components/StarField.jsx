import { useEffect, useRef } from 'react';

/**
 * Full-viewport canvas starfield — a real deep-space field, not a doodle.
 * - Multi-layer parallax stars with soft glow + twinkle (mouse + scroll driven)
 * - Slow-drifting colored nebula haze
 * - Occasional bright shooting stars with a glowing trail
 * - Respects prefers-reduced-motion (falls back to a static field)
 */
export default function StarField() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const LAYERS = [
      { count: 110, speed: 0.02, size: [0.5, 1.2], alpha: 0.5, color: '255,255,255' },
      { count: 70, speed: 0.05, size: [0.9, 1.8], alpha: 0.75, color: '190,225,255' },
      { count: 40, speed: 0.09, size: [1.3, 2.4], alpha: 1, color: '150,210,255' },
    ];

    let stars = [];
    const buildStars = () => {
      stars = [];
      LAYERS.forEach((layer, li) => {
        for (let i = 0; i < layer.count; i++) {
          stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
            layer: li,
            speed: layer.speed,
            alpha: layer.alpha,
            color: layer.color,
            twinklePhase: Math.random() * Math.PI * 2,
            twinkleSpeed: 0.5 + Math.random() * 1.2,
          });
        }
      });
    };
    buildStars();

    let shootingStars = [];
    const spawnShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width * 0.7 + width * 0.15,
        y: Math.random() * height * 0.25,
        vx: 9 + Math.random() * 6,
        vy: 3.5 + Math.random() * 2.5,
        life: 0,
        maxLife: 40 + Math.random() * 18,
      });
    };

    let shootTimer = 0;
    let nextShootAt = 110 + Math.random() * 180;

    const onMove = (e) => {
      mouse.current.x = (e.clientX / width - 0.5) * 2;
      mouse.current.y = (e.clientY / height - 0.5) * 2;
    };
    const onScroll = () => {
      scrollY.current = window.scrollY;
    };
    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      buildStars();
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    let raf;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep space base + slow-drifting nebula color washes
      const base = ctx.createLinearGradient(0, 0, 0, height);
      base.addColorStop(0, 'rgba(3,4,12,1)');
      base.addColorStop(1, 'rgba(8,11,26,1)');
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      const driftX = Math.sin(t * 0.0006) * width * 0.15;
      const driftY = Math.cos(t * 0.0004) * height * 0.1;

      const neb1 = ctx.createRadialGradient(
        width * 0.25 + driftX, height * 0.3 + driftY, 0,
        width * 0.25 + driftX, height * 0.3 + driftY, Math.max(width, height) * 0.5
      );
      neb1.addColorStop(0, 'rgba(139,92,246,0.10)');
      neb1.addColorStop(1, 'rgba(139,92,246,0)');
      ctx.fillStyle = neb1;
      ctx.fillRect(0, 0, width, height);

      const neb2 = ctx.createRadialGradient(
        width * 0.8 - driftX, height * 0.65 - driftY, 0,
        width * 0.8 - driftX, height * 0.65 - driftY, Math.max(width, height) * 0.45
      );
      neb2.addColorStop(0, 'rgba(34,211,238,0.08)');
      neb2.addColorStop(1, 'rgba(34,211,238,0)');
      ctx.fillStyle = neb2;
      ctx.fillRect(0, 0, width, height);

      stars.forEach((s) => {
        const parallaxX = mouse.current.x * s.layer * 10;
        const parallaxY = mouse.current.y * s.layer * 10 + scrollY.current * s.speed * 0.15;
        let x = s.x + parallaxX;
        let y = (s.y + parallaxY) % height;
        if (y < 0) y += height;

        const twinkle = reduceMotion
          ? s.alpha
          : s.alpha * (0.45 + 0.55 * Math.sin(s.twinklePhase + t * 0.02 * s.twinkleSpeed));

        // soft glow halo
        ctx.beginPath();
        const glow = ctx.createRadialGradient(x, y, 0, x, y, s.r * 4);
        glow.addColorStop(0, `rgba(${s.color},${twinkle * 0.5})`);
        glow.addColorStop(1, `rgba(${s.color},0)`);
        ctx.fillStyle = glow;
        ctx.arc(x, y, s.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // bright core
        ctx.beginPath();
        ctx.fillStyle = `rgba(${s.color},${twinkle})`;
        ctx.arc(x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduceMotion) {
        shootTimer++;
        if (shootTimer > nextShootAt) {
          spawnShootingStar();
          shootTimer = 0;
          nextShootAt = 170 + Math.random() * 240;
        }

        shootingStars.forEach((s) => {
          s.x += s.vx;
          s.y += s.vy;
          s.life++;
          const progress = s.life / s.maxLife;
          const alpha = 1 - progress;

          ctx.save();
          const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 9, s.y - s.vy * 9);
          grad.addColorStop(0, `rgba(255,255,255,${alpha})`);
          grad.addColorStop(1, 'rgba(34,211,238,0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 9, s.y - s.vy * 9);
          ctx.stroke();

          ctx.beginPath();
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.arc(s.x, s.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
        shootingStars = shootingStars.filter((s) => s.life < s.maxLife && s.x < width + 100 && s.y < height + 100);
      }

      t++;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 h-full w-full" aria-hidden="true" />;
}
