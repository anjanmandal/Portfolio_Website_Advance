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
  0% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
  100% { transform: translateY(0); }
`;

// Create a styled IconButton with the shake animation
const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  animation: `${shake} 4s ease-in-out infinite`,
  backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.common.white,
  borderRadius: 999,
  boxShadow: theme.shadows[1],
  '&:hover': {
    backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
    boxShadow: theme.shadows[8],
  },
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
