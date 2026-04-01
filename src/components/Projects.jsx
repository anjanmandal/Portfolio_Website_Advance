// src/components/Projects.jsx
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button, Chip, Stack, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import MobileIcon from '@mui/icons-material/PhoneAndroid';
import StorageIcon from '@mui/icons-material/Storage';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import ViewCarouselRoundedIcon from '@mui/icons-material/ViewCarouselRounded';
import { useNavigate } from 'react-router-dom';
import SectionFrame from './SectionFrame';

const StudioShell = styled('article', {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ theme, accentColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  borderRadius: 30,
  padding: theme.spacing(2.5),
  border: `1px solid ${alpha(accentColor, 0.18)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.82),
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(16px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '0 0 auto 0',
    height: 4,
    background: `linear-gradient(90deg, ${alpha(accentColor, 0.9)} 0%, ${alpha(
      accentColor,
      0.12
    )} 72%, transparent 100%)`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -44,
    right: -24,
    width: 220,
    height: 220,
    borderRadius: '50%',
    background: alpha(accentColor, 0.08),
    filter: 'blur(34px)',
    zIndex: -1,
  },
}));

const RailPanel = styled(Box)(({ theme }) => ({
  borderRadius: 24,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.78)
      : alpha(theme.palette.common.white, 0.74),
  padding: theme.spacing(1.25),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

const RailItem = styled('button', {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  width: '100%',
  position: 'relative',
  textAlign: 'left',
  borderRadius: 18,
  padding: theme.spacing(1.4),
  border: `1px solid ${active ? alpha(accentColor, 0.22) : 'transparent'}`,
  background:
    active
      ? theme.palette.mode === 'dark'
        ? alpha(accentColor, 0.12)
        : alpha(accentColor, 0.08)
      : 'transparent',
  cursor: 'pointer',
  appearance: 'none',
  transition: 'transform 180ms ease, border-color 180ms ease, background 180ms ease',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 12,
    bottom: 12,
    left: 0,
    width: 3,
    borderRadius: 999,
    background: active ? accentColor : 'transparent',
  },
  '&:hover': {
    transform: 'translateX(2px)',
    borderColor: alpha(accentColor, 0.14),
    background:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.02)
        : alpha(accentColor, 0.04),
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha(accentColor, 0.2)}`,
  },
}));

const PreviewStage = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ theme, accentColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  minHeight: 460,
  borderRadius: 28,
  border: `1px solid ${alpha(accentColor, 0.18)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.88)
      : alpha(theme.palette.common.white, 0.9),
  boxShadow: theme.shadows[1],
}));

const PreviewMedia = styled(motion.img)(() => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
}));

const PreviewShade = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(18,15,13,0.02) 0%, rgba(18,15,13,0.08) 46%, rgba(18,15,13,0.2) 100%)'
      : 'linear-gradient(180deg, rgba(29,23,18,0.02) 0%, rgba(29,23,18,0.06) 46%, rgba(29,23,18,0.16) 100%)',
}));

const MockPreview = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ theme, accentColor }) => ({
  position: 'absolute',
  inset: 0,
  padding: theme.spacing(3),
  display: 'grid',
  gridTemplateRows: 'auto auto 1fr auto',
  gap: theme.spacing(2),
  background:
    theme.palette.mode === 'dark'
      ? `radial-gradient(circle at top right, ${alpha(accentColor, 0.16)}, transparent 34%), linear-gradient(180deg, ${alpha(
          '#0f172a',
          0.96
        )} 0%, ${alpha('#0b1220', 0.96)} 100%)`
      : `radial-gradient(circle at top right, ${alpha(accentColor, 0.14)}, transparent 34%), linear-gradient(180deg, ${alpha(
          '#f8fafc',
          0.98
        )} 0%, ${alpha('#eef2ff', 0.98)} 100%)`,
}));

const MockMetricGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
}));

const MockMetric = styled(Box)(({ theme }) => ({
  borderRadius: 18,
  border: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.08 : 0.3)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.72),
  padding: theme.spacing(1.2),
  minHeight: 88,
}));

const MockChecklist = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
}));

const MockChecklistRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '12px 1fr',
  gap: theme.spacing(1),
  alignItems: 'start',
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.08 : 0.28)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.68),
  padding: theme.spacing(1.1, 1.2),
}));

const PreviewOverlay = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(1.75),
}));

const InfoPanel = styled(Box)(({ theme }) => ({
  borderRadius: 24,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.78)
      : alpha(theme.palette.common.white, 0.76),
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const MetaPill = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.8),
  width: 'fit-content',
  padding: theme.spacing(0.55, 1),
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
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

const FactCard = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.primary.main, 0.03),
  padding: theme.spacing(1.35, 1.45),
}));

const ProofGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.25),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
}));

const ProofCard = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.78)
      : alpha(theme.palette.common.white, 0.74),
  padding: theme.spacing(1.45),
}));

const ThumbButton = styled('button', {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  width: 86,
  height: 64,
  borderRadius: 16,
  overflow: 'hidden',
  border: `1px solid ${active ? alpha(accentColor, 0.24) : theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.7)
      : alpha(theme.palette.common.white, 0.76),
  padding: 0,
  cursor: 'pointer',
  boxShadow: active ? theme.shadows[1] : 'none',
  transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  '&:hover': {
    transform: 'translateY(-1px)',
    borderColor: alpha(accentColor, 0.18),
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  paddingInline: theme.spacing(1.8),
  fontWeight: 700,
}));

const accentColors = ['#B85A2E', '#D46F3A', '#8F4524', '#74695E', '#F3AF7A', '#564D46'];
const AUTO_ADVANCE_MS = 4200;

const getOverlayControlSx = (theme) => ({
  bgcolor:
    theme.palette.mode === 'dark'
      ? alpha('#111827', 0.78)
      : alpha('#ffffff', 0.84),
  color: theme.palette.mode === 'dark' ? '#f8fafc' : '#111827',
  borderColor:
    theme.palette.mode === 'dark'
      ? alpha('#f8fafc', 0.12)
      : alpha('#ffffff', 0.28),
  backdropFilter: 'blur(12px)',
});

const projects = [
  {
    title: 'HelpHub',
    date: '2024',
    category: 'Full-Stack Development',
    filters: ['Full-Stack', 'Startup', 'Community'],
    tag: 'Marketplace build',
    description:
      'HelpHub turns service requests, bidding, and coordination into one cleaner marketplace workflow.',
    role: 'Full-stack product build',
    outcome: 'Matched requests, pricing, and communication in one shared flow.',
    stack: ['React', 'Node.js', 'MongoDB'],
    details: 'Bid system • Real-time notifications • LinkedIn integration',
    railNote: 'Marketplace / realtime',
    icon: WebIcon,
    images: ['/images/dashboard.png', '/images/bid.png', '/images/request.png', '/images/mybids.png'],
    link: 'https://github.com/anjanmandal/HelpHub.git',
    proof: [
      {
        label: 'Problem',
        text: 'Hiring help online often feels fragmented and hard to trust.',
      },
      {
        label: 'Build',
        text: 'Bids, scheduling, notifications, and identity signals in one product flow.',
      },
      {
        label: 'Impact',
        text: 'Made matching, communication, and pricing feel more transparent.',
      },
    ],
  },
  {
    title: 'LA.CO₂ – Louisiana Carbon Platform',
    date: '2025',
    category: 'Climate Data Platform',
    filters: ['AI', 'Climate', 'Research'],
    tag: 'ClimateTech',
    description:
      'LA.CO₂ centralizes CCUS reporting, regulator QA/QC, and public transparency into one explainable data system.',
    role: 'Data platform + AI UX',
    outcome: 'Created one source of truth for operators, regulators, and the public.',
    stack: ['React', 'Node.js', 'OpenAI'],
    details: 'Operator portal • Regulator QA/QC dashboard • Public transparency hub',
    railNote: 'Climate / AI interface',
    icon: StorageIcon,
    images: ['/images/laco2-2.png', '/images/laco2-3.png', '/images/laco2-4.png', '/images/laco2-5.png', '/images/laco2-6.png'],
    link: 'https://github.com/anjanmandal/LA.CO-.git',
    proof: [
      {
        label: 'Problem',
        text: 'Carbon reporting and public transparency are usually fragmented across tools and PDFs.',
      },
      {
        label: 'Build',
        text: 'Upload, validation, dashboards, maps, and AI explanations in one interface.',
      },
      {
        label: 'Impact',
        text: 'Made compliance and storytelling easier for both experts and public audiences.',
      },
    ],
  },
  {
    title: 'PivotProof',
    date: '2025',
    category: 'Sports Science Platform',
    filters: ['AI', 'Research', 'Product'],
    tag: 'AI product',
    description:
      'PivotProof blends context logging, movement verification, and AI coaching to reduce ACL risk.',
    role: 'AI workflow design',
    outcome: 'Packaged injury prevention into a product that coaches can actually use.',
    stack: ['React', 'Node.js', 'Computer Vision'],
    details: 'Daily Risk log • Movement Coach • Counterfactual planner • N-of-1 biomechanical twins',
    railNote: 'Sports science / AI',
    icon: MobileIcon,
    images: [],
    mockPreview: {
      eyebrow: 'Athlete risk workspace',
      title: 'PivotProof coach console',
      metrics: [
        { value: '18%', label: 'risk delta' },
        { value: '12', label: 'athletes flagged' },
        { value: '4', label: 'plan changes' },
      ],
      checks: [
        'Daily Risk 2.0 combines fatigue, surface, and workload context.',
        'Movement Coach verifies mechanics through short clip review.',
        'Counterfactual planning suggests safer practice changes before sessions.',
      ],
    },
    link: 'https://github.com/anjanmandal/LA.CO-.git',
    proof: [
      {
        label: 'Problem',
        text: 'ACL prevention often stops at static advice instead of continuous, personalized feedback.',
      },
      {
        label: 'Build',
        text: 'Risk snapshots, clip-based checks, and what-if planning for practice decisions.',
      },
      {
        label: 'Impact',
        text: 'Turned athlete safety into a measurable workflow instead of a loose checklist.',
      },
    ],
  },
  {
    title: 'AI-L&L-VIDEO-GENERATOR',
    date: '2024',
    category: 'AI and Full-Stack',
    filters: ['AI', 'Creative', 'Full-Stack'],
    tag: 'Creator tool',
    description:
      'This build turns a text prompt into a generated video workflow with speech, subtitles, and visual output.',
    role: 'AI content workflow',
    outcome: 'Compressed multiple creative steps into one usable generation loop.',
    stack: ['React', 'Node.js', 'Three.js'],
    details: 'AI text generation • Text-to-speech • Video creation • Visual effects',
    railNote: 'AI / creative workflow',
    icon: CodeIcon,
    images: ['/images/L&L.png', '/images/L&L2.png', '/images/L&L3.png'],
    link: 'https://github.com/anjanmandal/L-L.git',
    proof: [
      {
        label: 'Problem',
        text: 'Video creation from prompts usually requires too many disconnected tools.',
      },
      {
        label: 'Build',
        text: 'Generation, speech synthesis, subtitle rendering, and export in one stack.',
      },
      {
        label: 'Impact',
        text: 'Made AI-assisted content production feel much more direct and accessible.',
      },
    ],
  },
  {
    title: 'Alumni Platform',
    date: '2024',
    category: 'Full-Stack Development',
    filters: ['Full-Stack', 'Community', 'Product'],
    tag: 'Community platform',
    description:
      'The Alumni Platform connects students and alumni around messaging, events, and career opportunities.',
    role: 'Realtime platform build',
    outcome: 'Made community networking feel more immediate and structured.',
    stack: ['React', 'Node.js', 'MongoDB'],
    details: 'Real-time chat • Event scheduling • Job opportunities',
    railNote: 'Community / realtime',
    icon: StorageIcon,
    images: ['/images/project_alumni.png', '/images/project_alumni2.png', '/images/project_alumni3.png'],
    link: 'https://github.com/anjanmandal/ULM_Alumni_Search_Dashboard.git',
    proof: [
      {
        label: 'Problem',
        text: 'Student and alumni relationships usually fade because the interaction surface is weak.',
      },
      {
        label: 'Build',
        text: 'Messaging, event planning, and opportunity sharing in one living network.',
      },
      {
        label: 'Impact',
        text: 'Created a stronger bridge between mentorship, networking, and job discovery.',
      },
    ],
  },
  {
    title: 'Lost and Found Website',
    date: '2024',
    category: 'Full-Stack Development',
    filters: ['Full-Stack', 'Community', 'Hackathon'],
    tag: 'Community utility',
    description:
      'This product turns lost-item reporting and recovery into a searchable, message-driven community workflow.',
    role: 'Community product build',
    outcome: 'Reduced friction around reporting, matching, and item recovery.',
    stack: ['React', 'Node.js', 'MongoDB'],
    details: 'Real-time chat • Advanced search • Geotagging • WebSocket',
    railNote: 'Hackathon / utility',
    icon: MobileIcon,
    images: ['/images/lost_found1.png', '/images/lost_found2.png', '/images/lost_found3.png'],
    link: 'https://github.com/anjanmandal/Lost-and-Found-website-.git',
    proof: [
      {
        label: 'Problem',
        text: 'Communities usually handle lost items through scattered posts and manual follow-up.',
      },
      {
        label: 'Build',
        text: 'Search, geotagging, chat, and reporting in one responsive interface.',
      },
      {
        label: 'Impact',
        text: 'Made a frustrating process faster, clearer, and easier to coordinate.',
      },
    ],
  },
  {
    title: 'Okay Journey',
    date: '2024',
    category: 'Full-Stack Development',
    filters: ['Full-Stack', 'Product', 'Startup'],
    tag: 'Travel product',
    description:
      'Okay Journey improves bus route discovery, booking, and ticket management with a clearer travel flow.',
    role: 'Booking platform',
    outcome: 'Packed search, pricing, payments, and ticketing into one smoother user journey.',
    stack: ['Web app', 'Payments', 'Multi-language'],
    details: 'E-ticketing • Payment gateway • Multi-language • Dynamic pricing',
    railNote: 'Travel / commerce',
    icon: WebIcon,
    images: ['/images/okay_journey3.jpg', '/images/okay_journey.png', '/images/okay_journey2.jpeg'],
    link: 'https://www.okayjourney.com',
    proof: [
      {
        label: 'Problem',
        text: 'Travel booking can feel clunky when route search, seats, and payments are disconnected.',
      },
      {
        label: 'Build',
        text: 'Seat selection, e-ticketing, multilingual UX, and dynamic pricing in one flow.',
      },
      {
        label: 'Impact',
        text: 'Made booking feel more productized instead of a patchwork travel utility.',
      },
    ],
  },
];

const sortedProjects = [...projects].sort((a, b) => Number(b.date) - Number(a.date));
const slugify = (title) => title.toLowerCase().replace(/[^\w]+/g, '-');

const ProjectsSection = forwardRef((_, ref) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeProjectTitle, setActiveProjectTitle] = useState(sortedProjects[0]?.title || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const filters = useMemo(
    () => ['All', ...Array.from(new Set(sortedProjects.flatMap((project) => project.filters || [])))],
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return sortedProjects;
    return sortedProjects.filter((project) => (project.filters || []).includes(activeFilter));
  }, [activeFilter]);

  useEffect(() => {
    if (!filteredProjects.length) {
      setActiveProjectTitle('');
      return;
    }

    if (!filteredProjects.some((project) => project.title === activeProjectTitle)) {
      setActiveProjectTitle(filteredProjects[0].title);
    }
  }, [activeProjectTitle, filteredProjects]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeProjectTitle]);

  const activeProject =
    filteredProjects.find((project) => project.title === activeProjectTitle) || filteredProjects[0];

  if (!activeProject) {
    return null;
  }

  const activeIndex = sortedProjects.findIndex((project) => project.title === activeProject.title);
  const activeAccent = accentColors[(activeIndex >= 0 ? activeIndex : 0) % accentColors.length];
  const ActiveIcon = activeProject.icon || CodeIcon;
  const activeSignals = activeProject.details.split('•').map((item) => item.trim()).filter(Boolean);
  const totalImages = activeProject.images?.length || 0;
  const currentImage = totalImages ? activeProject.images[activeImageIndex % totalImages] : null;
  const mockPreview = activeProject.mockPreview;

  useEffect(() => {
    if (totalImages <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % totalImages);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [totalImages, activeProject.title]);

  const handlePrevImage = () => {
    if (!totalImages) return;
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNextImage = () => {
    if (!totalImages) return;
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  };

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Build log"
      title="Highlighted Projects"
      subtitle="A more product-like way to browse the systems, prototypes, and AI builds behind the portfolio."
      contentSx={{ p: { xs: 1, sm: 2 }, pt: { xs: 2, md: 3 } }}
    >
      <Stack spacing={3} sx={{ maxWidth: 1240, mx: 'auto' }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'flex-start', lg: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Project studio
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pick a build from the rail, review the product preview, then jump into the full case study.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {filters.map((filter) => (
              <Chip
                key={filter}
                icon={filter === 'All' ? <TuneRoundedIcon sx={{ fontSize: 16 }} /> : undefined}
                label={filter}
                clickable
                onClick={() => setActiveFilter(filter)}
                variant="outlined"
                sx={{
                  bgcolor:
                    activeFilter === filter
                      ? (theme) => alpha(theme.palette.primary.main, 0.08)
                      : 'transparent',
                  borderColor:
                    activeFilter === filter
                      ? (theme) => alpha(theme.palette.primary.main, 0.18)
                      : undefined,
                  color: activeFilter === filter ? 'text.primary' : 'text.secondary',
                }}
              />
            ))}
          </Stack>
        </Stack>

        <StudioShell accentColor={activeAccent}>
          <Box
            sx={{
              display: 'grid',
              gap: 2,
              alignItems: 'start',
              gridTemplateColumns: { xs: '1fr', xl: '280px minmax(0, 1fr) 320px' },
            }}
          >
            <RailPanel sx={{ order: { xs: 2, xl: 1 } }}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
                sx={{ px: 0.5, pb: 0.5 }}
              >
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                  >
                    Project rail
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {filteredProjects.length} builds in view
                  </Typography>
                </Box>
                <Chip
                  icon={<ViewCarouselRoundedIcon sx={{ fontSize: 16 }} />}
                  label="Live preview"
                  size="small"
                  variant="outlined"
                  sx={{ borderColor: alpha(activeAccent, 0.14) }}
                />
              </Stack>

              {filteredProjects.map((project) => {
                const accent =
                  accentColors[
                    (sortedProjects.findIndex((item) => item.title === project.title) +
                      accentColors.length) %
                      accentColors.length
                  ];
                const IconComponent = project.icon || CodeIcon;
                const isActive = project.title === activeProject.title;

                return (
                  <RailItem
                    key={project.title}
                    type="button"
                    active={isActive}
                    accentColor={accent}
                    aria-pressed={isActive}
                    onClick={() => setActiveProjectTitle(project.title)}
                  >
                    <Stack spacing={0.85} sx={{ pl: 1.1 }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                          <IconComponent sx={{ fontSize: 18, color: accent }} />
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {project.title}
                          </Typography>
                        </Stack>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', letterSpacing: 0.6, textTransform: 'uppercase' }}
                        >
                          {project.date}
                        </Typography>
                      </Stack>

                      <Typography variant="caption" color="text.secondary">
                        {project.railNote}
                      </Typography>

                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        <Chip
                          label={project.tag}
                          size="small"
                          variant="outlined"
                          sx={{
                            bgcolor: alpha(accent, 0.06),
                            borderColor: alpha(accent, 0.16),
                            color: 'text.secondary',
                          }}
                        />
                        {isActive ? (
                          <Chip
                            icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />}
                            label="Selected"
                            size="small"
                            variant="outlined"
                            sx={{
                              bgcolor: alpha(accent, 0.08),
                              borderColor: alpha(accent, 0.18),
                              color: 'text.primary',
                            }}
                          />
                        ) : null}
                      </Stack>
                    </Stack>
                  </RailItem>
                );
              })}
            </RailPanel>

            <Stack spacing={1.5} sx={{ order: { xs: 1, xl: 2 }, minWidth: 0 }}>
              <PreviewStage accentColor={activeAccent}>
                <AnimatePresence mode="wait">
                  {currentImage ? (
                    <PreviewMedia
                      key={currentImage}
                      src={currentImage}
                      alt={`${activeProject.title} preview ${activeImageIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.22 }}
                    />
                  ) : mockPreview ? (
                    <MockPreview
                      key={`${activeProject.title}-mock`}
                      accentColor={activeAccent}
                      component={motion.div}
                      initial={{ opacity: 0, scale: 1.01 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.99 }}
                      transition={{ duration: 0.22 }}
                    >
                      <Stack spacing={0.9}>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                        >
                          {mockPreview.eyebrow}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 900,
                            lineHeight: 1.02,
                            color: (theme) => (theme.palette.mode === 'dark' ? '#f8fafc' : '#111827'),
                          }}
                        >
                          {mockPreview.title}
                        </Typography>
                      </Stack>

                      <MockMetricGrid>
                        {mockPreview.metrics.map((metric) => (
                          <MockMetric key={`${activeProject.title}-${metric.label}`}>
                            <Typography
                              variant="h5"
                              sx={{
                                fontWeight: 900,
                                color: (theme) => (theme.palette.mode === 'dark' ? '#f8fafc' : '#111827'),
                              }}
                            >
                              {metric.value}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ mt: 0.8, display: 'block', color: 'text.secondary', letterSpacing: 0.6 }}
                            >
                              {metric.label}
                            </Typography>
                          </MockMetric>
                        ))}
                      </MockMetricGrid>

                      <MockChecklist>
                        {mockPreview.checks.map((item) => (
                          <MockChecklistRow key={`${activeProject.title}-${item}`}>
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: activeAccent,
                                mt: 0.45,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                lineHeight: 1.65,
                                color: (theme) => (theme.palette.mode === 'dark' ? alpha('#f8fafc', 0.9) : '#374151'),
                              }}
                            >
                              {item}
                            </Typography>
                          </MockChecklistRow>
                        ))}
                      </MockChecklist>

                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
                        {activeSignals.slice(0, 3).map((signal) => (
                          <Chip
                            key={`${activeProject.title}-${signal}`}
                            label={signal}
                            size="small"
                            variant="outlined"
                            sx={{
                              bgcolor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? alpha('#f8fafc', 0.06)
                                  : alpha('#ffffff', 0.76),
                              borderColor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? alpha('#f8fafc', 0.12)
                                  : alpha(activeAccent, 0.18),
                              color: (theme) => (theme.palette.mode === 'dark' ? '#f8fafc' : '#111827'),
                            }}
                          />
                        ))}
                      </Stack>
                    </MockPreview>
                  ) : null}
                </AnimatePresence>
                <PreviewShade />
                <PreviewOverlay>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Chip
                      label={activeProject.tag}
                      size="small"
                      variant="outlined"
                      sx={(theme) => ({
                        ...getOverlayControlSx(theme),
                        fontWeight: 700,
                      })}
                    />

                    {totalImages > 1 ? (
                      <Stack direction="row" spacing={0.75}>
                        <IconButton
                          size="small"
                          aria-label="Previous project image"
                          onClick={handlePrevImage}
                          sx={(theme) => ({
                            ...getOverlayControlSx(theme),
                            border: `1px solid ${getOverlayControlSx(theme).borderColor}`,
                            '&:hover': {
                              bgcolor:
                                theme.palette.mode === 'dark'
                                  ? alpha('#111827', 0.9)
                                  : alpha('#ffffff', 0.94),
                            },
                          })}
                        >
                          <ChevronLeftRoundedIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          aria-label="Next project image"
                          onClick={handleNextImage}
                          sx={(theme) => ({
                            ...getOverlayControlSx(theme),
                            border: `1px solid ${getOverlayControlSx(theme).borderColor}`,
                            '&:hover': {
                              bgcolor:
                                theme.palette.mode === 'dark'
                                  ? alpha('#111827', 0.9)
                                  : alpha('#ffffff', 0.94),
                            },
                          })}
                        >
                          <ChevronRightRoundedIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    ) : (
                      <Chip
                        icon={<PhotoLibraryRoundedIcon sx={{ fontSize: 16 }} />}
                        label="Preview"
                        size="small"
                        variant="outlined"
                        sx={(theme) => ({
                          ...getOverlayControlSx(theme),
                          fontWeight: 700,
                        })}
                      />
                    )}
                  </Stack>

                  <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
                    {totalImages > 1 ? (
                      <Chip
                        label={`${String(activeImageIndex + 1).padStart(2, '0')} / ${String(totalImages).padStart(2, '0')}`}
                        size="small"
                        variant="outlined"
                        sx={(theme) => ({
                          ...getOverlayControlSx(theme),
                          fontWeight: 700,
                        })}
                      />
                    ) : (
                      <Chip
                        icon={<PhotoLibraryRoundedIcon sx={{ fontSize: 16 }} />}
                        label="Preview"
                        size="small"
                        variant="outlined"
                        sx={(theme) => ({
                          ...getOverlayControlSx(theme),
                          fontWeight: 700,
                        })}
                      />
                    )}
                  </Stack>
                </PreviewOverlay>
              </PreviewStage>

              {totalImages > 1 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {activeProject.images.map((image, idx) => (
                    <ThumbButton
                      key={`${activeProject.title}-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      active={activeImageIndex === idx}
                      accentColor={activeAccent}
                    >
                      <img src={image} alt={`${activeProject.title} thumbnail ${idx + 1}`} />
                    </ThumbButton>
                  ))}
                </Stack>
              ) : null}

              <ProofGrid>
                {activeProject.proof.map((item) => (
                  <ProofCard key={`${activeProject.title}-${item.label}`}>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                    >
                      {item.label}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.85, lineHeight: 1.7 }}>
                      {item.text}
                    </Typography>
                  </ProofCard>
                ))}
              </ProofGrid>
            </Stack>

            <InfoPanel sx={{ order: { xs: 3, xl: 3 } }}>
              <MetaPill>
                <MetaDot />
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                >
                  Selected build
                </Typography>
              </MetaPill>

              <Stack spacing={1.2}>
                <Stack
                  direction={{ xs: 'column', sm: 'row', xl: 'column' }}
                  spacing={1}
                  alignItems={{ xs: 'flex-start', sm: 'center', xl: 'flex-start' }}
                  justifyContent="space-between"
                >
                  <Chip
                    icon={<ActiveIcon fontSize="small" />}
                    label={activeProject.category}
                    size="small"
                    variant="outlined"
                    sx={{
                      bgcolor: alpha(activeAccent, 0.08),
                      color: activeAccent,
                      borderColor: alpha(activeAccent, 0.2),
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                  >
                    {activeProject.date}
                  </Typography>
                </Stack>

                <Typography variant="h4" sx={{ fontWeight: 900, lineHeight: 1.06 }}>
                  {activeProject.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {activeProject.description}
                </Typography>
              </Stack>

              <Stack spacing={1.1}>
                <FactCard>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                  >
                    Role
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 0.65, fontWeight: 700 }}>
                    {activeProject.role}
                  </Typography>
                </FactCard>

                <FactCard>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                  >
                    Outcome
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.65, lineHeight: 1.7 }}>
                    {activeProject.outcome}
                  </Typography>
                </FactCard>
              </Stack>

              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                >
                  Built with
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                  {activeProject.stack.map((item) => (
                    <Chip
                      key={`${activeProject.title}-${item}`}
                      label={item}
                      size="small"
                      variant="outlined"
                      sx={{
                        bgcolor: alpha(activeAccent, 0.05),
                        borderColor: alpha(activeAccent, 0.14),
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                >
                  Signals
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                  {activeSignals.map((signal) => (
                    <Chip
                      key={`${activeProject.title}-${signal}`}
                      label={signal}
                      size="small"
                      variant="outlined"
                      sx={{
                        bgcolor: alpha(activeAccent, 0.04),
                        borderColor: alpha(activeAccent, 0.12),
                        color: 'text.secondary',
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              <Stack spacing={1}>
                <ActionButton
                  variant="contained"
                  endIcon={<ArrowOutwardIcon />}
                  onClick={() => navigate(`/projects/${slugify(activeProject.title)}`)}
                >
                  View case study
                </ActionButton>
                <Button
                  variant="text"
                  endIcon={<LaunchRoundedIcon />}
                  href={activeProject.link}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ width: 'fit-content', px: 0 }}
                >
                  Open source / live link
                </Button>
              </Stack>
            </InfoPanel>
          </Box>
        </StudioShell>
      </Stack>
    </SectionFrame>
  );
});

export default ProjectsSection;
