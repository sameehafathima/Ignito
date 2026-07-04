import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Trail } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Procedural 3D solar system, built entirely from primitive geometry so no
 * external model/texture download is required. A glowing sun at the core,
 * a handful of orbiting planets (one ringed like Saturn, one with a moon),
 * a faint asteroid belt, and a comet on a long trail. Reacts gently to
 * pointer position for parallax, replacing the old astronaut figure with
 * something that reads as "part of space" rather than a lone character.
 */

function Sun() {
  const core = useRef(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (core.current) core.current.rotation.y = t * 0.08;
  });
  return (
    <group>
      <pointLight color="#ffd9a0" intensity={3.2} distance={12} decay={2} />
      <mesh ref={core}>
        <sphereGeometry args={[0.52, 32, 32]} />
        <meshStandardMaterial
          color="#ffb454"
          emissive="#ff8a2b"
          emissiveIntensity={2.2}
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>
      {/* soft corona */}
      <mesh>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial color="#ff9d4d" transparent opacity={0.18} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.95, 24, 24]} />
        <meshBasicMaterial color="#ffb454" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

function Ring({ inner, outer, color, opacity = 0.55, tilt = 1.25 }) {
  return (
    <mesh rotation={[tilt, 0, 0]}>
      <ringGeometry args={[inner, outer, 64]} />
      <meshBasicMaterial color={color} side={THREE.DoubleSide} transparent opacity={opacity} />
    </mesh>
  );
}

function Planet({ radius, size, color, emissive, speed, tilt = 0, hasRing, hasMoon, offset = 0 }) {
  const orbit = useRef(null);
  const spin = useRef(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    if (orbit.current) {
      orbit.current.position.x = Math.cos(t) * radius;
      orbit.current.position.z = Math.sin(t) * radius;
    }
    if (spin.current) spin.current.rotation.y += 0.01;
  });

  return (
    <group ref={orbit}>
      <group ref={spin} rotation={[0, 0, tilt]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[size, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive || color}
            emissiveIntensity={0.18}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
        {hasRing && <Ring inner={size * 1.5} outer={size * 2.3} color={color} />}
        {hasMoon && (
          <mesh position={[size * 2.1, 0, 0]}>
            <sphereGeometry args={[size * 0.28, 12, 12]} />
            <meshStandardMaterial color="#cbd5e1" roughness={0.9} />
          </mesh>
        )}
      </group>
    </group>
  );
}

function OrbitRing({ radius, opacity = 0.16 }) {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.006, radius + 0.006, 128]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Comet() {
  const ref = useRef(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.35;
    if (ref.current) {
      ref.current.position.set(Math.cos(t) * 3.6, Math.sin(t * 0.7) * 0.6, Math.sin(t) * 3.6);
    }
  });
  return (
    <Trail width={2.2} length={7} color="#67e8f9" attenuation={(w) => w * w}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#e0f2fe" toneMapped={false} />
      </mesh>
    </Trail>
  );
}

function System({ mouse }) {
  const group = useRef(null);

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += 0.0009;
    const targetX = mouse.current.y * 0.18;
    const targetZ = mouse.current.x * 0.12;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.03;
    group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.03;
  });

  const planets = useMemo(
    () => [
      { radius: 1.05, size: 0.09, color: '#c2b280', speed: 0.9, offset: 0.2 },
      { radius: 1.5, size: 0.14, color: '#7dd3fc', emissive: '#38bdf8', speed: 0.62, offset: 2.1 },
      { radius: 1.95, size: 0.12, color: '#f97316', speed: 0.48, tilt: 0.3, offset: 4.0, hasMoon: true },
      { radius: 2.5, size: 0.24, color: '#facc78', speed: 0.32, tilt: 0.4, offset: 1.1, hasRing: true },
      { radius: 3.05, size: 0.17, color: '#a78bfa', emissive: '#8b5cf6', speed: 0.24, offset: 3.3 },
    ],
    []
  );

  return (
    <group ref={group} rotation={[0.32, 0, 0]}>
      <Sun />
      {planets.map((p, i) => (
        <group key={i}>
          <OrbitRing radius={p.radius} />
          <Planet {...p} />
        </group>
      ))}
      <Comet />
    </group>
  );
}

export default function SolarSystem3D({ className = '' }) {
  const [ready, setReady] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    mouse.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    };
  };

  return (
    <div
      className={`relative h-full w-full select-none ${className}`}
      aria-hidden="true"
      onPointerMove={handlePointerMove}
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 1s ease' }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.6, 5.6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setReady(true)}
      >
        <ambientLight intensity={0.25} color="#8ea2ff" />

        <Suspense fallback={null}>
          <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.6}>
            <System mouse={mouse} />
          </Float>
          <Sparkles count={140} scale={[9, 6, 9]} size={1.4} speed={0.25} color="#cfe8ff" opacity={0.5} />
        </Suspense>
      </Canvas>
    </div>
  );
}
