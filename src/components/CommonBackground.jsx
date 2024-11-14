// src/components/CommonBackground.js

import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

// Optional: Import any 3D models you want to use
// import Your3DModel from './Your3DModel'; // Replace with your actual model

function BackgroundAnimation() {
  return (
    <>
      {/* Add stars or other 3D elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      {/* Uncomment and use your own 3D models as needed */}
      {/* <Your3DModel /> */}
    </>
  );
}

const CommonBackground = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* 3D Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <BackgroundAnimation />
            <ambientLight intensity={0.5} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </Box>

      {/* Floating Particles and Shapes */}
      {/* Add your floating particles and shapes here using Framer Motion */}
      {/* Example: */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.primary.dark})`,
          opacity: 0.15,
          zIndex: -1,
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default CommonBackground;
