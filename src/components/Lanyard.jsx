'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Textures generated dynamically on canvas to remove image dependencies and speed up loading
  const [cardTextureFront, setCardTextureFront] = useState(null);
  const [cardTextureBack, setCardTextureBack] = useState(null);

  // Generate procedural canvas textures for the card
  useEffect(() => {
    const canvasFront = document.createElement('canvas');
    canvasFront.width = 512;
    canvasFront.height = 720;
    const ctx = canvasFront.getContext('2d');

    const drawFront = (img = null) => {
      // 1. Sleek dark gradient background
      const grad = ctx.createLinearGradient(0, 0, 0, 720);
      grad.addColorStop(0, '#09090b'); // zinc-950
      grad.addColorStop(0.5, '#18181b'); // zinc-900
      grad.addColorStop(1, '#020617'); // slate-950
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 512, 720);

      // 2. Futuristic grid overlay
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.08)'; // faint indigo
      ctx.lineWidth = 1;
      for (let i = 0; i < 512; i += 32) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 720); ctx.stroke();
      }
      for (let i = 0; i < 720; i += 32) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
      }

      // 3. Dual glowing top accent lines
      ctx.fillStyle = '#6366f1'; // indigo
      ctx.fillRect(40, 20, 432, 6);
      ctx.fillStyle = '#ec4899'; // pink
      ctx.fillRect(40, 26, 432, 3);

      // 4. Header title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('PORTFOLIO ACCESS PASS', 256, 75);

      // 5. Image frame positioning
      const avatarSize = 200;
      const avatarX = 256 - avatarSize / 2;
      const avatarY = 130;

      // Draw photo frame/border
      ctx.strokeStyle = '#6366f1';
      ctx.lineWidth = 4;
      ctx.strokeRect(avatarX - 4, avatarY - 4, avatarSize + 8, avatarSize + 8);

      if (img) {
        // Draw photo
        ctx.save();
        ctx.filter = 'brightness(0.6)';
        ctx.drawImage(img, avatarX, avatarY, avatarSize, avatarSize);
        ctx.restore()
      } else {
        // Default monogram fallback if image not ready
        ctx.fillStyle = '#27272a'; // zinc-800
        ctx.fillRect(avatarX, avatarY, avatarSize, avatarSize);
        ctx.fillStyle = '#a1a1aa'; // zinc-400
        ctx.font = 'bold 72px sans-serif';
        ctx.fillText('CR', 256, avatarY + 120);
      }

      // 6. Name
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText('CHRISTIAN LLYOD G. RIVERA', 256, 395);

      // 7. Subtitle
      ctx.fillStyle = '#6366f1'; // indigo
      ctx.font = 'bold 25px monospace';
      ctx.fillText('FULL-STACK DEVELOPER', 256, 430);
      ctx.shadowBlur = 0;
      // 8. Separator
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(60, 470);
      ctx.lineTo(452, 470);
      ctx.stroke();

      // 9. Details Fields
      ctx.fillStyle = '#a1a1aa'; // zinc-400
      ctx.font = '20px monospace';
      ctx.textAlign = 'left';
      ctx.fillText('ID NUMBER:  2026-CR-0162', 72, 525);
      ctx.fillText('LOCATION:   Cebu, PH', 72, 555);
      ctx.fillText('CLASSIF:    Dean\'s Lister', 72, 585);
      ctx.shadowBlur = 0;

      // 10. Barcode element
      ctx.fillStyle = '#ffffff';
      for (let x = 70; x < 442; x += Math.random() > 0.45 ? 6 : 12) {
        const barWidth = Math.random() > 0.5 ? 2 : 4;
        ctx.fillRect(x, 615, barWidth, 40);
      }
      ctx.fillStyle = '#71717a'; // zinc-500
      ctx.font = '12px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('* 0162 2026 RIVERA *', 256, 675);

      // Generate CanvasTexture
      const tex = new THREE.CanvasTexture(canvasFront);
      tex.colorSpace = THREE.SRGBColorSpace;
      setCardTextureFront(tex);
    };

    const canvasBack = document.createElement('canvas');
    canvasBack.width = 512;
    canvasBack.height = 720;
    const ctxB = canvasBack.getContext('2d');

    const drawBack = () => {
      // Background gradient
      const grad = ctxB.createLinearGradient(0, 0, 0, 720);
      grad.addColorStop(0, '#0c0a09'); // stone-950
      grad.addColorStop(1, '#1c1917'); // stone-900
      ctxB.fillStyle = grad;
      ctxB.fillRect(0, 0, 512, 720);

      // Tech details grid
      ctxB.strokeStyle = 'rgba(236, 72, 153, 0.05)'; // faint pink
      ctxB.lineWidth = 1;
      for (let i = 0; i < 512; i += 32) {
        ctxB.beginPath(); ctxB.moveTo(i, 0); ctxB.lineTo(i, 720); ctxB.stroke();
      }
      for (let i = 0; i < 720; i += 32) {
        ctxB.beginPath(); ctxB.moveTo(0, i); ctxB.lineTo(512, i); ctxB.stroke();
      }

      // Neon developer icon
      ctxB.fillStyle = '#ec4899'; // pink-500
      ctxB.font = 'bold 120px monospace';
      ctxB.textAlign = 'center';
      ctxB.fillText('</>', 256, 310);

      ctxB.fillStyle = '#ffffff';
      ctxB.font = 'bold 28px monospace';
      ctxB.fillText('DEVELOPER SECURITY', 256, 390);

      ctxB.fillStyle = '#a1a1aa'; // zinc-400
      ctxB.font = '16px monospace';
      ctxB.fillText('Authorization: Level 5', 256, 430);

      // Footer
      ctxB.fillStyle = '#52525b';
      ctxB.font = '13px monospace';
      ctxB.fillText('riv.christian19@gmail.com', 256, 550);
      ctxB.fillText('github.com/Christian0162', 256, 575);

      ctxB.fillStyle = '#6366f1';
      ctxB.fillRect(0, 705, 512, 15);

      const texB = new THREE.CanvasTexture(canvasBack);
      texB.colorSpace = THREE.SRGBColorSpace;
      setCardTextureBack(texB);
    };

    // Load photo
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = '/me.png';
    img.onload = () => drawFront(img);
    img.onerror = () => drawFront(null);

    drawFront(null);
    drawBack();
  }, []);

  // Generate procedural canvas texture for the ribbon
  const ribbonTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    // Slick black/zinc ribbon background
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, 512, 64);

    // Dynamic borders
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(0, 0, 512, 3);
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(0, 61, 512, 3);

    // Texts
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('★ DEVELOPER ★', 128, 32);

    ctx.fillStyle = '#6366f1';
    ctx.fillText('★ RIVERA ★', 384, 32);

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    return tex;
  }, []);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  if (ribbonTexture) {
    ribbonTexture.wrapS = ribbonTexture.wrapT = THREE.RepeatWrapping;
  }

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            {/* Front Card Face */}
            {cardTextureFront && (
              <mesh position={[0, 0, 0.011]}>
                <planeGeometry args={[1.6, 2.25]} />
                <meshPhysicalMaterial
                  map={cardTextureFront}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.5}
                  metalness={0.1}
                />
              </mesh>
            )}

            {/* Back Card Face */}
            {cardTextureBack && (
              <mesh position={[0, 0, -0.011]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[1.6, 2.25]} />
                <meshPhysicalMaterial
                  map={cardTextureBack}
                  clearcoat={isMobile ? 0 : 1}
                  clearcoatRoughness={0.15}
                  roughness={0.5}
                  metalness={0.1}
                />
              </mesh>
            )}

            {/* Card Body/Frame */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1.62, 2.27, 0.02]} />
              <meshPhysicalMaterial
                color="#09090b"
                roughness={0.3}
                metalness={0.8}
                clearcoat={isMobile ? 0 : 0.8}
              />
            </mesh>

            {/* Metal Clamp (Attaches card top to the ring) */}
            <mesh position={[0, 1.2, 0]}>
              <boxGeometry args={[0.2, 0.15, 0.06]} />
              <meshPhysicalMaterial
                color="#e4e4e7"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Metal Ring (Upper connector) */}
            <mesh position={[0, 1.32, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.08, 0.02, 8, 24]} />
              <meshPhysicalMaterial
                color="#e4e4e7"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Small clip clasp */}
            <mesh position={[0, 1.42, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.1]} />
              <meshPhysicalMaterial
                color="#a1a1aa"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        {ribbonTexture && (
          <meshLineMaterial
            color="white"
            depthTest={false}
            resolution={isMobile ? [1000, 2000] : [1000, 1000]}
            useMap
            map={ribbonTexture}
            repeat={[-4, 1]}
            lineWidth={1}
          />
        )}
      </mesh>
    </>
  );
}
