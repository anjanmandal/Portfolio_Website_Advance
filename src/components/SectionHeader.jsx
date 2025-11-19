import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { alpha, styled, useTheme } from '@mui/material/styles';

const HeaderPill = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: 999,
  padding: theme.spacing(1.2, 2),
  background: theme.palette.mode === 'dark'
    ? alpha(theme.palette.common.white, 0.05)
    : alpha(theme.palette.common.black, 0.04),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontWeight: 600,
  letterSpacing: 0.5,
}));

const SectionHeader = ({ label }) => {
  const theme = useTheme();
  return (
    <HeaderPill>
      <TrendingUpIcon fontSize="small" sx={{ color: theme.palette.text.secondary }} />
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        {label}
      </Typography>
    </HeaderPill>
  );
};

export default SectionHeader;
