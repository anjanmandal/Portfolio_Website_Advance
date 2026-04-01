// src/components/About.jsx

import React, { forwardRef, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Paper,
  Button,
  Chip,
  Collapse,
  Divider,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TimelineIcon from '@mui/icons-material/Timeline';
import ModernStatsSection from './ModernStatsSection';
import MetricTile from './MetricTile';

const heroMetrics = [
  { label: 'Repos', value: '30+', detail: 'AI, climate, and assistive-tech builds' },
  { label: 'Wins', value: '3+', detail: 'Hackathons and startup competitions' },
  { label: 'Awards', value: '6+', detail: 'Pelican Cup 2026 • ICPC gold' },
];

const focusModes = [
  {
    label: 'AI apps',
    title: 'LLM-powered product experiences',
    detail:
      'Designing AI workflows where prompts, retrieval, and interface behavior feel useful in the product, not separate from it.',
    meta: 'Assistive tech • product UX',
  },
  {
    label: 'Backend',
    title: 'Reliable backend systems',
    detail:
      'Building APIs, data flows, and secure service architecture that make AI features dependable once real users show up.',
    meta: 'APIs • security • systems',
  },
  {
    label: 'MLOps',
    title: 'Production-ready AI delivery',
    detail:
      'Shipping deployment, observability, and evaluation loops so models can be monitored, improved, and trusted after launch.',
    meta: 'Deployments • evals • monitoring',
  },
];

const latestUpdates = [
  {
    label: 'Pelican Cup',
    category: 'Startup win',
    date: 'March 2026',
    title: 'Social Bridge AI won the Pelican Cup undergraduate division.',
    summary:
      'Our team took first place at ULM’s 2026 entrepreneurship competition and earned $25,000 to keep building.',
    detail:
      'That milestone pushed the product, pitch, and research direction into a much stronger startup track.',
    tags: ['Social Bridge AI', 'Pelican Cup', '$25K award'],
    images: [
      '/images/pelican_cup.jpg',
      '/images/pelican_1.jpg',
      '/images/pelican_2.jpg',
      '/images/pelican_3.jpg',
      '/images/pelican_4.jpeg',
    ],
  },
  {
    label: 'ICPC Gold',
    category: 'Competition',
    date: '2025 season',
    title: 'Team Warhawks earned gold in ICPC NA South Division 1.',
    summary:
      'The run sharpened algorithmic problem solving, fast collaboration, and systems thinking under pressure.',
    detail:
      'It still influences how I structure backend work, debugging, and technical tradeoff decisions.',
    tags: ['Algorithms', 'Systems thinking', 'Team Warhawks'],
    images: [
      '/images/icpc-warhawks-1.jpeg',
      '/images/icpc-warhawks-2.jpeg',
      '/images/icpc-warhawks-3.jpeg',
      '/images/icpc-warhawks-4.jpeg',
      '/images/icpc-warhawks-5.jpeg',
    ],
  },
  {
    label: 'Now building',
    category: 'Current work',
    date: 'Right now',
    title: 'Shipping AI-native products with stronger backend and MLOps foundations.',
    summary:
      'Across Social Bridge AI and SquarePlanIT, I’m focused on turning ambitious prototypes into production-ready software.',
    detail:
      'The emphasis is reliable delivery: APIs, evaluation loops, deployment hygiene, and product UX that holds up in use.',
    tags: ['LLM apps', 'Backend systems', 'MLOps'],
    images: [
      '/images/profile-3.jpg',
      '/images/guest_speaker.jpg',
      '/images/guest_speaker2.jpg',
      '/images/guest_speaker3.jpg',
    ],
  },
];

const HeroSurface = styled(Box)(({ theme }) => ({
  borderRadius: 32,
  padding: theme.spacing(5),
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.86)
      : alpha(theme.palette.common.white, 0.78),
  border: `1px solid ${theme.palette.divider}`,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(20px) saturate(120%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 120,
    background: `linear-gradient(180deg, ${alpha(
      theme.palette.common.white,
      theme.palette.mode === 'dark' ? 0.03 : 0.62
    )}, transparent 26%)`,
  },
}));

const PortraitPanel = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'flex-end',
  borderRadius: 28,
  minHeight: 360,
  backgroundImage:
    'linear-gradient(120deg, rgba(29,23,18,0.18), rgba(29,23,18,0.48)), url(/images/profile-3.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center 20%',
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
  overflow: 'hidden',
  padding: theme.spacing(2.5),
}));

const FocusPanel = styled(Box)(({ theme }) => ({
  borderRadius: 28,
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.82),
  boxShadow: theme.shadows[1],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const FocusSwitch = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  width: '100%',
  minHeight: 76,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  borderRadius: 20,
  padding: theme.spacing(1.35, 1.4),
  textTransform: 'none',
  fontWeight: 600,
  lineHeight: 1.35,
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  border: `1px solid ${
    active ? alpha(theme.palette.primary.main, 0.18) : theme.palette.divider
  }`,
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.07)
      : alpha(theme.palette.common.white, 0.94)
    : theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.56)
      : alpha(theme.palette.common.white, 0.76),
  boxShadow: active ? theme.shadows[1] : 'none',
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.18),
    backgroundColor: active
      ? theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.08)
      : alpha(theme.palette.common.white, 0.98)
      : alpha(theme.palette.primary.main, 0.06),
  },
}));

const FocusCard = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(1.5, 1.75),
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.62)
      : alpha(theme.palette.common.white, 0.88),
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  width: '100%',
  maxWidth: '100%',
  fontWeight: 900,
  letterSpacing: '-0.045em',
  lineHeight: 0.98,
  textWrap: 'pretty',
  fontSize: 'clamp(2.75rem, 5.6vw, 5.35rem)',
  color: theme.palette.text.primary,
}));

const HeroTitleAccent = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const HeroLead = styled(Typography)(({ theme }) => ({
  maxWidth: 760,
  fontSize: 'clamp(1.02rem, 1.15vw, 1.18rem)',
  lineHeight: 1.85,
  color: theme.palette.text.secondary,
  textWrap: 'pretty',
}));

const NewsSurface = styled(Box)(({ theme }) => ({
  borderRadius: 32,
  padding: theme.spacing(3.25),
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.78),
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(20px) saturate(120%)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.25),
  minHeight: '100%',
}));

const NewsSwitch = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  width: '100%',
  minHeight: 124,
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  textAlign: 'left',
  textTransform: 'none',
  padding: theme.spacing(1.35),
  borderRadius: 22,
  border: `1px solid ${
    active ? alpha(theme.palette.primary.main, 0.18) : theme.palette.divider
  }`,
  color: theme.palette.text.primary,
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.08)
      : alpha(theme.palette.common.white, 0.96)
    : theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.58)
      : alpha(theme.palette.common.white, 0.76),
  boxShadow: active ? theme.shadows[1] : 'none',
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.18),
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, active ? 0.1 : 0.06)
        : active
          ? alpha(theme.palette.common.white, 0.98)
          : alpha(theme.palette.primary.main, 0.05),
  },
}));

const NewsFeatureCard = styled(Box)(({ theme }) => ({
  borderRadius: 24,
  padding: theme.spacing(1.5),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
  background:
    theme.palette.mode === 'dark'
      ? `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.08)} 0%, ${alpha(
          theme.palette.background.paper,
          0.7
        )} 42%, ${alpha(theme.palette.background.paper, 0.84)} 100%)`
      : `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.07)} 0%, ${alpha(
          theme.palette.common.white,
          0.94
        )} 42%, ${alpha(theme.palette.common.white, 0.88)} 100%)`,
  boxShadow: theme.shadows[1],
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr)',
  gap: theme.spacing(2),
  overflow: 'hidden',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
  },
}));

const NewsFeatureStage = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: 280,
  borderRadius: 22,
  border: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.08 : 0.3)}`,
  overflow: 'hidden',
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.7)
      : alpha(theme.palette.common.white, 0.9),
}));

const NewsFeatureImage = styled(motion.img)(() => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
}));

const NewsFeatureShade = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(18,15,13,0.02) 0%, rgba(18,15,13,0.04) 42%, rgba(18,15,13,0.08) 100%)'
      : 'linear-gradient(180deg, rgba(29,23,18,0.01) 0%, rgba(29,23,18,0.03) 42%, rgba(29,23,18,0.06) 100%)',
}));

const AboutSection = forwardRef((_, ref) => {
  const theme = useTheme();
  const [showStats, setShowStats] = useState(false);
  const [activeFocus, setActiveFocus] = useState(0);
  const [activeUpdate, setActiveUpdate] = useState(0);
  const currentFocus = focusModes[activeFocus];
  const currentUpdate = latestUpdates[activeUpdate];
  const currentUpdateImage = currentUpdate.images?.[0];

  return (
    <Box
      ref={ref}
      component={motion.section}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{ py: { xs: 3, md: 5 } }}
    >
      <Container maxWidth="xl">
        <HeroSurface
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Stack spacing={4}>
            <Stack
              spacing={3}
              component={motion.div}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <Chip icon={<TimelineIcon />} label="About" size="small" sx={{ width: 'fit-content' }} />
              <HeroTitle>
                Hi, I&apos;m Anjan. I build <HeroTitleAccent>AI products</HeroTitleAccent> and{' '}
                <HeroTitleAccent>backend systems</HeroTitleAccent> that are secure, scalable, and
                ready for production.
              </HeroTitle>
              <HeroLead>
                I&apos;m Co-Founder of Social Bridge AI and a Lead Software Engineer at
                SquarePlanIT, working across LLM applications, backend architecture, DevSecOps,
                and MLOps to turn strong ideas into reliable software.
              </HeroLead>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button variant="contained" startIcon={<MailOutlineIcon />} href="mailto:anjanmandalwork@gmail.com">
                  Build together
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<LinkedInIcon />}
                  href="https://www.linkedin.com/in/mandal-anjan/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  href="https://github.com/anjanmandal"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </Button>
              </Stack>
            </Stack>

            <FocusPanel
              component={motion.div}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
            >
              <Stack spacing={0.6}>
                <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
                  Current Focus
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Building AI products that are useful, usable, and production-ready.
                </Typography>
              </Stack>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
                  gap: 1.25,
                  width: '100%',
                }}
              >
                {focusModes.map((mode, index) => (
                  <FocusSwitch
                    key={mode.label}
                    active={activeFocus === index}
                    variant="text"
                    onClick={() => setActiveFocus(index)}
                  >
                    {mode.label}
                  </FocusSwitch>
                ))}
              </Box>

              <FocusCard
                component={motion.div}
                key={currentFocus.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                  {currentFocus.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.75 }}>
                  {currentFocus.detail}
                </Typography>
                <Typography variant="caption" sx={{ mt: 1.25, display: 'block', color: 'text.secondary' }}>
                  {currentFocus.meta}
                </Typography>
              </FocusCard>
            </FocusPanel>

            <Stack spacing={2.5}>
              <PortraitPanel
                component={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6 }}
              />
              <Grid container spacing={2} component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
                {heroMetrics.map((metric) => (
                  <Grid size={{ xs: 12, sm: 4 }} key={metric.label} component={motion.div} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <MetricTile
                      label={metric.label}
                      value={metric.value}
                      detail={metric.detail}
                      valueVariant="h3"
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </HeroSurface>
      </Container>

      <Container maxWidth="xl" sx={{ mt: { xs: 6, md: 8 } }}>
        <NewsSurface
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
                Latest Updates
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.25 }}>
                News about what I&apos;m building, shipping, and winning.
              </Typography>
            </Box>
            <Chip
              label={`${String(activeUpdate + 1).padStart(2, '0')} / ${String(
                latestUpdates.length
              ).padStart(2, '0')}`}
              size="small"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.primary.main, 0.16) }}
            />
          </Stack>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
              gap: 1.5,
            }}
          >
            {latestUpdates.map((update, index) => (
              <NewsSwitch
                key={update.title}
                active={activeUpdate === index}
                variant="text"
                onClick={() => setActiveUpdate(index)}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography
                    variant="caption"
                    sx={{ display: 'block', mb: 0.85, color: 'text.secondary' }}
                  >
                    {update.date} • {update.category}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.45 }}>
                    {update.title}
                  </Typography>
                </Box>
              </NewsSwitch>
            ))}
          </Box>

          <NewsFeatureCard
            component={motion.div}
            key={currentUpdate.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <NewsFeatureStage>
              <NewsFeatureImage
                key={currentUpdateImage}
                src={currentUpdateImage}
                alt={currentUpdate.title}
                initial={{ opacity: 0.3, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
              />
              <NewsFeatureShade />
            </NewsFeatureStage>

            <Stack spacing={1.5} sx={{ p: { xs: 1, md: 1.25 }, justifyContent: 'center' }}>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                <Chip
                  label={currentUpdate.category}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'text.primary',
                    borderColor: alpha(theme.palette.primary.main, 0.12),
                  }}
                  variant="outlined"
                />
                <Typography variant="caption" color="text.secondary">
                  {currentUpdate.date}
                </Typography>
              </Stack>

              <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
                {currentUpdate.label}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.2, maxWidth: 760 }}>
                {currentUpdate.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.75, maxWidth: 860 }}>
                {currentUpdate.summary}
              </Typography>
              <Divider />
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 860 }}>
                {currentUpdate.detail}
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {currentUpdate.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Stack>
            </Stack>
          </NewsFeatureCard>
        </NewsSurface>
      </Container>

      <Container maxWidth="xl" sx={{ mt: { xs: 6, md: 8 } }}>
        <Paper
          sx={{
            borderRadius: 5,
            p: { xs: 3, md: 4 },
            border: (t) => `1px solid ${t.palette.divider}`,
            background:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.82)
                : alpha(theme.palette.common.white, 0.76),
            boxShadow: theme.shadows[1],
            backdropFilter: 'blur(18px)',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Impact metrics & live dashboards
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Curious about uptime, feature velocity, or speaking engagements? Pop open the panel
                below to view detailed metrics and ongoing experiments.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
              <Button
                variant={showStats ? 'outlined' : 'contained'}
                onClick={() => setShowStats((prev) => !prev)}
              >
                {showStats ? 'Hide metrics' : 'Open metrics'}
              </Button>
            </Grid>
          </Grid>
          <Collapse in={showStats} timeout="auto" unmountOnExit>
            <Box
              sx={{
                mt: 3,
                borderRadius: 5,
                border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.12)}`,
                background:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.84)
                    : alpha(theme.palette.common.white, 0.82),
                overflow: 'hidden',
                boxShadow: theme.shadows[1],
              }}
            >
              <Stack spacing={2} p={{ xs: 2.5, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  {heroMetrics.map((metric) => (
                    <MetricTile
                      key={`trigger-${metric.label}`}
                      label={metric.label}
                      value={metric.value}
                      detail={metric.detail}
                      sx={{ flex: 1, borderRadius: 3 }}
                    />
                  ))}
                </Stack>
                <Divider />
                <ModernStatsSection />
              </Stack>
            </Box>
          </Collapse>
        </Paper>
      </Container>
    </Box>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
