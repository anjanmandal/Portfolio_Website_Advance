// src/components/ExperienceTimeline.js

import React, { forwardRef } from 'react';
import {
  Box,
  Stack,
  Typography,
  Avatar,
  Button,
  Paper,
  Chip,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import experiences from './Experience';
import SectionFrame from './SectionFrame';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@mui/lab';

const heroSignals = [
  {
    label: 'Shipping',
    title: 'Release-minded execution',
    detail:
      'Building and deploying startup and SaaS features with a cleaner path from code to production.',
    icon: RocketLaunchRoundedIcon,
  },
  {
    label: 'Hardening',
    title: 'Reliability under pressure',
    detail:
      'Improving scaling, database performance, security, and cloud operations where systems usually break first.',
    icon: VerifiedRoundedIcon,
  },
  {
    label: 'Mentoring',
    title: 'Support that compounds',
    detail:
      'Helping students and teams learn faster through teaching, coaching, and clearer engineering habits.',
    icon: SchoolRoundedIcon,
  },
];

const MOBILE_SAFE_VIEWPORT = { once: true, amount: 0.12 };

const HeroCard = styled(Box)(({ theme }) => ({
  borderRadius: 30,
  padding: theme.spacing(4),
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.78),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(18px)',
}));

const SignalRail = styled(Box)(({ theme }) => ({
  borderRadius: 24,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.8)
      : alpha(theme.palette.common.white, 0.84),
  boxShadow: theme.shadows[1],
}));

const SignalGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const SignalCell = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.3, 2.4),
  transition: 'background-color 180ms ease',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.03)
        : alpha(theme.palette.primary.main, 0.035),
  },
  '&:not(:last-of-type)': {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  [theme.breakpoints.down('md')]: {
    '&:not(:last-of-type)': {
      borderRight: 0,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
  },
}));

const SignalIcon = styled(Box)(({ theme }) => ({
  width: 42,
  height: 42,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 14,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.12)
      : alpha(theme.palette.primary.main, 0.08),
  color: theme.palette.primary.main,
}));

const TimelineCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 24,
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.82)
      : alpha(theme.palette.common.white, 0.8),
  boxShadow: theme.shadows[1],
  transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.7)} 0%, ${alpha(
      theme.palette.primary.main,
      0.08
    )} 70%, transparent 100%)`,
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[2],
    borderColor: alpha(theme.palette.primary.main, 0.16),
  },
}));

const TimelineDotShell = styled(TimelineDot)(({ theme }) => ({
  margin: 0,
  padding: theme.spacing(0.55),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.92)
      : alpha(theme.palette.common.white, 0.94),
  boxShadow: `0 0 0 8px ${alpha(theme.palette.primary.main, 0.08)}`,
}));

const TimelineRail = styled(TimelineConnector)(({ theme }) => ({
  width: 3,
  borderRadius: 999,
  background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.42)} 0%, ${alpha(
    theme.palette.primary.main,
    0.1
  )} 100%)`,
  minHeight: 168,
}));

const MetaPill = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.8),
  padding: theme.spacing(0.5, 1),
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.primary.main, 0.04),
}));

const MetaDot = styled(Box)(({ theme }) => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
}));

const HighlightRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1.35),
  padding: theme.spacing(1.25, 1.35),
  borderRadius: 18,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.primary.main, 0.03),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  paddingInline: theme.spacing(1.8),
}));

const ExperienceTimeline = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLearnMore = (id) => {
    navigate(`/experience/${id}`);
  };

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Career"
      title="Experience"
      subtitle="Roles, internships, and leadership tours with measurable impact."
    >
      <HeroCard
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={MOBILE_SAFE_VIEWPORT}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Stack spacing={3}>
          <Box sx={{ maxWidth: 980 }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Building secure products, stronger systems, and better engineering habits.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              Across SquarePlanIT, ULM, and the National Innovation Center, my work spans delivery, platform reliability, and mentorship without treating them as separate tracks.
            </Typography>
            <Typography
              variant="caption"
              sx={{ mt: 1.75, display: 'block', color: 'text.secondary', letterSpacing: 0.6 }}
            >
              SquarePlanIT / University of Louisiana Monroe / National Innovation Center
            </Typography>
          </Box>

          <SignalRail>
            <SignalGrid>
              {heroSignals.map((signal) => {
                const Icon = signal.icon;

                return (
                  <SignalCell key={signal.label}>
                    <Stack spacing={1.5}>
                      <Stack direction="row" spacing={1.3} alignItems="center">
                        <SignalIcon>
                          <Icon sx={{ fontSize: 22 }} />
                        </SignalIcon>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                        >
                          {signal.label}
                        </Typography>
                      </Stack>
                      <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.28 }}>
                        {signal.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.68 }}>
                        {signal.detail}
                      </Typography>
                    </Stack>
                  </SignalCell>
                );
              })}
            </SignalGrid>
          </SignalRail>
        </Stack>
      </HeroCard>

      <Timeline
        position="alternate"
        sx={{
          mt: 4,
          '& .MuiTimelineItem-root:before': {
            display: { xs: 'none', md: 'block' },
          },
        }}
      >
        {experiences.map((exp, idx) => (
          <TimelineItem key={exp.id}>
            <TimelineOppositeContent sx={{ m: 'auto 0', display: { xs: 'none', md: 'block' } }}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', letterSpacing: 0.6, textTransform: 'uppercase' }}
              >
                {exp.year}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDotShell>
                <Avatar src={exp.logo} alt={exp.company} sx={{ width: 40, height: 40 }} />
              </TimelineDotShell>
              {idx < experiences.length - 1 && <TimelineRail />}
            </TimelineSeparator>
            <TimelineContent>
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={MOBILE_SAFE_VIEWPORT}
              >
                <TimelineCard>
                  <Stack spacing={2.3}>
                    <Stack
                      direction={{ xs: 'column', md: 'row' }}
                      spacing={2}
                      alignItems={{ xs: 'flex-start', md: 'flex-start' }}
                      justifyContent="space-between"
                    >
                      <Stack spacing={1.2} sx={{ minWidth: 0, flex: 1 }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          <MetaPill>
                            <MetaDot />
                            <Typography
                              variant="caption"
                              sx={{ color: 'text.secondary', letterSpacing: 0.6, textTransform: 'uppercase' }}
                            >
                              {exp.year}
                            </Typography>
                          </MetaPill>
                        </Stack>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                          {exp.title}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {exp.company}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ lineHeight: 1.7, maxWidth: { xs: 'none', md: '58ch' } }}
                        >
                          {exp.description}
                        </Typography>
                      </Stack>

                      <ActionButton
                        variant="contained"
                        size="small"
                        endIcon={<ArrowOutwardRoundedIcon />}
                        onClick={() => handleLearnMore(exp.id)}
                      >
                        Learn More
                      </ActionButton>
                    </Stack>

                    <Stack spacing={1.15}>
                      {exp.content.map((line, i) => (
                        <HighlightRow key={i}>
                          <CheckRoundedIcon color="primary" sx={{ mt: 0.15, fontSize: 18 }} />
                          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.72 }}>
                            {line}
                          </Typography>
                        </HighlightRow>
                      ))}
                    </Stack>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {(exp.tags || []).map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" />
                      ))}
                    </Stack>
                  </Stack>
                </TimelineCard>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionFrame>
  );
});

export default ExperienceTimeline;
