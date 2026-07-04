import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, ContactShadows, Edges } from '@react-three/drei';

/**
 * Procedural low-poly astronaut, built from primitive geometry so no
 * external model download is required. Reacts to pointer position for a
 * subtle parallax "look-at-cursor" effect, and gently rotates + bobs.
 */
function AstronautRig({ mouse }) {
  const group = useRef(null);
  const helmet = useRef(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // idle rotation
    group.current.rotation.y += 0.0022;
    // pointer parallax
    const targetX = mouse.current.y * 0.25;
    const targetY = mouse.current.x * 0.4;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
    group.current.rotation.z += (targetY * 0.15 - group.current.rotation.z) * 0.04;
    if (helmet.current) {
      helmet.current.position.y = 1.55 + Math.sin(t * 1.1) * 0.02;
    }
  });

  const flatMat = { flatShading: true, roughness: 0.7, metalness: 0.05 };
  const ink = { color: '#111111', threshold: 1 };

  return (
    <group ref={group} scale={1.05} position={[0, -0.2, 0]}>
      {/* backpack */}
      <mesh position={[0, 0.55, -0.42]} castShadow receiveShadow>
        <boxGeometry args={[0.62, 0.85, 0.32]} />
        <meshStandardMaterial color="#9aa0ab" {...flatMat} />
        <Edges {...ink} />
      </mesh>

      {/* torso */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.46, 0.56, 1.05, 7]} />
        <meshStandardMaterial color="#d7dade" {...flatMat} />
        <Edges {...ink} />
      </mesh>

      {/* chest panel */}
      <mesh position={[0, 0.62, 0.42]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.34, 0.28, 0.06]} />
        <meshStandardMaterial color="#2a2c31" flatShading roughness={0.5} />
        <Edges {...ink} />
      </mesh>

      {/* hip joint */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.5, 0.4, 0.32, 7]} />
        <meshStandardMaterial color="#9198a3" {...flatMat} />
        <Edges {...ink} />
      </mesh>

      {/* legs */}
      {[-0.22, 0.22].map((x, i) => (
        <group key={i} position={[x, -0.62, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.16, 0.14, 0.7, 6]} />
            <meshStandardMaterial color="#c3c7cd" {...flatMat} />
            <Edges {...ink} />
          </mesh>
          <mesh position={[0, -0.5, 0.06]}>
            <boxGeometry args={[0.22, 0.16, 0.36]} />
            <meshStandardMaterial color="#1f2024" flatShading roughness={0.8} />
            <Edges {...ink} />
          </mesh>
        </group>
      ))}

      {/* arms */}
      {[-0.62, 0.62].map((x, i) => (
        <group key={i} position={[x, 0.55, 0.05]} rotation={[0, 0, i === 0 ? 0.35 : -0.35]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.15, 0.13, 0.75, 6]} />
            <meshStandardMaterial color="#c3c7cd" {...flatMat} />
            <Edges {...ink} />
          </mesh>
          <mesh position={[0, -0.46, 0]}>
            <sphereGeometry args={[0.15, 6, 5]} />
            <meshStandardMaterial color="#9aa0ab" {...flatMat} />
            <Edges {...ink} />
          </mesh>
        </group>
      ))}

      {/* neck ring */}
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.28, 0.3, 0.14, 8]} />
        <meshStandardMaterial color="#7d838d" flatShading />
        <Edges {...ink} />
      </mesh>

      {/* helmet */}
      <group ref={helmet} position={[0, 1.55, 0]}>
        <mesh castShadow>
          <icosahedronGeometry args={[0.46, 1]} />
          <meshStandardMaterial color="#eceef0" flatShading roughness={0.55} metalness={0.05} />
          <Edges {...ink} />
        </mesh>
        {/* visor */}
        <mesh position={[0, -0.02, 0.28]} rotation={[0.05, 0, 0]}>
          <sphereGeometry args={[0.3, 8, 6, 0, Math.PI * 2, 0, Math.PI * 0.62]} />
          <meshStandardMaterial
            color="#0f0f0f"
            emissive="#1a1a1a"
            emissiveIntensity={0.25}
            metalness={0.9}
            roughness={0.15}
            flatShading
          />
          <Edges color="#111111" threshold={1} />
        </mesh>
      </group>
    </group>
  );
}

function Rig() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current = { x, y };
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.9}>
      <AstronautRig mouse={mouse} />
    </Float>
  );
}

export default function Astronaut3D({ className = '' }) {
  const [ready, setReady] = useState(false);

  return (
    <div
      className={`relative h-full w-full select-none ${className}`}
      aria-hidden="true"
      style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.8s ease' }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.3, 4.4], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={() => setReady(true)}
      >
        <ambientLight intensity={0.75} />
        <directionalLight position={[3, 4, 2]} intensity={1.3} color="#ffffff" castShadow />
        <pointLight position={[-3, -1, -2]} intensity={0.5} color="#dddddd" />
        <pointLight position={[2, -2, 2]} intensity={0.4} color="#bbbbbb" />

        <Suspense fallback={null}>
          <Rig />
          <Sparkles count={40} scale={[4, 4, 4]} size={2} speed={0.35} color="#111111" opacity={0.35} />
          <ContactShadows position={[0, -1.1, 0]} opacity={0.28} scale={5} blur={2.5} far={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
