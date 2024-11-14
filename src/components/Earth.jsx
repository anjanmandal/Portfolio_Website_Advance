// Trophy.jsx

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from '@react-three/drei';

export default function Trophy() {
  const trophyRef = useRef();

  // Load the Trophy model
  const { scene } = useGLTF('/Models/earth2.glb');

  // Rotate the Trophy continuously
  useFrame(() => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={trophyRef} dispose={null}>
      <primitive object={scene} scale={1.5} />
      {/* Optional: Add OrbitControls for interaction */}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload('/models/trophy.glb');
