// src/components/SectionFrame.jsx

import React, { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
  Chip,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import SectionHeader from './SectionHeader';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const SectionFrame = forwardRef(
  (
    {
      eyebrow,
      title,
      subtitle,
      actions,
      children,
      maxWidth = 'xl',
      contentSpacing = 4,
      sx,
      contentSx,
      disablePaper = false,
      component = 'section',
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const prefersReducedMotion = useReducedMotion();

    const localRef = useRef(null);
    const mergedRef = useCallback(
      (node) => {
        localRef.current = node;
        if (!ref) return;
        if (typeof ref === 'function') {
          ref(node);
        } else {
          ref.current = node;
        }
      },
      [ref]
    );

    const isInView = useInView(localRef, {
      once: true,
      margin: '-15% 0px -15% 0px',
    });
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (isInView) {
        setHasAnimated(true);
      }
    }, [isInView]);

    const motionProps = prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 40 },
          animate: hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
          transition: { duration: 0.6, ease: 'easeOut' },
        };
    const componentProp = prefersReducedMotion ? 'section' : motion.section;
    const surface = theme.palette.background.glass
      ? theme.palette.background.glass
      : alpha(
          theme.palette.background.paper,
          theme.palette.mode === 'dark' ? 0.5 : 0.9
        );

    const Wrapper = disablePaper ? React.Fragment : Paper;
    const wrapperProps = disablePaper
      ? {}
      : {
          elevation: 0,
          sx: {
            borderRadius: { xs: 4, md: 5 },
            p: { xs: 3, md: 5 },
            background:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.84)
                : alpha(theme.palette.common.white, 0.76),
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.shadows[1],
            backdropFilter: 'blur(20px) saturate(120%)',
            position: 'relative',
            overflow: 'hidden',
            isolation: 'isolate',
            '&::before': {
              content: '""',
              position: 'absolute',
              background: `linear-gradient(180deg, ${alpha(
                theme.palette.common.white,
                theme.palette.mode === 'dark' ? 0.03 : 0.6
              )}, transparent 22%)`,
              left: 0,
              right: 0,
              top: 0,
              height: 120,
              zIndex: -1,
            },
          },
        };

    return (
      <Box
        ref={mergedRef}
        component={componentProp}
        {...motionProps}
        sx={{ position: 'relative', width: '100%', py: { xs: 7, md: 10 }, ...sx }}
        {...props}
      >
        <Container maxWidth={maxWidth}>
          <Wrapper {...wrapperProps}>
            <Stack spacing={contentSpacing} sx={contentSx}>
              {(title || subtitle || actions) && (
                <Stack spacing={2}>
                  {title && <SectionHeader label={title} />}
                  {subtitle && (
                  <Typography variant="body1" color="text.secondary">
                      {subtitle}
                    </Typography>
                  )}
                  {actions && <Box>{actions}</Box>}
                </Stack>
              )}

              <Box>{children}</Box>
            </Stack>
          </Wrapper>
        </Container>
      </Box>
    );
  }
);

SectionFrame.displayName = 'SectionFrame';

export default SectionFrame;
