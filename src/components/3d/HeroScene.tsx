import React, { useRef, useState, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  theme: 'dark' | 'light';
  wireframe?: boolean;
  interactiveSpeed?: number;
}

// Procedural multi-part futuristic metallic core
function FuturisticArtifact({ theme, wireframe, interactiveSpeed = 1 }: SceneProps) {
  const outerGroup = useRef<THREE.Group>(null);
  const coreMesh = useRef<THREE.Mesh>(null);
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const satelliteGroup = useRef<THREE.Group>(null);

  const isDark = theme === 'dark';

  // Smooth mouse follower tracking
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      // Normalized between -1 and 1
      mouse.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((_, delta) => {
    // Exponential damping for mouse tracking
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * (delta * 2.5);
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * (delta * 2.5);

    if (outerGroup.current) {
      outerGroup.current.rotation.y += delta * 0.25 * interactiveSpeed;
      outerGroup.current.rotation.x = mouse.current.y * 0.35;
      outerGroup.current.rotation.z = mouse.current.x * 0.2;
    }

    if (coreMesh.current) {
      coreMesh.current.rotation.y -= delta * 0.45 * interactiveSpeed;
      coreMesh.current.rotation.x += delta * 0.3 * interactiveSpeed;
    }

    if (ring1.current) {
      ring1.current.rotation.x += delta * 0.35 * interactiveSpeed;
      ring1.current.rotation.y += delta * 0.2 * interactiveSpeed;
    }

    if (ring2.current) {
      ring2.current.rotation.y -= delta * 0.3 * interactiveSpeed;
      ring2.current.rotation.z += delta * 0.25 * interactiveSpeed;
    }

    if (ring3.current) {
      ring3.current.rotation.z += delta * 0.2 * interactiveSpeed;
      ring3.current.rotation.x -= delta * 0.15 * interactiveSpeed;
    }

    if (satelliteGroup.current) {
      satelliteGroup.current.rotation.y += delta * 0.5 * interactiveSpeed;
    }
  });

  const metallicColor = isDark ? '#e2e8f0' : '#1e293b';
  const ringColor = isDark ? '#94a3b8' : '#334155';
  const accentGlow = isDark ? '#38bdf8' : '#0284c7';

  return (
    <group ref={outerGroup}>
      {/* 1. Core Faceted Crystal / Octahedron Geometry */}
      <mesh ref={coreMesh}>
        <octahedronGeometry args={[1.1, 1]} />
        <meshPhysicalMaterial
          color={metallicColor}
          metalness={0.92}
          roughness={0.12}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          wireframe={wireframe}
        />
      </mesh>

      {/* Internal inner core wireframe */}
      <mesh>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshBasicMaterial
          color={accentGlow}
          wireframe
          transparent
          opacity={isDark ? 0.45 : 0.25}
        />
      </mesh>

      {/* 2. Primary Gimbal Ring (Inner) */}
      <mesh ref={ring1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.7, 0.035, 16, 64]} />
        <meshStandardMaterial
          color={ringColor}
          metalness={0.95}
          roughness={0.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* 3. Secondary Gimbal Ring (Mid) */}
      <mesh ref={ring2} rotation={[0, Math.PI / 3, Math.PI / 6]}>
        <torusGeometry args={[2.05, 0.025, 16, 64]} />
        <meshStandardMaterial
          color={ringColor}
          metalness={0.9}
          roughness={0.25}
          wireframe={wireframe}
        />
      </mesh>

      {/* 4. Outer Celestial Orbit Ring */}
      <mesh ref={ring3} rotation={[-Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[2.45, 0.018, 16, 80]} />
        <meshStandardMaterial
          color={metallicColor}
          metalness={0.98}
          roughness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* 5. Orbital Satellite Markers */}
      <group ref={satelliteGroup}>
        {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => {
          const radius = 2.05;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          return (
            <mesh key={i} position={[x, 0, z]}>
              <boxGeometry args={[0.08, 0.08, 0.08]} />
              <meshStandardMaterial
                color={accentGlow}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

// Background subtle floating particle dust
function AmbientParticles({ count = 80, theme }: { count?: number; theme: 'dark' | 'light' }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  const particleColor = theme === 'dark' ? '#94a3b8' : '#475569';

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={particleColor}
        transparent
        opacity={theme === 'dark' ? 0.6 : 0.4}
        sizeAttenuation
      />
    </points>
  );
}

// 2D Fallback for mobile / reduced-motion or WebGL-unsupported environments
function FallbackVisual({ theme }: { theme: 'dark' | 'light' }) {
  const isDark = theme === 'dark';
  return (
    <div className="w-full h-full flex items-center justify-center select-none pointer-events-none">
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
        <div
          className={`absolute inset-0 rounded-full border border-dashed animate-spin ${
            isDark ? 'border-neutral-700' : 'border-neutral-300'
          }`}
          style={{ animationDuration: '40s' }}
        />
        <div
          className={`absolute w-3/4 h-3/4 rounded-full border ${
            isDark ? 'border-cyan-500/30' : 'border-sky-500/30'
          } animate-spin`}
          style={{ animationDuration: '25s', animationDirection: 'reverse' }}
        />
        <div
          className={`w-28 h-28 rounded-2xl rotate-45 border ${
            isDark ? 'border-neutral-400 bg-neutral-900/50' : 'border-neutral-600 bg-neutral-100/50'
          } flex items-center justify-center backdrop-blur-sm shadow-2xl`}
        >
          <div className={`w-12 h-12 rounded-lg ${isDark ? 'bg-cyan-500/20' : 'bg-sky-500/20'} border border-cyan-400/50`} />
        </div>
      </div>
    </div>
  );
}

export function HeroScene({ theme }: { theme: 'dark' | 'light' }) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [wireframe, setWireframe] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check WebGL availability safely
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    // Check prefers-reduced-motion
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (hasWebGL === false || prefersReducedMotion) {
    return <FallbackVisual theme={theme} />;
  }

  return (
    <div className="relative w-full h-[280px] xs:h-[320px] sm:h-[400px] md:h-[480px] lg:h-[540px] max-w-full overflow-hidden">
      <Suspense fallback={<FallbackVisual theme={theme} />}>
        <Canvas
          camera={{ position: [0, 0, isMobile ? 6.6 : 5.8], fov: 45 }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        >
          {/* Balanced Studio Lighting Rig */}
          <ambientLight intensity={theme === 'dark' ? 0.6 : 0.9} />
          
          {/* Key Light */}
          <directionalLight
            position={[5, 8, 5]}
            intensity={theme === 'dark' ? 2.4 : 1.8}
            color="#ffffff"
          />
          
          {/* Cool Fill Light */}
          <directionalLight
            position={[-5, -4, -3]}
            intensity={theme === 'dark' ? 1.2 : 0.8}
            color={theme === 'dark' ? '#38bdf8' : '#60a5fa'}
          />

          {/* Warm Rim Light */}
          <directionalLight
            position={[0, -5, 4]}
            intensity={0.6}
            color="#e2e8f0"
          />

          <Float
            speed={1.5 * speedMultiplier}
            rotationIntensity={0.6}
            floatIntensity={0.8}
          >
            <FuturisticArtifact
              theme={theme}
              wireframe={wireframe}
              interactiveSpeed={speedMultiplier}
            />
          </Float>

          <AmbientParticles theme={theme} count={60} />
        </Canvas>
      </Suspense>

      {/* Ergonomic Minimal 3D Controls Dock (Non-intrusive) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-700/50 bg-neutral-900/80 backdrop-blur-md text-[11px] font-mono tracking-wider text-neutral-300 shadow-xl transition-opacity hover:opacity-100 opacity-70">
        <span className="text-neutral-500 uppercase select-none">3D CORE</span>
        <span className="text-neutral-700">|</span>
        <button
          type="button"
          onClick={() => setWireframe(!wireframe)}
          aria-label="Toggle 3D wireframe lattice mode"
          className={`px-2 py-0.5 rounded transition-colors ${
            wireframe ? 'bg-cyan-500/20 text-cyan-400 font-semibold' : 'hover:text-white'
          }`}
          title="Toggle Wireframe mode"
        >
          {wireframe ? 'SOLID' : 'LATTICE'}
        </button>
        <span className="text-neutral-700">|</span>
        <button
          type="button"
          onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 0.3 : prev === 0.3 ? 1.8 : 1))}
          aria-label="Adjust 3D rotation velocity"
          className="px-2 py-0.5 rounded hover:text-white transition-colors"
          title="Adjust rotation velocity"
        >
          {speedMultiplier === 1 ? '1x SPD' : speedMultiplier === 0.3 ? '0.3x SPD' : '1.8x SPD'}
        </button>
      </div>
    </div>
  );
}
