// src/components/ExperienceDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Avatar,
  Paper,
  Button,
  Chip,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import experiences from './Experience';
import MetricTile from './MetricTile';

const detailProfiles = {
  1: {
    eyebrow: 'Cloud delivery',
    roleNote:
      'Production-oriented internship focused on reliability, release velocity, and backend hardening inside a live SaaS platform.',
    tags: ['AWS', 'Kubernetes', 'Node.js', 'Jenkins', 'Security'],
    stack: ['Node.js', 'AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Entity Framework'],
    metrics: [
      { label: 'Reliability', value: '+40%', detail: 'Service and API stability lift' },
      { label: 'Deploy time', value: '-60%', detail: 'Faster cloud rollouts' },
      { label: 'Clients', value: '30+', detail: 'AWS environments supported' },
    ],
    panels: {
      impact: {
        title: 'Impact delivered',
        intro: 'The work centered on removing production friction and making releases more dependable.',
        bullets: [
          'Reduced API error rates by 30% and improved reliability by 40% by fixing rate-limit and scaling issues.',
          'Cut deployment failures by 25% and release times by 30% by introducing Jenkins-based CI/CD.',
          'Improved performance by 70% and strengthened data security by 75% through query and authorization fixes.',
        ],
      },
      systems: {
        title: 'Systems touched',
        intro: 'The role crossed application, infrastructure, and data layers instead of living inside one feature silo.',
        bullets: [
          'Managed AWS services for 30+ clients, including auto-scaling and EKS-backed deployments.',
          'Worked across Node.js services, API gateways, and ORM-based data access flows.',
          'Optimized EF Core, Sequelize, and Mongoose behavior in high-traffic application paths.',
        ],
      },
      approach: {
        title: 'How I worked',
        intro: 'Most of the wins came from tracing issues end to end, then tightening the release path around them.',
        bullets: [
          'Used monitoring and log analysis to diagnose intermittent failures before changing infrastructure behavior.',
          'Paired faster delivery with safer deployment flows so release speed did not weaken reliability.',
          'Treated performance, security, and operations as one shared reliability problem.',
        ],
      },
    },
  },
  2: {
    eyebrow: 'Teaching + research',
    roleNote:
      'Combined classroom support, coding mentorship, and AI research communication inside ULM’s academic environment.',
    tags: ['Teaching', 'AI/ML', 'Java', 'Python', 'Mentorship'],
    stack: ['Java', 'Python', 'LeetCode', 'Algorithms', 'AI Research'],
    metrics: [
      { label: 'Coding growth', value: '+30%', detail: 'Student coding improvement' },
      { label: 'Grade lift', value: '+40%', detail: 'Improvement in course outcomes' },
      { label: 'Recognition', value: 'Scholar', detail: 'Selected for Emerging Scholar Program' },
    ],
    panels: {
      impact: {
        title: 'Impact delivered',
        intro: 'The role focused on making technical learning more accessible and more effective for students.',
        bullets: [
          'Increased student coding skills by 30% through regular LeetCode practice in Java and Python.',
          'Improved grades by 40% with a visual application built to explain algorithms and data structures.',
          'Earned Emerging Scholar recognition and presented AI research at a symposium.',
        ],
      },
      systems: {
        title: 'Environments touched',
        intro: 'This experience sat at the intersection of teaching, pedagogy, and research communication.',
        bullets: [
          'Supported core computer science learning in algorithms, data structures, and problem solving.',
          'Built classroom-friendly tools to make abstract concepts easier to visualize.',
          'Connected AI research in neural networks and machine learning to academic presentation work.',
        ],
      },
      approach: {
        title: 'How I worked',
        intro: 'I approached the role like product work for learning: clarity, repetition, and measurable progress.',
        bullets: [
          'Used challenge-based learning to build repetition and confidence around coding fundamentals.',
          'Turned complex topics into visual workflows instead of relying only on lecture explanation.',
          'Balanced mentorship with research communication so technical depth stayed understandable.',
        ],
      },
    },
  },
  3: {
    eyebrow: 'Startup engineering',
    roleNote:
      'Fast-moving internship focused on secure authentication, modernization of legacy code, and rapid startup delivery.',
    tags: ['React', 'Node.js', 'Django', 'JWT', 'Startup Builds'],
    stack: ['React', 'Node.js', 'Django', 'Passport.js', 'JWT'],
    metrics: [
      { label: 'Security', value: '+40%', detail: 'Authentication hardening' },
      { label: 'Performance', value: '+30%', detail: 'Legacy software improvement' },
      { label: 'Launches', value: '10+', detail: 'Startup apps deployed' },
    ],
    panels: {
      impact: {
        title: 'Impact delivered',
        intro: 'The role focused on modernizing systems while still moving quickly for startup teams.',
        bullets: [
          'Boosted security by 40% through custom JWT and session authentication improvements.',
          'Improved legacy software performance by 30% with Node.js and Django refactors.',
          'Developed and deployed 10+ startup applications to raise production capacity by 40%.',
        ],
      },
      systems: {
        title: 'Systems touched',
        intro: 'The work moved between authentication, backend modernization, and new application delivery.',
        bullets: [
          'Built secure authentication flows with Passport.js, token validation, and session handling.',
          'Refactored software inherited from earlier development cycles to meet modern best practices.',
          'Delivered React, Node.js, and Vue.js application work across multiple startup contexts.',
        ],
      },
      approach: {
        title: 'How I worked',
        intro: 'This role rewarded speed, breadth, and the ability to improve code that already existed.',
        bullets: [
          'Started with vulnerabilities and bottlenecks first, then improved maintainability around them.',
          'Worked across legacy and new code paths without treating them as separate efforts.',
          'Balanced rapid delivery with stronger security and cleaner architectural patterns.',
        ],
      },
    },
  },
};

const panelOptions = [
  { id: 'impact', label: 'Impact', icon: AutoAwesomeRoundedIcon },
  { id: 'systems', label: 'Systems', icon: InsightsRoundedIcon },
  { id: 'approach', label: 'Approach', icon: BuildRoundedIcon },
];

const SurfaceCard = styled(Paper)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 28,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.82),
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(18px)',
}));

const HeroCard = styled(SurfaceCard)(({ theme }) => ({
  padding: theme.spacing(3.2),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.78)} 0%, ${alpha(
      theme.palette.primary.main,
      0.12
    )} 68%, transparent 100%)`,
  },
}));

const SideCard = styled(SurfaceCard)(({ theme }) => ({
  padding: theme.spacing(2.5),
}));

const MediaCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 28,
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[2],
  minHeight: 320,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.82)
      : alpha(theme.palette.common.white, 0.84),
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    minHeight: 320,
    transition: 'transform 420ms ease',
  },
}));

const MediaOverlay = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(2),
  right: theme.spacing(2),
  bottom: theme.spacing(2),
  padding: theme.spacing(1.1, 1.35),
  borderRadius: 18,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.86)
      : alpha(theme.palette.common.white, 0.84),
  backdropFilter: 'blur(12px)',
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(1),
  boxShadow: theme.shadows[1],
}));

const MetaPill = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.85),
  width: 'fit-content',
  padding: theme.spacing(0.55, 1),
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.12)
      : alpha(theme.palette.primary.main, 0.06),
}));

const MetaDot = styled(Box)(({ theme }) => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
}));

const ViewToggle = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  flex: 1,
  minWidth: 0,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(1.05, 1.15),
  borderRadius: 18,
  border: `1px solid ${active ? alpha(theme.palette.primary.main, 0.2) : theme.palette.divider}`,
  background:
    active
      ? theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.12)
        : alpha(theme.palette.primary.main, 0.08)
      : theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.03)
        : alpha(theme.palette.common.white, 0.7),
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  transition: 'all 180ms ease',
  cursor: 'pointer',
  appearance: 'none',
  textAlign: 'left',
  '&:hover': {
    color: theme.palette.text.primary,
    borderColor: alpha(theme.palette.primary.main, 0.16),
    transform: 'translateY(-1px)',
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha(theme.palette.primary.main, 0.24)}`,
  },
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

const overlayVariants = {
  rest: { opacity: 0.92, y: 0 },
  hover: { opacity: 1, y: -4 },
};

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const panelVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.24 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.18 } },
};

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [activePanel, setActivePanel] = useState('impact');

  useEffect(() => {
    setActivePanel('impact');
  }, [id]);

  const experience = experiences.find((exp) => exp.id.toString() === id);

  if (!experience) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Experience Not Found
        </Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Box>
    );
  }

  const profile = detailProfiles[experience.id] || {
    eyebrow: 'Role profile',
    roleNote: experience.description,
    tags: experience.tags || ['Software', 'Backend', 'Delivery'],
    stack: experience.stack ? experience.stack.split(',').map((item) => item.trim()) : ['React', 'Node.js', 'AWS'],
    metrics: [
      { label: 'Timeline', value: experience.year, detail: 'Role duration' },
      { label: 'Company', value: experience.company, detail: 'Organization' },
      { label: 'Focus', value: 'Engineering', detail: 'Delivery and reliability' },
    ],
    panels: {
      impact: {
        title: 'Impact delivered',
        intro: 'Highlights from the role.',
        bullets: experience.content.slice(0, 3),
      },
      systems: {
        title: 'Systems touched',
        intro: 'Areas this role interacted with.',
        bullets: experience.content.slice(0, 3),
      },
      approach: {
        title: 'How I worked',
        intro: 'How the role was executed.',
        bullets: experience.content.slice(0, 3),
      },
    },
  };

  const activePanelData = profile.panels[activePanel] || profile.panels.impact;

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: theme.palette.background.gradient,
        color: theme.palette.text.primary,
        pb: 8,
      }}
    >
      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
        <Stack spacing={3.2} component={motion.div} variants={heroVariants} initial="hidden" animate="visible">
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            justifyContent="space-between"
          >
            <Breadcrumbs separator="•" sx={{ color: 'text.secondary' }}>
              <Link
                component="button"
                type="button"
                underline="hover"
                color="inherit"
                onClick={() => navigate('/')}
              >
                Home
              </Link>
              <Link
                component="button"
                type="button"
                underline="hover"
                color="inherit"
                onClick={() => navigate('/')}
              >
                Experience
              </Link>
              <Typography color="text.primary">{experience.company}</Typography>
            </Breadcrumbs>

            <ActionButton variant="outlined" startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate(-1)}>
              Back
            </ActionButton>
          </Stack>

          <Grid container spacing={3} alignItems="stretch">
            <Grid size={{ xs: 12, lg: 7 }}>
              <HeroCard
                component={motion.div}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Stack spacing={2.2}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                    <MetaPill>
                      <MetaDot />
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                      >
                        {profile.eyebrow}
                      </Typography>
                    </MetaPill>
                    <Chip label={experience.year} size="small" variant="outlined" />
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={experience.logo}
                      alt={experience.company}
                      sx={{
                        width: 72,
                        height: 72,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                        bgcolor: alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.04 : 0.8),
                      }}
                    />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1.08 }}>
                        {experience.title}
                      </Typography>
                      <Typography variant="h6" color="text.secondary" sx={{ mt: 0.7 }}>
                        {experience.company}
                      </Typography>
                    </Box>
                  </Stack>

                  <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '62ch' }}>
                    {experience.description}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {profile.tags.map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Stack>
                </Stack>
              </HeroCard>
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <MediaCard initial="rest" animate="rest" whileHover="hover">
                <img src={experience.mainImage} alt={`${experience.company} main`} />
                <MediaOverlay variants={overlayVariants}>
                  <InfoOutlined sx={{ mt: 0.2, fontSize: 18 }} />
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {experience.imageDescription || 'Behind-the-scenes capture.'}
                  </Typography>
                </MediaOverlay>
              </MediaCard>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {profile.metrics.map((metric, idx) => (
              <Grid key={metric.label} size={{ xs: 12, md: 4 }}>
                <MetricTile
                  label={metric.label}
                  value={metric.value}
                  detail={metric.detail}
                  valueVariant={idx === 1 ? 'h3' : 'h4'}
                  sx={{ height: '100%' }}
                />
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} alignItems="flex-start">
            <Grid size={{ xs: 12, lg: 7 }}>
              <SurfaceCard sx={{ p: { xs: 2.4, md: 3 } }}>
                <Stack spacing={2.25}>
                  <Box>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                    >
                      Experience lens
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 0.85, fontWeight: 800 }}>
                      Explore the role from the angle that mattered most.
                    </Typography>
                  </Box>

                  <Stack direction={{ xs: 'column', md: 'row' }} spacing={1}>
                    {panelOptions.map((option) => {
                      const Icon = option.icon;
                      const active = activePanel === option.id;

                      return (
                        <ViewToggle
                          key={option.id}
                          active={active}
                          component="button"
                          type="button"
                          onClick={() => setActivePanel(option.id)}
                        >
                          <Icon sx={{ fontSize: 20 }} />
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {option.label}
                          </Typography>
                        </ViewToggle>
                      );
                    })}
                  </Stack>

                  <AnimatePresence mode="wait">
                    <Box
                      key={activePanel}
                      component={motion.div}
                      variants={panelVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Stack spacing={2}>
                        <Box>
                          <Typography variant="h5" sx={{ fontWeight: 800 }}>
                            {activePanelData.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {activePanelData.intro}
                          </Typography>
                        </Box>

                        <Stack spacing={1.15}>
                          {activePanelData.bullets.map((item, idx) => (
                            <HighlightRow key={`${activePanel}-${idx}`}>
                              <CheckRoundedIcon color="primary" sx={{ mt: 0.15, fontSize: 18 }} />
                              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.72 }}>
                                {item}
                              </Typography>
                            </HighlightRow>
                          ))}
                        </Stack>
                      </Stack>
                    </Box>
                  </AnimatePresence>
                </Stack>
              </SurfaceCard>
            </Grid>

            <Grid size={{ xs: 12, lg: 5 }}>
              <Stack spacing={3} sx={{ position: { lg: 'sticky' }, top: { lg: 24 } }}>
                <SideCard>
                  <Stack spacing={2}>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                      >
                        Role snapshot
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 0.9, fontWeight: 800 }}>
                        {profile.roleNote}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                        Working stack
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {profile.stack.map((item) => (
                          <Chip key={item} label={item} size="small" variant="outlined" />
                        ))}
                      </Stack>
                    </Box>
                  </Stack>
                </SideCard>

                <SideCard>
                  <Stack spacing={1.4}>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                    >
                      Career context
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.72 }}>
                      This role sits inside a broader pattern across my experience: shipping product work, improving
                      reliability, and keeping technical decisions grounded in people who have to use and maintain the
                      system later.
                    </Typography>
                  </Stack>
                </SideCard>
              </Stack>
            </Grid>
          </Grid>

          <Box textAlign="center" pt={1}>
            <ActionButton
              variant="contained"
              color="primary"
              onClick={() => navigate(-1)}
              size="large"
              endIcon={<ArrowOutwardRoundedIcon />}
            >
              Back to Experiences
            </ActionButton>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ExperienceDetail;
