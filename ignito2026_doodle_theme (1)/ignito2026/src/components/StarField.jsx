import { useEffect, useRef } from 'react';

/**
 * Full-viewport canvas starfield.
 * - Multi-layer parallax stars (mouse + scroll driven)
 * - Occasional shooting stars
 * - Respects prefers-reduced-motion (falls back to static field)
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
      { count: 90, speed: 0.02, size: [0.4, 1.1], alpha: 0.5 },
      { count: 60, speed: 0.05, size: [0.8, 1.6], alpha: 0.75 },
      { count: 35, speed: 0.09, size: [1.2, 2.2], alpha: 1 },
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
        vx: 7 + Math.random() * 5,
        vy: 3 + Math.random() * 2,
        life: 0,
        maxLife: 45 + Math.random() * 20,
      });
    };

    let shootTimer = 0;
    let nextShootAt = 120 + Math.random() * 200;

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

      // subtle paper vignette (warm, not dark) — keeps edges from feeling flat
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.75
      );
      grad.addColorStop(0, 'rgba(17,17,17,0)');
      grad.addColorStop(1, 'rgba(17,17,17,0.06)');

      stars.forEach((s) => {
        const parallaxX = mouse.current.x * s.layer * 10;
        const parallaxY = mouse.current.y * s.layer * 10 + scrollY.current * s.speed * 0.15;
        let x = s.x + parallaxX;
        let y = (s.y + parallaxY) % height;
        if (y < 0) y += height;

        const twinkle = reduceMotion
          ? s.alpha
          : s.alpha * (0.5 + 0.5 * Math.sin(s.twinklePhase + t * 0.02 * s.twinkleSpeed));

        // hand-drawn asterisk mark instead of a plain dot — doodle vibe
        ctx.strokeStyle = `rgba(17,17,17,${twinkle * 0.8})`;
        ctx.lineWidth = Math.max(1, s.r * 0.6);
        const arm = s.r * 2.2;
        ctx.beginPath();
        ctx.moveTo(x - arm, y);
        ctx.lineTo(x + arm, y);
        ctx.moveTo(x, y - arm);
        ctx.lineTo(x, y + arm);
        ctx.stroke();
      });

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      if (!reduceMotion) {
        shootTimer++;
        if (shootTimer > nextShootAt) {
          spawnShootingStar();
          shootTimer = 0;
          nextShootAt = 180 + Math.random() * 260;
        }

        shootingStars.forEach((s) => {
          s.x += s.vx;
          s.y += s.vy;
          s.life++;
          const progress = s.life / s.maxLife;
          const alpha = 1 - progress;

          ctx.save();
          ctx.strokeStyle = `rgba(17,17,17,${alpha * 0.7})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 6, s.y - s.vy * 6);
          ctx.stroke();

          ctx.beginPath();
          ctx.fillStyle = `rgba(17,17,17,${alpha})`;
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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
