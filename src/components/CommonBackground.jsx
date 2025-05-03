// src/components/CommonBackground.js
import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

function BackgroundAnimation() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
    </>
  );
}

const CommonBackground = ({ children }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
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

      {/* Floating Particles */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 100,
          height: 100,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.primary.dark})`,
          opacity: 0.15,
          zIndex: -1,
        }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Your content */}
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default CommonBackground;
