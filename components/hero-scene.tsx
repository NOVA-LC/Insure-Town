"use client";

import { Suspense, useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Sparkles, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * A cinematic brass master-key built entirely from Three.js primitives.
 * Bow → decorative inner ring → neck collars → tapered shaft → bit with teeth.
 * No external GLTFs.
 */
function BrassKey({
  reduced,
  mobile,
  pointer,
}: {
  reduced: boolean;
  mobile: boolean;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<THREE.Group>(null);
  const wobble = useRef(0);
  const speed = reduced ? 0 : mobile ? 0.18 : 0.32;

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * speed;
    wobble.current += delta;
    const t = pointer.current;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      reduced ? 0 : t.y * 0.18 + Math.sin(wobble.current * 0.6) * 0.04,
      0.06,
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      reduced ? 0 : -t.x * 0.14,
      0.06,
    );
  });

  const brass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#d9b463"),
        metalness: 1,
        roughness: 0.22,
        clearcoat: 0.6,
        clearcoatRoughness: 0.35,
        reflectivity: 0.8,
        emissive: new THREE.Color("#4a3210"),
        emissiveIntensity: 0.28,
      }),
    [],
  );

  const brassDark = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#8a6a26"),
        metalness: 1,
        roughness: 0.42,
        emissive: new THREE.Color("#2b1d08"),
        emissiveIntensity: 0.2,
      }),
    [],
  );

  const enamel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#c8372d"),
        metalness: 0.4,
        roughness: 0.35,
        emissive: new THREE.Color("#3a0e0a"),
        emissiveIntensity: 0.3,
      }),
    [],
  );

  // Tooth heights for a realistic key-bit silhouette
  const teeth = [0.22, 0.42, 0.28, 0.5, 0.3, 0.44, 0.24];

  return (
    <group ref={group} scale={mobile ? 0.78 : 0.95} position={[0, 0.1, 0]}>
      {/* Entire key is rotated so it hangs vertically, bow up */}
      <group rotation={[0, 0, 0]}>
        {/* ── Bow (top ring) ─────────────────────────────────────── */}
        <group position={[0, 1.55, 0]}>
          {/* Outer ring */}
          <mesh material={brass}>
            <torusGeometry args={[0.85, 0.18, 28, 80]} />
          </mesh>
          {/* Dark groove inside outer ring (aged brass) */}
          <mesh material={brassDark} scale={[1, 1, 0.55]}>
            <torusGeometry args={[0.85, 0.19, 28, 80]} />
          </mesh>
          {/* Inner decorative ring */}
          <mesh material={brass}>
            <torusGeometry args={[0.5, 0.07, 20, 60]} />
          </mesh>
          {/* Four cross spokes inside the bow */}
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={i}
              material={brass}
              rotation={[0, 0, (Math.PI / 2) * i + Math.PI / 4]}
              position={[0, 0, 0]}
            >
              <boxGeometry args={[0.06, 1.35, 0.1]} />
            </mesh>
          ))}
          {/* Mayor-red enamel medallion at the center */}
          <mesh material={enamel} position={[0, 0, 0.01]}>
            <cylinderGeometry args={[0.22, 0.22, 0.05, 32]} />
          </mesh>
          {/* Brass rim around the medallion */}
          <mesh material={brass} position={[0, 0, 0.01]}>
            <torusGeometry args={[0.24, 0.04, 16, 48]} />
          </mesh>
          {/* A tiny brass stud at the very top of the bow */}
          <mesh material={brass} position={[0, 1.05, 0]}>
            <sphereGeometry args={[0.08, 24, 24]} />
          </mesh>
        </group>

        {/* ── Upper collar where bow meets shaft ───────────────── */}
        <mesh material={brass} position={[0, 0.68, 0]}>
          <cylinderGeometry args={[0.24, 0.18, 0.18, 32]} />
        </mesh>
        <mesh material={brassDark} position={[0, 0.59, 0]}>
          <cylinderGeometry args={[0.19, 0.19, 0.03, 32]} />
        </mesh>

        {/* ── Shaft (tapered) ──────────────────────────────────── */}
        <mesh material={brass} position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.14, 0.16, 1.45, 32]} />
        </mesh>

        {/* ── Lower collar ─────────────────────────────────────── */}
        <mesh material={brass} position={[0, -0.88, 0]}>
          <cylinderGeometry args={[0.22, 0.16, 0.16, 32]} />
        </mesh>

        {/* ── Bit plate (business end) ─────────────────────────── */}
        <mesh material={brass} position={[0.28, -1.18, 0]}>
          <boxGeometry args={[0.7, 0.45, 0.22]} />
        </mesh>
        {/* Shoulder between shaft and bit */}
        <mesh material={brassDark} position={[0.05, -1.0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.3, 0.08, 0.2]} />
        </mesh>

        {/* ── Teeth pattern ─────────────────────────────────────── */}
        {teeth.map((h, i) => {
          const x = -0.02 + i * 0.1;
          const y = -1.42 - h / 2;
          return (
            <mesh key={i} material={brass} position={[x, y, 0]}>
              <boxGeometry args={[0.085, h, 0.22]} />
            </mesh>
          );
        })}

        {/* Faint engraved line down the shaft (aged brass) */}
        <mesh material={brassDark} position={[0, -0.1, 0.16]}>
          <boxGeometry args={[0.02, 1.2, 0.01]} />
        </mesh>
      </group>
    </group>
  );
}

function Lights({ reduced }: { reduced: boolean }) {
  return (
    <>
      <ambientLight intensity={0.28} color="#f6efdd" />
      {/* Warm key light (mayor red undertone) */}
      <spotLight
        position={[3.2, 2.8, 4.5]}
        angle={0.75}
        penumbra={0.8}
        intensity={reduced ? 60 : 95}
        color="#ffb585"
        distance={14}
        decay={1.4}
        castShadow={false}
      />
      {/* Cool rim light */}
      <directionalLight position={[-4, 2, 3]} intensity={0.7} color="#d9cfa8" />
      {/* Fill from below-front */}
      <pointLight position={[0, -3, 3]} intensity={reduced ? 8 : 14} color="#c8372d" distance={10} decay={2} />
    </>
  );
}

export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const [reduced, setReduced] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      setReduced(mql.matches);
      setMobile(small.matches);
    };
    apply();
    mql.addEventListener("change", apply);
    small.addEventListener("change", apply);
    return () => {
      mql.removeEventListener("change", apply);
      small.removeEventListener("change", apply);
    };
  }, []);

  const onPointerMove = (e: React.PointerEvent) => {
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  };

  return (
    <div className="absolute inset-0" onPointerMove={onPointerMove} aria-hidden="true">
      <Canvas
        dpr={mobile ? 1 : [1, 2]}
        camera={{ position: [0, 0.2, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Lights reduced={reduced} />
          <Float
            speed={reduced ? 0 : 1.1}
            rotationIntensity={reduced ? 0 : 0.12}
            floatIntensity={reduced ? 0 : 0.55}
          >
            <BrassKey reduced={reduced} mobile={mobile} pointer={pointer} />
          </Float>
          {!reduced && (
            <Sparkles
              count={mobile ? 22 : 48}
              scale={[6, 4, 2]}
              size={mobile ? 2 : 3.2}
              speed={0.35}
              color="#f3dd9e"
              noise={0.6}
            />
          )}
          <ContactShadows
            position={[0, -1.95, 0]}
            opacity={0.55}
            blur={3.2}
            scale={6}
            far={4}
            color="#0b0a08"
          />
          <Environment preset="sunset" />
          {!mobile && (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={0.75}
                luminanceThreshold={0.3}
                luminanceSmoothing={0.22}
                mipmapBlur
              />
              <ChromaticAberration
                offset={new THREE.Vector2(0.0006, 0.001)}
                radialModulation={false}
                modulationOffset={0}
              />
              <Vignette eskil={false} offset={0.18} darkness={0.7} />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
