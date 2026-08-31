"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const bloodGroups = [
  { name: "A+", color: "#dc2626" },
  { name: "A-", color: "#b91c1c" },
  { name: "B+", color: "#2563eb" },
  { name: "B-", color: "#1d4ed8" },
  { name: "AB+", color: "#7c3aed" },
  { name: "AB-", color: "#6d28d9" },
  { name: "O+", color: "#ea580c" },
  { name: "O-", color: "#c2410c" },
];

function BloodBag({
  color,
  animate,
}: {
  color: string;
  animate: boolean;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    const target = animate ? 0.08 : 0;

    group.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.7) * target;

    group.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.5) * target;
  });

  return (
    <group ref={group}>
      {/* Bag */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.4, 3.1, 0.65]} />
        <meshStandardMaterial
          color="#f8fafc"
          transparent
          opacity={0.92}
          roughness={0.3}
        />
      </mesh>

      {/* Blood inside */}
      <mesh position={[0, -0.25, 0.34]}>
        <boxGeometry args={[2.05, 2.35, 0.12]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.82}
          roughness={0.25}
        />
      </mesh>

      {/* Top tube */}
      <mesh position={[0, 1.8, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.75, 24]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      {/* Bottom tube */}
      <mesh position={[0, -1.95, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.55, 24]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>

      {/* Label */}
      <mesh position={[0, 0.65, 0.43]}>
        <boxGeometry args={[1.35, 0.65, 0.04]} />
        <meshStandardMaterial color="white" />
      </mesh>

      {/* Label mark */}
      <mesh position={[0, 0.65, 0.47]}>
        <boxGeometry args={[0.85, 0.12, 0.025]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Scene({
  color,
  animate,
}: {
  color: string;
  animate: boolean;
}) {
  return (
    <>
      <ambientLight intensity={1.5} />

      <directionalLight
        position={[4, 5, 5]}
        intensity={3}
      />

      <directionalLight
        position={[-4, 2, -3]}
        intensity={1.5}
      />

      <BloodBag color={color} animate={animate} />

      <OrbitControls
        enablePan={false}
        minDistance={4}
        maxDistance={8}
        enableDamping
      />
    </>
  );
}

export default function PlaygroundPage() {
  const [selectedGroup, setSelectedGroup] = useState("O+");
  const [animate, setAnimate] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const selected =
    bloodGroups.find((group) => group.name === selectedGroup) ??
    bloodGroups[6];

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    setReducedMotion(mediaQuery.matches);

    const handler = () => setReducedMotion(mediaQuery.matches);

    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const motionEnabled = animate && !reducedMotion;

  return (
    <main className="playground">
      <section className="playground-header">
        <div>
          <p className="eyebrow">BloodConnect · 3D Playground</p>

          <h1>Interactive Blood Bag</h1>

          <p className="description">
            Explore a lightweight 3D blood-bag experience and switch
            between blood groups.
          </p>
        </div>

        <div className="status">
          <span className="status-dot" />
          Interactive 3D
        </div>
      </section>

      <section className="experience">
        <div className="canvas-wrapper">
          <Canvas
            camera={{
              position: [0, 0, 6],
              fov: 45,
            }}
            dpr={[1, 1.5]}
            frameloop="always"
          >
            <Scene
              color={selected.color}
              animate={motionEnabled}
            />
          </Canvas>

          <div className="canvas-hint">
            Drag to rotate · Scroll to zoom
          </div>
        </div>

        <aside className="controls">
          <div className="control-section">
            <p className="control-label">Blood Group</p>

            <div className="group-grid">
              {bloodGroups.map((group) => (
                <button
                  key={group.name}
                  type="button"
                  className={`group-button ${
                    selectedGroup === group.name
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    setSelectedGroup(group.name)
                  }
                  aria-pressed={selectedGroup === group.name}
                >
                  <span
                    className="group-dot"
                    style={{
                      backgroundColor: group.color,
                    }}
                  />

                  {group.name}
                </button>
              ))}
            </div>
          </div>

          <div className="selected-card">
            <span>Selected blood group</span>

            <strong>{selectedGroup}</strong>

            <p>
              The 3D blood inside the bag changes when you
              select another blood group.
            </p>
          </div>

          <button
            type="button"
            className="motion-button"
            onClick={() => setAnimate((value) => !value)}
            disabled={reducedMotion}
          >
            {reducedMotion
              ? "Motion reduced by system"
              : motionEnabled
              ? "Pause animation"
              : "Play animation"}
          </button>

          <p className="accessibility-note">
            Keyboard accessible controls · Reduced-motion
            support included.
          </p>
        </aside>
      </section>

      <section className="tech-note">
        <div>
          <strong>Built with React Three Fiber</strong>
          <span>
            Lightweight geometry instead of a large external 3D
            model.
          </span>
        </div>

        <div>
          <strong>Performance</strong>
          <span>
            Low-poly primitives, capped device pixel ratio and
            no external model loading.
          </span>
        </div>

        <div>
          <strong>Mobile ready</strong>
          <span>
            Responsive layout with touch-friendly controls.
          </span>
        </div>
      </section>
    </main>
  );
}