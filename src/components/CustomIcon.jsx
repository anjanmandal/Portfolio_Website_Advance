// src/components/SkillIcon.js
import React from 'react';
import { styled } from '@mui/material/styles';

// Styled component for the image with 3D-like hover effect
const StyledIcon = styled('img')(({ theme }) => ({
  width: '50px',
  height: '50px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.2)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
  },
}));

// Component that accepts the image src and alt text as props
const SkillIcon = ({ src, alt }) => {
  return <StyledIcon src={src} alt={alt} />;
};

export default SkillIcon;
