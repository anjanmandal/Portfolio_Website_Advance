// src/components/ToggleColorMode.jsx

import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
import { alpha, styled } from '@mui/material/styles';

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.92)
      : alpha(theme.palette.common.white, 0.9),
  color: theme.palette.text.primary,
  borderRadius: 999,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(14px)',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 1)
        : alpha(theme.palette.common.white, 1),
    boxShadow: theme.shadows[2],
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
