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
      maxWidth = 'lg',
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
            borderRadius: { xs: 3, md: 5 },
            p: { xs: 3, md: 5 },
            background: surface,
            border: `1px solid ${alpha(
              theme.palette.common.white,
              theme.palette.mode === 'dark' ? 0.1 : 0.08
            )}`,
            boxShadow: theme.shadows[1],
            backdropFilter: 'blur(22px)',
          },
        };

    return (
      <Box
        ref={mergedRef}
        component={componentProp}
        {...motionProps}
        sx={{ position: 'relative', width: '100%', py: { xs: 6, md: 10 }, ...sx }}
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
