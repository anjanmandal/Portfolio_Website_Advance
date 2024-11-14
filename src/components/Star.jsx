// Star.jsx (Using SVG)
import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Styled motion Box for the star
const MotionBox = motion(Box);

// SVG Path for a star
const starPath = "M12 .587l3.668 7.431L24 9.168l-6 5.847L19.335 24 12 19.897 4.665 24 6 15.015 0 9.168l8.332-1.15L12 .587z";

// Styled component for the star's appearance
const StyledStar = styled(MotionBox)(({ size, color }) => ({
  position: 'absolute',
  width: size || 16,
  height: size || 16,
  fill: color || '#fff',
  opacity: 0.8,
}));

const Star = ({ size, color, top, left, duration, delay, floatDistance }) => {
  return (
    <StyledStar
      as="svg"
      viewBox="0 0 24 24"
      size={size}
      color={color}
      top={top}
      left={left}
      initial={{ y: 0, opacity: 0.8, scale: 0.8 }}
      animate={{
        y: [0, -floatDistance, 0],
        opacity: [0.8, 1, 0.8],
        scale: [0.8, 1, 0.8],
      }}
      transition={{
        duration: duration || 4,
        repeat: Infinity,
        repeatType: 'loop',
        delay: delay || 0,
        ease: 'easeInOut',
      }}
    >
      <path d={starPath} />
    </StyledStar>
  );
};

export default Star;
