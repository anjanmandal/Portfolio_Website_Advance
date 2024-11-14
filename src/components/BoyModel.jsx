// src/components/BoyModel.jsx

import React, { useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function BoyModel(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/Models/rocket.glb'); // Ensure your model path is correct
  const { actions } = useAnimations(animations, group);

  // Uncomment the following lines if your model has animations you want to play
  // React.useEffect(() => {
  //   if (actions && actions['AnimationName']) {
  //     actions['AnimationName'].play();
  //   }
  // }, [actions]);

  // Continuous rotation
  useFrame((state, delta) => {
    group.current.rotation.y += delta * 0.5; // Adjust rotation speed as needed
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/Models/rocket.glb'); // Preload the model
