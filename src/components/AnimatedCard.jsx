// src/components/AnimatedCard.js
import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@mui/material';
import { styled } from '@mui/material/styles';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.2)',
    backgroundColor: ['#ffffff', '#f9f9f9'],
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.background.paper,
  backdropFilter: 'blur(8px)',
  borderRadius: theme.spacing(2),
  boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`,
  cursor: 'pointer',
}));

const AnimatedCard = ({ children, sx, ...props }) => (
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    whileHover="hover"
    {...props}
  >
    <StyledCard sx={sx}>{children}</StyledCard>
  </motion.div>
);

export default AnimatedCard;
