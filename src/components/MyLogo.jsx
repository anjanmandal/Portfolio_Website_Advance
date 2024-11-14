
  
  // src/components/MyLogo.jsx
import React from 'react';
import { useTheme } from '@mui/material/styles';

const MyLogo = () => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  // Choose the appropriate logo based on the theme mode
  const logoSrc = mode === 'dark' ? '/images/anjan_logo2.png' : '/images/anjan_logo_light.png';

  return (
    <img
      src={logoSrc}
      alt="Anjan Logo"
      style={{ width: '100px', height: 'auto' }}
    />
  );
};

export default MyLogo;
