import React, { forwardRef } from 'react';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

const MetricTileRoot = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  borderRadius: 24,
  padding: theme.spacing(2.5),
  minHeight: '100%',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(
          theme.palette.background.paper,
          0.82
        )} 54%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
      : `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
          theme.palette.common.white,
          0.96
        )} 52%, ${alpha(theme.palette.common.white, 0.88)} 100%)`,
  boxShadow: theme.shadows[1],
  transition: 'transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(180deg, ${alpha(
      theme.palette.common.white,
      theme.palette.mode === 'dark' ? 0.02 : 0.5
    )}, transparent 32%)`,
    zIndex: -2,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -16,
    right: -8,
    width: 108,
    height: 108,
    borderRadius: '50%',
    background: alpha(theme.palette.primary.main, theme.palette.mode === 'dark' ? 0.14 : 0.08),
    filter: 'blur(14px)',
    zIndex: -1,
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: alpha(theme.palette.primary.main, 0.2),
    boxShadow: theme.shadows[2],
  },
}));

const MetricLabel = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.9),
  width: 'fit-content',
  padding: theme.spacing(0.5, 1),
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.72),
}));

const MetricDot = styled(Box)(({ theme }) => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  boxShadow: `0 0 0 6px ${alpha(theme.palette.primary.main, 0.12)}`,
}));

const MetricTile = forwardRef(
  ({ label, value, detail, valueVariant = 'h4', sx, ...props }, ref) => (
    <MetricTileRoot ref={ref} elevation={0} sx={sx} {...props}>
      <Stack spacing={detail ? 1.5 : 1.15}>
        {label ? (
          <MetricLabel>
            <MetricDot />
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
            >
              {label}
            </Typography>
          </MetricLabel>
        ) : null}

        <Typography
          variant={valueVariant}
          sx={{
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1.02,
            color: 'text.primary',
            wordBreak: 'break-word',
            overflowWrap: 'anywhere',
          }}
        >
          {value}
        </Typography>

        {detail ? (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ lineHeight: 1.68, maxWidth: '34ch' }}
          >
            {detail}
          </Typography>
        ) : null}
      </Stack>
    </MetricTileRoot>
  )
);

MetricTile.displayName = 'MetricTile';

export default MetricTile;
