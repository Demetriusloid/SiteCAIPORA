"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function srand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Floresta amazônica feita inteiramente de pontos — estilo varredura LIDAR.
 * Cada árvore: tronco = linha vertical de pontos castanho; copa = esfera de pontos verdes.
 * Cor por altura: profundo nas raízes, vivo nas copas.
 */
function makeCircleTexture() {
  const c = typeof document !== "undefined" ? document.createElement("canvas") : null;
  if (!c) return null;
  c.width = 64;
  c.height = 64;
  const ctx = c.getContext("2d");
  if (!ctx) return null;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.55, "rgba(255,255,255,1)");
  grad.addColorStop(0.85, "rgba(255,255,255,0.55)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function PointForest({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const circleTex = useMemo(() => makeCircleTexture(), []);

  const { geometry, baseY } = useMemo(() => {
    // Grade espaçada (11x11 = 121 cells, célula removida para câmera)
    const GRID = 11;
    const SPACING = 2.6;
    const TREE_COUNT = GRID * GRID;
    const TRUNK_POINTS = 140;
    const CANOPY_POINTS = 220;
    const PER_TREE = TRUNK_POINTS + CANOPY_POINTS;
    const TOTAL = TREE_COUNT * PER_TREE;

    const positions = new Float32Array(TOTAL * 3);
    const colors = new Float32Array(TOTAL * 3);
    const base = new Float32Array(TOTAL);

    const cTrunk = new THREE.Color("#7a5230");
    const cTrunkTop = new THREE.Color("#a07040");
    const cLow = new THREE.Color("#2d6a45");
    const cMid = new THREE.Color("#5BC97A");
    const cHigh = new THREE.Color("#c8f5d4");
    const cWarm = new THREE.Color("#f0d090");
    const tmp = new THREE.Color();

    let idx = 0;
    for (let t = 0; t < TREE_COUNT; t++) {
      // Grade espaçada com jitter — árvores não se misturam
      const gx = (t % GRID) - (GRID - 1) / 2;
      const gz = Math.floor(t / GRID) - (GRID - 1) / 2;
      const tx = gx * SPACING + (srand(t * 3.11) - 0.5) * 1.1;
      const tz = gz * SPACING + (srand(t * 5.31) - 0.5) * 1.1 - 2;

      // Pula árvores muito próximas da câmera (clareira ao redor de quem olha)
      const distFromCam = Math.sqrt(tx * tx + (tz + 4) * (tz + 4));
      if (distFromCam < 1.8) {
        for (let k = 0; k < PER_TREE; k++) {
          positions[idx * 3] = 9999;
          positions[idx * 3 + 1] = -9999;
          positions[idx * 3 + 2] = 9999;
          base[idx] = -9999;
          idx++;
        }
        continue;
      }

      // Altura amazônica
      const height = 6 + srand(t * 7.21) * 7;
      const canopyR = 1.3 + srand(t * 13.7) * 1.6;
      const canopyOffset = canopyR * 0.55 + 0.3;
      // Troncos finos e tight — leitura de árvore individual
      const trunkRadius = 0.08 + srand(t * 9.7) * 0.05;

      // Tronco: linha vertical com leve jitter
      for (let i = 0; i < TRUNK_POINTS; i++) {
        const ty = (i / (TRUNK_POINTS - 1)) * height;
        const a = srand(t * 100 + i * 7) * Math.PI * 2;
        const r = trunkRadius * (0.6 + srand(t * 200 + i * 5) * 0.6);
        positions[idx * 3] = tx + Math.cos(a) * r;
        positions[idx * 3 + 1] = ty;
        positions[idx * 3 + 2] = tz + Math.sin(a) * r;
        base[idx] = ty;
        const tNorm = i / (TRUNK_POINTS - 1);
        tmp.copy(cTrunk).lerp(cTrunkTop, tNorm);
        colors[idx * 3] = tmp.r;
        colors[idx * 3 + 1] = tmp.g;
        colors[idx * 3 + 2] = tmp.b;
        idx++;
      }

      // Copa: nuvem esférica de pontos (achatada um pouco)
      const cy = height + canopyOffset;
      for (let i = 0; i < CANOPY_POINTS; i++) {
        const theta = srand(t * 300 + i * 7.1) * Math.PI * 2;
        const phi = Math.acos(2 * srand(t * 400 + i * 11.3) - 1);
        const rNorm = Math.pow(srand(t * 500 + i * 13.7), 0.5);
        const r = canopyR * rNorm;
        const px = Math.sin(phi) * Math.cos(theta) * r;
        const py = Math.cos(phi) * r * 0.78; // achatada
        const pz = Math.sin(phi) * Math.sin(theta) * r;
        positions[idx * 3] = tx + px;
        positions[idx * 3 + 1] = cy + py;
        positions[idx * 3 + 2] = tz + pz;
        base[idx] = cy + py;

        // Cor: gradiente por altura dentro da copa + leve chance de ponto quente (sol)
        const norm = (py + canopyR) / (2 * canopyR);
        if (srand(t * 600 + i * 17.3) < 0.04) {
          tmp.copy(cWarm);
        } else if (norm < 0.5) {
          tmp.copy(cLow).lerp(cMid, norm * 2);
        } else {
          tmp.copy(cMid).lerp(cHigh, (norm - 0.5) * 2);
        }
        colors[idx * 3] = tmp.r;
        colors[idx * 3 + 1] = tmp.g;
        colors[idx * 3 + 2] = tmp.b;
        idx++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geometry: geo, baseY: base };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const scroll = scrollRef.current;

    // Respiração da mata — copa pulsa com o vento
    const positions = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const breath = Math.sin(x * 0.5 + t * 0.7) * Math.cos(z * 0.4 - t * 0.5) * 0.05;
      positions.setY(i, baseY[i] + breath);
    }
    positions.needsUpdate = true;

    // Câmera gira ao redor + sway natural + pequeno avanço
    ref.current.rotation.y = Math.sin(t * 0.07) * 0.04 + scroll * 0.001;
    ref.current.position.y = Math.sin(t * 0.13) * 0.04;
    ref.current.position.z = scroll * 0.004;

    const mat = ref.current.material as THREE.PointsMaterial;
    mat.opacity = Math.max(0, 1 - scroll * 0.0012);
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.07}
        vertexColors
        map={circleTex ?? undefined}
        alphaMap={circleTex ?? undefined}
        transparent
        opacity={1}
        sizeAttenuation
        depthWrite={false}
        alphaTest={0.02}
      />
    </points>
  );
}

function Spores({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 300;
  const circleTex = useMemo(() => makeCircleTexture(), []);

  const { geometry, speeds } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sp = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = Math.random() * 9 + 0.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 4;
      sp[i] = 0.04 + Math.random() * 0.14;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: g, speeds: sp };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime;
    const positions = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < positions.count; i++) {
      const x0 = positions.getX(i);
      const y0 = positions.getY(i);
      const dy = Math.sin(t * speeds[i] + i) * 0.006;
      const dx = Math.cos(t * speeds[i] * 0.7 + i * 1.3) * 0.005;
      positions.setX(i, x0 + dx);
      positions.setY(i, y0 + dy);
    }
    positions.needsUpdate = true;
    ref.current.rotation.y = scrollRef.current * 0.001;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.06}
        color="#dff5dc"
        map={circleTex ?? undefined}
        alphaMap={circleTex ?? undefined}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        alphaTest={0.02}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroCanvas() {
  const scrollRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ fov: 60 }}
        onCreated={({ camera }) => {
          camera.position.set(0, 1.8, 5.5);
          camera.lookAt(0, 6, -3);
          camera.updateProjectionMatrix();
        }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        dpr={[1, 2]}
      >
        <fog attach="fog" args={["#06120C", 8, 38]} />
        <PointForest scrollRef={scrollRef} />
        <Spores scrollRef={scrollRef} />
      </Canvas>
    </div>
  );
}
