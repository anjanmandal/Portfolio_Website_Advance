import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { alpha, styled, useTheme } from '@mui/material/styles';

const HeaderPill = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  maxWidth: '100%',
  borderRadius: 999,
  padding: theme.spacing(1, 1.5),
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.common.white, 0.8),
  border: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: theme.spacing(1),
  color: theme.palette.text.secondary,
  fontWeight: 600,
  letterSpacing: 0.5,
  backdropFilter: 'blur(14px)',
  boxShadow: 'none',
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
