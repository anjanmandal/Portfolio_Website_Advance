// src/components/EducationSection.jsx

import React, { forwardRef, useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Avatar,
  Paper,
  Chip,
  Button,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import TimelineIcon from '@mui/icons-material/Timeline';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import SectionFrame from './SectionFrame';
import { useNavigate } from 'react-router-dom';

import ulmLogo from '/images/ulm-logo.png';
import nicLogo from '/images/ni-logo.png';

const education = [
  {
    period: '2022 – 2025',
    title: 'B.Sc. Computer Science',
    institution: 'University of Louisiana Monroe',
    logo: ulmLogo,
    details: [
      'Honors scholar · 3.96 GPA',
      'Applied ML research, systems-focused training, and STEM mentorship',
    ],
    focus: ['Systems Design', 'AI/ML', 'Leadership'],
  },
  {
    period: '2019 – 2021',
    title: 'High School Diploma',
    institution: 'National Infotech College',
    logo: nicLogo,
    details: [
      'Valedictorian in STEM · Founded campus coding club',
      'Organized STEM workshops and hackathon mentorship',
    ],
    focus: ['Mathematics', 'Algorithms', 'Community'],
  },
];

const academicSignals = [
  { label: 'GPA', value: '3.96', detail: 'Honors scholar with a strong mathematics foundation.' },
  { label: 'Research', value: 'AI/ML', detail: 'Applied work tied to accessibility and product thinking.' },
  { label: 'ICPC', value: 'Gold', detail: 'NA South Division 1 gold at LSU with Team Warhawks.' },
];

const learningViews = [
  {
    label: 'Coursework',
    icon: AutoStoriesOutlinedIcon,
    title: 'Systems-first coursework',
    description:
      'My coursework focused on the parts of computer science that actually compound in real engineering work: algorithms, systems, networking, databases, and AI/ML.',
    points: [
      'Data structures, operating systems, networks, and databases',
      'Distributed systems and AI/ML supporting backend thinking',
      'Mathematics minor strengthening analysis and problem solving',
    ],
  },
  {
    label: 'Research',
    icon: ScienceOutlinedIcon,
    title: 'Applied AI research',
    description:
      'At ULM, I’ve worked with Dr. Sreekumari on SocialBridge AI, where research directly informed product ideas, implementation, and user-centered AI work.',
    points: [
      'SocialBridge AI research tied to accessibility outcomes',
      'AI/ML exploration shaped into product and system direction',
      'Academic work connected to practical engineering decisions',
    ],
  },
  {
    label: 'Community',
    icon: Groups2OutlinedIcon,
    title: 'Leadership and mentorship',
    description:
      'A lot of my learning came from shared building environments: mentoring STEM cohorts, student leadership, research labs, and community workshops.',
    points: [
      'STEM clubs, workshops, and peer mentorship',
      'Former VP, NSA and organizer across student initiatives',
      'Leadership experience that carries into engineering teams',
    ],
  },
];

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

const LearningPanel = styled(Box)(({ theme }) => ({
  borderRadius: 28,
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.84),
  boxShadow: theme.shadows[1],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  minHeight: '100%',
}));

const LearningButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  justifyContent: 'flex-start',
  width: '100%',
  minHeight: 72,
  borderRadius: 20,
  padding: theme.spacing(1.2, 1.35),
  textTransform: 'none',
  fontWeight: 600,
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  border: `1px solid ${
    active ? alpha(theme.palette.primary.main, 0.18) : theme.palette.divider
  }`,
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.07)
      : alpha(theme.palette.common.white, 0.96)
    : theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.58)
      : alpha(theme.palette.common.white, 0.76),
  boxShadow: active ? theme.shadows[1] : 'none',
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.18),
    backgroundColor: active
      ? theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.08)
        : alpha(theme.palette.common.white, 0.98)
      : alpha(theme.palette.primary.main, 0.05),
  },
}));

const LearningStory = styled(Box)(({ theme }) => ({
  borderRadius: 24,
  padding: theme.spacing(2.25),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${alpha(
          theme.palette.background.paper,
          0.8
        )} 58%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
      : `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.06)} 0%, ${alpha(
          theme.palette.common.white,
          0.96
        )} 58%, ${alpha(theme.palette.common.white, 0.9)} 100%)`,
}));

const SignalBoard = styled(Box)(({ theme }) => ({
  borderRadius: 26,
  padding: theme.spacing(1.2),
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.82),
  boxShadow: theme.shadows[1],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.2),
}));

const SignalButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  minHeight: 112,
  borderRadius: 20,
  padding: theme.spacing(1.5, 1.6),
  textTransform: 'none',
  color: theme.palette.text.primary,
  border: `1px solid ${
    active ? alpha(theme.palette.primary.main, 0.18) : 'transparent'
  }`,
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.08)
      : alpha(theme.palette.common.white, 0.96)
    : 'transparent',
  boxShadow: active ? theme.shadows[1] : 'none',
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.16),
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.06)
        : alpha(theme.palette.primary.main, 0.05),
  },
}));

const SignalNarrative = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(1.5, 1.7),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.74)
      : alpha(theme.palette.common.white, 0.9),
}));

const TimelineWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(7.5),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: theme.spacing(2.5),
    top: 0,
    bottom: 0,
    width: 4,
    borderRadius: 999,
    background: `linear-gradient(180deg, transparent 0%, ${alpha(
      theme.palette.primary.main,
      0.22
    )} 8%, ${alpha(theme.palette.primary.main, 0.44)} 50%, ${alpha(
      theme.palette.primary.main,
      0.22
    )} 92%, transparent 100%)`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: `calc(${theme.spacing(2.5)} - 6px)`,
    top: 0,
    bottom: 0,
    width: 16,
    borderRadius: 999,
    background: `linear-gradient(180deg, transparent 0%, ${alpha(
      theme.palette.primary.main,
      0.12
    )} 10%, ${alpha(theme.palette.primary.main, 0.16)} 50%, ${alpha(
      theme.palette.primary.main,
      0.1
    )} 90%, transparent 100%)`,
    filter: 'blur(8px)',
  },
}));

const EntryCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  borderRadius: 28,
  padding: theme.spacing(3.25),
  border: `1px solid ${
    active ? alpha(theme.palette.primary.main, 0.18) : theme.palette.divider
  }`,
  background:
    theme.palette.mode === 'dark'
      ? active
        ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(
            theme.palette.background.paper,
            0.84
          )} 58%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
        : alpha(theme.palette.background.paper, 0.82)
      : active
        ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(
            theme.palette.common.white,
            0.96
          )} 58%, ${alpha(theme.palette.common.white, 0.88)} 100%)`
        : alpha(theme.palette.common.white, 0.78),
  position: 'relative',
  boxShadow: active ? theme.shadows[2] : theme.shadows[1],
  cursor: 'pointer',
  transition: 'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 72,
    background: `linear-gradient(180deg, ${alpha(
      theme.palette.common.white,
      theme.palette.mode === 'dark' ? 0.03 : 0.46
    )}, transparent)`,
    pointerEvents: 'none',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: alpha(theme.palette.primary.main, 0.18),
    boxShadow: theme.shadows[2],
  },
}));

const EntryDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  width: active ? 18 : 16,
  height: active ? 18 : 16,
  borderRadius: '50%',
  border: `3px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.paper,
  position: 'absolute',
  left: -55,
  top: theme.spacing(3.5),
  boxShadow: active
    ? `0 0 0 8px ${alpha(theme.palette.primary.main, 0.12)}`
    : `0 0 0 6px ${alpha(theme.palette.primary.main, 0.08)}`,
  transition: 'all 220ms ease',
}));

const EntryMetaPill = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.7),
  width: 'fit-content',
  padding: theme.spacing(0.55, 1.05),
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.74),
}));

const EntryIconBadge = styled(Box)(({ theme }) => ({
  width: 40,
  height: 40,
  borderRadius: 14,
  display: 'grid',
  placeItems: 'center',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.72),
}));

const FocusPill = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.72),
}));

const DetailRow = styled(Stack)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(1, 1.1),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.common.white, 0.68),
}));

const CertCTA = styled(Box)(({ theme }) => ({
  borderRadius: 22,
  padding: theme.spacing(2.5),
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.84),
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  cursor: 'pointer',
  boxShadow: theme.shadows[1],
  transition: 'transform 300ms ease, box-shadow 300ms ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
  },
}));

const EducationSection = forwardRef((_, ref) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState(0);
  const [activeSignal, setActiveSignal] = useState(0);
  const [activeEntry, setActiveEntry] = useState(0);
  const currentView = learningViews[activeView];
  const currentSignal = academicSignals[activeSignal];
  const ActiveViewIcon = currentView.icon;

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Academic track"
      title="Education"
      subtitle="Learning fueled by research, competitive programming, and community."
      contentSpacing={5}
    >
      <HeroCard>
        <Stack spacing={3.25}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 850, maxWidth: 900 }}>
              Honors major in Computer Science with a minor in Mathematics at ULM.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, maxWidth: 960 }}>
              I’m currently conducting research with Dr. Sreekumari at ULM to build SocialBridge
              AI. My academic work spans systems, AI/ML, and applied software engineering, while
              ICPC, mentorship, and community leadership shaped how I work outside the classroom.
            </Typography>
          </Box>

          <SignalBoard>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
                gap: 1,
              }}
            >
              {academicSignals.map((signal, index) => (
                <SignalButton
                  key={signal.label}
                  active={activeSignal === index}
                  variant="text"
                  onClick={() => setActiveSignal(index)}
                >
                  <Stack spacing={1} sx={{ alignItems: 'flex-start' }}>
                    <Typography variant="caption" color="text.secondary">
                      {signal.label}
                    </Typography>
                    <Typography
                      variant="h3"
                      sx={{ fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1 }}
                    >
                      {signal.value}
                    </Typography>
                  </Stack>
                </SignalButton>
              ))}
            </Box>

            <SignalNarrative
              component={motion.div}
              key={currentSignal.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Typography variant="subtitle2" sx={{ mb: 0.6 }}>
                {currentSignal.label}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                {currentSignal.detail}
              </Typography>
            </SignalNarrative>
          </SignalBoard>

          <LearningPanel>
            <Stack spacing={0.75}>
              <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
                Learning Lens
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Explore the parts of education that shaped how I build.
              </Typography>
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
                gap: 1.2,
              }}
            >
              {learningViews.map((view, index) => {
                const Icon = view.icon;
                return (
                  <LearningButton
                    key={view.label}
                    active={activeView === index}
                    variant="text"
                    startIcon={<Icon fontSize="small" />}
                    onClick={() => setActiveView(index)}
                  >
                    {view.label}
                  </LearningButton>
                );
              })}
            </Box>

            <LearningStory
              component={motion.div}
              key={currentView.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" spacing={1.1} alignItems="center">
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2.5,
                      display: 'grid',
                      placeItems: 'center',
                      background: alpha(theme.palette.primary.main, 0.12),
                      color: theme.palette.primary.main,
                    }}
                  >
                    <ActiveViewIcon fontSize="small" />
                  </Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                    {currentView.title}
                  </Typography>
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {currentView.description}
                </Typography>

                <Stack spacing={1.1}>
                  {currentView.points.map((point) => (
                    <Stack key={point} direction="row" spacing={1.1} alignItems="flex-start">
                      <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 18, mt: 0.2 }} />
                      <Typography variant="body2" color="text.secondary">
                        {point}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </LearningStory>

            <CertCTA onClick={() => navigate('/certifications')}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: alpha(theme.palette.primary.main, 0.15),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <WorkspacePremiumOutlinedIcon color="primary" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Certifications vault
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tap to review credentials, badges, and recent learning milestones.
                  </Typography>
                </Box>
              </Stack>
              <ArrowOutwardIcon sx={{ color: alpha(theme.palette.primary.main, 0.9) }} />
            </CertCTA>
          </LearningPanel>
        </Stack>
      </HeroCard>

      <TimelineWrapper sx={{ mt: 4 }}>
        <Stack spacing={3}>
          {education.map((entry, index) => (
            <EntryCard key={entry.title} active={activeEntry === index} onClick={() => setActiveEntry(index)}>
              <EntryDot active={activeEntry === index} />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    src={entry.logo}
                    alt={entry.institution}
                    sx={{
                      width: 62,
                      height: 62,
                      border: (innerTheme) => `1px solid ${innerTheme.palette.divider}`,
                      bgcolor: 'background.paper',
                    }}
                  />
                  <Box>
                    <EntryMetaPill>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {entry.period}
                      </Typography>
                    </EntryMetaPill>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {entry.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {entry.institution}
                    </Typography>
                  </Box>
                </Stack>
                <EntryIconBadge>
                  <TimelineIcon color="primary" fontSize="small" />
                </EntryIconBadge>
              </Stack>
              <Stack spacing={1.2} mt={2}>
                {entry.details.map((text) => (
                  <DetailRow key={text} direction="row" spacing={1.1} alignItems="flex-start">
                    <CheckCircleOutlineIcon color="primary" sx={{ fontSize: 18, mt: 0.15 }} />
                    <Typography variant="body2" color="text.secondary">
                      {text}
                    </Typography>
                  </DetailRow>
                ))}
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={2}>
                {entry.focus.map((chip) => (
                  <FocusPill key={chip} label={chip} size="small" variant="outlined" />
                ))}
              </Stack>
            </EntryCard>
          ))}
        </Stack>
      </TimelineWrapper>
    </SectionFrame>
  );
});

export default EducationSection;
