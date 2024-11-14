// src/components/ToggleColorMode.jsx

import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { styled } from '@mui/material/styles';
import { keyframes } from '@emotion/react';

// Define the shake animation using keyframes
const shake = keyframes`
  0% { transform: translateY(1px); }

 
`;

// Create a styled IconButton with the shake animation
const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  animation: `${shake} 2s ease infinite`,// Adjust duration and iteration as needed
  backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Darker on hover
  },
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Optional: Add a subtle shadow
}));

function ToggleColorMode({ mode, toggleColorMode, ...props }) {
  return (
    <Box
      sx={{
        position: 'fixed',      // Fixes the position relative to the viewport
        bottom: 16,             // 16px from the bottom
        right: 16,              // 16px from the right
        zIndex: 1300,           // Ensures it's above other elements
        // Optional: Add responsive positioning
        // '@media (max-width:600px)': {
        //   bottom: 8,
        //   right: 8,
        // },
      }}
    >
      <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
        <AnimatedIconButton
          onClick={toggleColorMode}
          color="primary"
          size="large" // Increased size for better visibility
          aria-label="Toggle light and dark theme"
          {...props}
        >
          {mode === 'dark' ? (
            <WbSunnyRoundedIcon fontSize="inherit" />
          ) : (
            <ModeNightRoundedIcon fontSize="inherit" />
          )}
        </AnimatedIconButton>
      </Tooltip>
    </Box>
  );
}

ToggleColorMode.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default ToggleColorMode;
