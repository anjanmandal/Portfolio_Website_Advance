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

const heroMetrics = [
  { label: 'GitHub Repositories', value: '30+', detail: 'Climate tech, autism support, etc' },
{ label: 'Hackathon Winner', value: '3+', detail: '3× ULM hackathon wins' },
{ label: 'Awards', value: '5+', detail: 'ICPC NA South Gold' },

];

const timelineEntries = [
  {
    year: '2025',
    title: 'Co-Founder · Autism Speaks AI · ICPC NA South Gold',
    detail:
      'Architected a privacy-first AI coaching platform and led Team Warhawks to ICPC NA South Division 1 gold at LSU.',
  },
  {
    year: '2025',
    title: 'Finalist · Nexus Technology Cup & DevDays (Climate Tech & Health Tech, Louisiana)',
    detail:
      'Pitched Autism Speaks AI and LA.CO₂ across Louisiana, advancing to finals in statewide Nexus Technology Cup and DevDays Climate Tech and Health Tech competitions.',
  },
  {
    year: '2024',
    title: 'Lead Software Engineering Intern · SquarePlanIT',
    detail:
      'Designed and shipped system-design–driven features while tightening DevSecOps: CI/CD, SAST, and observability so every release was faster, safer, and easier to debug.',
  },
];

const HeroSurface = styled(Box)(({ theme }) => ({
  borderRadius: 40,
  padding: theme.spacing(5),
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(130deg, rgba(4,9,23,0.95), rgba(6,20,48,0.92))'
      : 'linear-gradient(130deg, rgba(250,251,255,0.96), rgba(228,236,255,0.94))',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  position: 'relative',
  overflow: 'hidden',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 50px 110px rgba(2,6,23,0.75)'
    : '0 40px 90px rgba(15,23,42,0.12)',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: '50%',
    top: -120,
    right: -90,
    background: alpha(theme.palette.secondary.main, 0.3),
    filter: 'blur(65px)',
  },
}));

const PortraitPanel = styled(Box)(({ theme }) => ({
  borderRadius: 28,
  minHeight: 360,
  backgroundImage:
    'linear-gradient(120deg, rgba(15,23,42,0.35), rgba(15,23,42,0.7)), url(/images/profile-3.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center 20%',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 35px 80px rgba(2,6,23,0.7)'
    : '0 30px 70px rgba(15,23,42,0.15)',
}));

const MetricCard = styled(Box)(({ theme }) => ({
  borderRadius: 24,
  padding: theme.spacing(2.5),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.08)
      : alpha(theme.palette.primary.main, 0.05),
}));

const TimelineCard = styled(Paper)(({ theme }) => ({
  borderRadius: 30,
  padding: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
}));

const AboutSection = forwardRef((_, ref) => {
  const theme = useTheme();
  const [showStats, setShowStats] = useState(false);

  return (
    <Box
      ref={ref}
      component={motion.section}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      sx={{ py: { xs: 10, md: 14 } }}
    >
      <Container maxWidth="lg">
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
              <Chip icon={<TimelineIcon />} label="About" size="small" />
              <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1.15 }}>
                Hi, I’m Anjan—full-stack engineer, security enthusiast, and AI/ML tinkerer shipping
                resilient, human-centered software.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Co-Founder of Autism Speaks AI and Lead Software Engineering Intern at SquarePlanIT, where I
                work across system design, DevOps, and AI/ML to build scalable, production-ready platforms.
              </Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
                <Button variant="contained" startIcon={<MailOutlineIcon />} href="mailto:anjanmandalwork@gmail.com">
                  Collaborate
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
                  <Grid item xs={12} sm={4} key={metric.label} component={motion.div} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <MetricCard>
                      <Typography variant="h4" sx={{ fontWeight: 900 }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="subtitle2">{metric.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {metric.detail}
                      </Typography>
                    </MetricCard>
                  </Grid>
                ))}
              </Grid>
              <Paper
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                sx={{
                  borderRadius: 2,
                  p: 2.5,
                  border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.12)}`,
                }}
              >
                <Stack spacing={2}>
                  {timelineEntries.map((entry) => (
                    <Stack key={`hero-timeline-${entry.year}`} component={motion.div} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.4 }} spacing={0.8}>
                      <Typography variant="overline" sx={{ letterSpacing: 2 }}>
                        {entry.year}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                        {entry.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {entry.detail}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Stack>
          </Stack>
        </HeroSurface>
      </Container>

      <Container maxWidth="lg" sx={{ mt: { xs: 6, md: 8 } }}>
        <Paper
          sx={{
            borderRadius: 5,
            p: { xs: 3, md: 4 },
            border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.12)}`,
            background:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.background.paper, 0.65)
                : alpha(theme.palette.background.paper, 0.95),
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Typography variant="h6" sx={{ fontWeight: 800 }}>
                Impact metrics & live dashboards
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Curious about uptime, feature velocity, or speaking engagements? Pop open the panel
                below to view detailed metrics and ongoing experiments.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
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
                    ? 'linear-gradient(135deg, rgba(2,6,23,0.9), rgba(6,24,44,0.92))'
                    : 'linear-gradient(135deg, rgba(250,252,255,0.98), rgba(232,240,255,0.96))',
                overflow: 'hidden',
              }}
            >
              <Stack spacing={2} p={{ xs: 2.5, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  {heroMetrics.map((metric) => (
                    <MetricCard key={`trigger-${metric.label}`} sx={{ flex: 1, borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 900 }}>
                        {metric.value}
                      </Typography>
                      <Typography variant="subtitle2">{metric.label}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {metric.detail}
                      </Typography>
                    </MetricCard>
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
