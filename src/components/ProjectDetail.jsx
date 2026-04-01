// src/components/ProjectDetail.jsx

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Stack,
  Chip,
  Grid,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { AnimatePresence, motion } from 'framer-motion';
import { alpha, styled } from '@mui/material/styles';

/* ——— Project data ——— */
const projects = [
  {
    title: 'HelpHub',
    date: '2024',
    category: 'Full-Stack Development',
    description:
      'HelpHub is a dynamic web application designed to bridge the gap between individuals seeking assistance and professionals offering their expertise.',
    lead:
      'HelpHub provides a seamless platform to connect, collaborate, and achieve goals efficiently. Whether you need help with household tasks, project management, or specialized services, HelpHub creates a balanced marketplace where affordability meets quality.',
    tags: ['React', 'Node.js', 'MongoDB', 'Real-time', 'Bid System'],
    highlights: [
      'Implemented a sophisticated bid adjustment system that balances affordability and quality.',
      'Integrated LinkedIn for seamless professional networking and authentication.',
      'Built real-time notification system for instant updates on bids and requests.',
      'Designed event scheduling features to coordinate services efficiently.',
    ],
    metrics: [
      { label: 'Category', value: 'Full-Stack' },
      { label: 'Stack', value: 'React + Node.js' },
      { label: 'Database', value: 'MongoDB' },
    ],
    quotes: [
      {
        text: '"HelpHub\'s bid system ensures that both requesters and professionals derive maximum value from their interactions, fostering a thriving community of assistance and support."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'HelpHub revolutionizes how people connect for assistance by creating a transparent, competitive marketplace. The platform\'s core innovation lies in its intelligent bid adjustment system that maintains reasonable costs for requesters while encouraging quality service from professionals.',
      'By implementing strategic bid adjustments and prioritizing the smallest original bids, HelpHub ensures that affordability doesn\'t compromise quality. The system incentivizes professionals to offer both competitive and quality services through a thoughtful pricing mechanism.',
      'The platform includes comprehensive features like event scheduling, notification systems, and LinkedIn integration, making it a complete solution for professional networking and service coordination. Real-time updates keep all parties informed throughout the entire process.',
      'HelpHub\'s design philosophy centers on transparency and trust. Clear bid adjustments and selection criteria foster confidence between requesters and professionals, while the automatic matching system streamlines the process of connecting the right people.',
    ],
    images: [
      '/images/dashboard.png',
      '/images/bid.png',
      '/images/request.png',
      '/images/mybids.png',
    ],
    link: 'https://github.com/anjanmandal/HelpHub.git',
  },
  {
    title: 'LA.CO₂ – Louisiana Carbon Platform',
    date: '2025',
    category: 'Climate Data Platform',
    description:
      'LA.CO₂ centralizes carbon emission tracking, CCUS compliance, and public transparency for Louisiana’s carbon storage initiatives.',
    lead:
      'The system bridges operators, regulators, and the public with AI-assisted dashboards that provide risk scoring, QA/QC tools, and plain-language explanations for every dataset.',
    tags: ['React', 'Node.js', 'OpenAI', 'Maps', 'ClimateTech'],
    highlights: [
      'Built upload workflows for operator CSV/XLSX reporting with inline validation and integration-ready APIs.',
      'Created regulator QA/QC dashboards that cross-check submissions against ClimateTrace and EPA datasets.',
      'Designed a public-facing transparency portal with CCUS maps, trend charts, and downloadable datasets.',
      'Added AI-authored plain-language explanations so technical carbon data stays readable for broader audiences.',
    ],
    metrics: [
      { label: 'Focus', value: 'CCUS reporting + public trust' },
      { label: 'Portals', value: 'Operator, Regulator, Public' },
      { label: 'AI layer', value: 'Explainable narratives' },
    ],
    quotes: [
      {
        text: '"Carbon stewardship should not live in PDFs. LA.CO₂ makes reporting, review, and public trust easier to navigate."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'Operators upload CSV/XLSX reports, receive inline validation, and push to APIs for automated emissions reporting. Regulator dashboards cross-check data against ClimateTrace/EPA sources with QA/QC workflows and summarized inspection reports.',
      'The public portal visualizes Louisiana CCUS projects via interactive maps and time-series charts. Datasets are downloadable, and AI-generated narratives (OpenAI) explain each trend in plain language to improve public trust.',
      'From upload workflows to public storytelling, the product was designed as one connected interface instead of separate regulator, operator, and community tools. That made the system easier to operate, easier to review, and easier to trust.',
      'The result is a climate-data experience that feels closer to a modern product than a reporting utility, with stronger validation, clearer review paths, and more accessible public communication.',
    ],
    images: [
     
      '/images/laco2-2.png',
      '/images/laco2-3.png',
      '/images/laco2-4.png',
      '/images/laco2-5.png',
      '/images/laco2-6.png',
    ],
    link: 'https://github.com/anjanmandal/LA.CO-.git',
  },
  {
    title: 'PivotProof',
    date: '2025',
    category: 'Sports Science Platform',
    description:
      'PivotProof is an ACL injury prevention and recovery platform designed for Louisiana’s young athletes, combining risk sensing, movement verification, and AI coaching.',
    lead:
      'The platform leverages Daily Risk 2.0 context logging, Movement Coach video verification, Counterfactual planning for coaches, and an N-of-1 Movement Twin baseline so every athlete gets personalized guidance.',
    tags: ['AI', 'Computer Vision', 'Coaching', 'React', 'Node.js'],
    highlights: [
      'Daily Risk 2.0 logs surface, heat, fatigue, menstrual phase, and more. Coaches and athletes receive AI snapshots showing risk level, driver scores, and a single actionable change for the day.',
      'Movement Coach records 3–5 second clips, automatically selects key frames, and instantly returns cues with verdicts (Pass / Fix / Retake / Needs review). Each clip updates the athlete’s biomechanical twin.',
      'Counterfactual Coach allows coaches to batch plan “what-ifs”— reducing cutting volume, moving drills indoors, or adjusting work:rest ratios—then returns ranked session plans and drill substitutions.',
      'Public-health datasets (ClimateTrace, CDC obesity data, rural access metrics) are layered in to contextualize risk for Louisiana, while downloadable insights help schools justify funding.',
    ],
    metrics: [
      { label: 'Risk workflow', value: 'Daily Risk 2.0' },
      { label: 'Verification', value: 'Movement Coach + Twins' },
      { label: 'Planning', value: 'Counterfactual Coach' },
    ],
    quotes: [
      {
        text: '"ACL prevention needs more than a PDF. PivotProof couples context-aware data with verification loops so coaches see risk, test fixes, and prove impact."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'Louisiana’s high ACL rates, compounded by childhood obesity and lack of rural specialists, inspired PivotProof. Daily Risk 2.0 collects nuanced data (surface, heat index, menstrual phase, fatigue) and turns it into risk snapshots with uncertainty and driver scores.',
      'Movement Coach serves as the verification loop: athletes record short clips, the AI selects defining frames, then issues cues and verdicts. Each clip updates the athlete’s baseline, visualizing drift away from healthy mechanics.',
      'Counterfactual Coach gives coaches a sandbox to trial adjustments— reduce cutting by 15%, move practice indoors, change work:rest ratios—and shows the predicted risk delta plus suggested micro-drills.',
      'The public transparency layer communicates progress to parents and regulators with interactive trend charts, AI-authored explanations, and CSV exports. PivotProof becomes the accountability layer needed for statewide ACL prevention.',
    ],
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
    link: '',
  },
  {
    title: 'AI-L&L-VIDEO-GENERATOR',
    date: '2024',
    category: 'AI & Full-Stack',
    description:
      'A full-stack application that generates video content from a text prompt using AI-powered text generation and video processing.',
    lead:
      'This innovative project combines AI text generation with text-to-speech technology and dynamic video creation, all wrapped in a modern React interface with dark mode support and stunning 3D visual effects powered by Three.js.',
    tags: ['AI', 'React', 'Node.js', 'Three.js', 'Video Generation'],
    highlights: [
      'Integrated AI for intelligent text generation from user prompts.',
      'Implemented text-to-speech conversion with dynamic subtitle generation.',
      'Created immersive 3D star background using Three.js for visual appeal.',
      'Built comprehensive dark mode support with smooth theme transitions.',
    ],
    metrics: [
      { label: 'Category', value: 'AI & Full-Stack' },
      { label: 'Frontend', value: 'React + Three.js' },
      { label: 'Backend', value: 'Node.js + Express' },
    ],
    quotes: [
      {
        text: '"Combining AI with creative video generation opens up endless possibilities for content creation, making professional video production accessible to everyone."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'The AI-L&L-Video-Generator represents a breakthrough in automated content creation. Users simply enter a text prompt, and the system handles everything from AI-powered response generation to final video production.',
      'The backend, built with Node.js and Express, orchestrates the entire pipeline: generating text responses using advanced AI models, converting text to natural-sounding speech, and combining audio with dynamic subtitles to create engaging video content.',
      'The frontend, built with React, provides an intuitive interface that makes complex video generation feel effortless. The dark mode support ensures comfortable viewing in any lighting condition, while the Three.js-powered 3D star background adds a mesmerizing visual element.',
      'This project demonstrates the power of combining multiple technologies to create something truly innovative. From AI processing to 3D rendering, every component works together seamlessly to deliver a unique user experience.',
    ],
    images: [
      '/images/L&L.png',
      '/images/L&L2.png',
      '/images/L&L3.png',
    ],
    link: 'https://github.com/anjanmandal/L-L.git',
  },
  {
    title: 'Alumni Platform',
    date: '2024',
    category: 'Full-Stack Development',
    description:
      'An interactive platform designed to connect alumni and current students in real-time with real-time chat functionality and networking features.',
    lead:
      'The Alumni Platform fosters a supportive community that enhances career growth and engagement by connecting current students with successful alumni, providing job opportunities, and facilitating meaningful networking through real-time communication.',
    tags: ['React', 'Node.js', 'MongoDB', 'Real-time Chat', 'Networking'],
    highlights: [
      'Implemented real-time chat functionality using WebSocket technology.',
      'Built comprehensive event scheduling and notification systems.',
      'Integrated LinkedIn for seamless professional networking.',
      'Created job opportunity board with real-time updates.',
    ],
    metrics: [
      { label: 'Category', value: 'Full-Stack' },
      { label: 'Stack', value: 'React + Node.js' },
      { label: 'Database', value: 'MongoDB' },
    ],
    quotes: [
      {
        text: '"Connecting students with alumni creates a powerful network that benefits everyone involved, from career guidance to job opportunities."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'The Alumni Platform addresses a critical need in educational communities: maintaining connections between current students and alumni. This platform makes it easy to network, share opportunities, and build lasting professional relationships.',
      'Real-time chat functionality allows instant communication between users, making it feel like a true community. Whether discussing career paths, sharing job openings, or planning events, the platform keeps everyone connected.',
      'The event scheduling system helps coordinate workshops, networking events, and alumni gatherings. Integrated notifications ensure users never miss important updates or opportunities.',
      'LinkedIn integration streamlines the networking process, allowing users to connect their professional profiles and expand their networks seamlessly. The job opportunity board provides a dedicated space for alumni to post positions and for students to discover career paths.',
    ],
    images: [
      '/images/project_alumni.png',
      '/images/project_alumni2.png',
      '/images/project_alumni3.png',
    ],
    link: 'https://github.com/anjanmandal/ULM_Alumni_Search_Dashboard.git',
  },
  {
    title: 'Lost and Found Website',
    date: '2024',
    category: 'Full-Stack Development',
    description:
      'A robust serverless web application designed to streamline the process of reporting and recovering lost items with real-time communication.',
    lead:
      'This comprehensive Lost and Found platform provides a community-driven solution for reuniting people with their missing belongings through advanced search, geotagging, and real-time communication features.',
    tags: ['React', 'Node.js', 'MongoDB', 'WebSocket', 'Geotagging'],
    highlights: [
      'Implemented real-time chat using WebSocket for instant messaging between users.',
      'Built advanced search and filtering with multiple criteria support.',
      'Added geotagging functionality for location-based item tracking.',
      'Created role-based access control to protect user information.',
    ],
    metrics: [
      { label: 'Category', value: 'Full-Stack' },
      { label: 'Stack', value: 'React + Node.js' },
      { label: 'Database', value: 'MongoDB' },
    ],
    quotes: [
      {
        text: '"Technology can bring communities together, and this platform proves that by helping people recover what they\'ve lost while building stronger local connections."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'The Lost and Found platform transforms how communities handle lost items. Instead of relying on bulletin boards or word-of-mouth, users can instantly report lost items or browse found items with powerful search capabilities.',
      'Real-time chat functionality, powered by WebSocket technology, allows individuals who have lost items and those who have found items to communicate instantly. This facilitates timely resolutions and creates a sense of community support.',
      'Advanced search and filtering capabilities let users find items based on location, date, category, and keywords. The platform uses efficient database indexing for fast querying, ensuring users get relevant results quickly.',
      'Geotagging features help users understand where items were found or lost, making it easier to identify matches. Role-based access control ensures privacy and security, protecting sensitive user information while maintaining transparency.',
      'The responsive design ensures optimal experience across all devices, from mobile phones to desktop computers. This cross-platform compatibility means users can access the platform wherever they are, whenever they need it.',
    ],
    images: [
      '/images/lost_found1.png',
      '/images/lost_found2.png',
      '/images/lost_found3.png',
    ],
    link: 'https://github.com/anjanmandal/Lost-and-Found-website-.git',
  },
  {
    title: 'Okay Journey',
    date: '2024',
    category: 'Full-Stack Development',
    description:
      'A comprehensive bus ticketing website offering a user-friendly platform for travelers to search, book, and manage bus tickets online.',
    lead:
      'Okay Journey revolutionizes bus travel booking with real-time seat availability, secure payment processing, multi-language support, and dynamic pricing, making bus travel accessible and convenient for everyone.',
    tags: ['E-commerce', 'Payment Gateway', 'Multi-language', 'Real-time Booking'],
    highlights: [
      'Implemented secure payment gateway with SSL encryption and PCI-DSS compliance.',
      'Built real-time seat availability with interactive seat map selection.',
      'Created multi-language and multi-currency support for global travelers.',
      'Developed dynamic pricing system that adjusts based on demand and seasonality.',
    ],
    metrics: [
      { label: 'Category', value: 'E-commerce' },
      { label: 'Features', value: 'Payment + Booking' },
      { label: 'Support', value: 'Multi-language' },
    ],
    quotes: [
      {
        text: '"Making bus travel booking as smooth as possible was our goal, and with features like real-time availability and secure payments, we\'ve achieved that."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'Okay Journey addresses the complexities of bus travel booking by providing a comprehensive platform that handles everything from route search to ticket delivery. Users can effortlessly search for available bus routes by entering their origin, destination, and travel dates.',
      'The interactive seat map allows passengers to select their preferred seats in real-time, with instant updates on availability. This visual approach makes booking intuitive and helps users make informed decisions about their travel.',
      'Security is paramount in payment processing. The platform integrates a secure payment gateway supporting various payment methods including credit/debit cards, net banking, digital wallets, and UPI. All transactions are protected by SSL encryption and comply with PCI-DSS standards.',
      'Global accessibility is ensured through multi-language and multi-currency support. International travelers can use the platform in their preferred language and pay in their local currency, making bus travel booking truly universal.',
      'The dynamic pricing system adjusts ticket costs based on demand and seasonality, ensuring fair pricing while maximizing revenue. Promotional codes and seasonal discounts provide additional value to users, making travel more affordable.',
      'Registered users benefit from a personal account where they can view booking history, download past e-tickets, and manage their profiles. This facilitates easy repeat bookings and provides a complete travel management solution.',
    ],
    images: [
      '/images/okay_journey3.jpg',
      '/images/okay_journey.png',
      '/images/okay_journey2.jpeg',
    ],
    link: 'https://www.okayjourney.com',
  },
];

const accentColors = ['#B85A2E', '#D46F3A', '#8F4524', '#74695E', '#F3AF7A', '#564D46'];
const AUTO_ADVANCE_MS = 4200;
const slugify = (title) => title.toLowerCase().replace(/[^\w]+/g, '-');

const DetailShell = styled('article', {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ theme, accentColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  borderRadius: 32,
  padding: theme.spacing(2.5),
  border: `1px solid ${alpha(accentColor, 0.18)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.82),
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(18px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: '0 0 auto 0',
    height: 4,
    background: `linear-gradient(90deg, ${alpha(accentColor, 0.92)} 0%, ${alpha(
      accentColor,
      0.14
    )} 74%, transparent 100%)`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -48,
    right: -22,
    width: 220,
    height: 220,
    borderRadius: '50%',
    background: alpha(accentColor, 0.08),
    filter: 'blur(36px)',
    zIndex: -1,
  },
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

const PreviewStage = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ theme, accentColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  minHeight: 520,
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
      ? 'linear-gradient(180deg, rgba(18,15,13,0.02) 0%, rgba(18,15,13,0.08) 46%, rgba(18,15,13,0.18) 100%)'
      : 'linear-gradient(180deg, rgba(29,23,18,0.02) 0%, rgba(29,23,18,0.06) 46%, rgba(29,23,18,0.14) 100%)',
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

const ThumbRail = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

const ThumbButton = styled('button', {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  width: 92,
  height: 68,
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
  '&:focus-visible': {
    outline: `3px solid ${alpha(accentColor, 0.18)}`,
  },
}));

const SnapshotCard = styled(Box)(({ theme }) => ({
  height: '100%',
  borderRadius: 20,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.common.white, 0.72),
  padding: theme.spacing(1.35, 1.45),
}));

const LensShell = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ theme, accentColor }) => ({
  borderRadius: 30,
  border: `1px solid ${alpha(accentColor, 0.14)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.82)
      : alpha(theme.palette.common.white, 0.8),
  padding: theme.spacing(2.25),
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(18px)',
}));

const LensButton = styled('button', {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.8),
  borderRadius: 999,
  padding: theme.spacing(1, 1.4),
  border: `1px solid ${active ? alpha(accentColor, 0.22) : theme.palette.divider}`,
  background:
    active
      ? theme.palette.mode === 'dark'
        ? alpha(accentColor, 0.14)
        : alpha(accentColor, 0.08)
      : theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.72)
        : alpha(theme.palette.common.white, 0.72),
  color: theme.palette.text.primary,
  cursor: 'pointer',
  appearance: 'none',
  font: 'inherit',
  fontWeight: 700,
  transition: 'border-color 180ms ease, background 180ms ease, transform 180ms ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    borderColor: alpha(accentColor, 0.16),
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha(accentColor, 0.18)}`,
  },
}));

const HighlightRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '22px 1fr',
  gap: theme.spacing(1.2),
  alignItems: 'start',
  borderRadius: 18,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.common.white, 0.72),
  padding: theme.spacing(1.2, 1.25),
}));

const QuotePanel = styled(Box)(({ theme }) => ({
  borderRadius: 22,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.76)
      : alpha(theme.palette.common.white, 0.72),
  padding: theme.spacing(1.6),
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  paddingInline: theme.spacing(1.8),
  fontWeight: 700,
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
  border: `1px solid ${alpha(
    theme.palette.common.white,
    theme.palette.mode === 'dark' ? 0.08 : 0.3
  )}`,
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
  border: `1px solid ${alpha(
    theme.palette.common.white,
    theme.palette.mode === 'dark' ? 0.08 : 0.28
  )}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.68),
  padding: theme.spacing(1.1, 1.2),
}));

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const proj = useMemo(
    () => projects.find((project) => slugify(project.title) === slug),
    [slug]
  );

  const projectIndex = useMemo(
    () => projects.findIndex((project) => slugify(project.title) === slug),
    [slug]
  );
  const accentColor = accentColors[(projectIndex >= 0 ? projectIndex : 0) % accentColors.length];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeLens, setActiveLens] = useState('overview');

  useEffect(() => {
    setActiveImageIndex(0);
    setActiveLens('overview');
  }, [slug]);

  const totalImages = proj?.images?.length || 0;
  const currentImage = totalImages ? proj.images[activeImageIndex % totalImages] : null;
  const currentQuote = proj?.quotes?.[0] || null;
  const linkLabel = proj?.link?.includes('github.com') ? 'Open repository' : 'Visit project';

  useEffect(() => {
    if (totalImages <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % totalImages);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [slug, totalImages]);

  const lenses = useMemo(() => {
    if (!proj) return [];

    const overviewMetrics = (proj.metrics || []).slice(0, 3);
    const earlyBody = proj.body?.slice(0, 2) || [];
    const laterBody = proj.body?.slice(2) || [];

    return [
      {
        id: 'overview',
        label: 'Overview',
        icon: AutoAwesomeRoundedIcon,
        eyebrow: 'Product frame',
        title: 'What the product is trying to make easier.',
        intro: proj.lead,
        paragraphs: earlyBody,
        cards: overviewMetrics,
        quote: currentQuote,
      },
      {
        id: 'highlights',
        label: 'Highlights',
        icon: InsightsRoundedIcon,
        eyebrow: 'Key moves',
        title: 'The decisions that made the experience feel usable.',
        intro: proj.description,
        bullets: proj.highlights || [],
        chips: proj.tags || [],
      },
      {
        id: 'notes',
        label: 'Notes',
        icon: NotesRoundedIcon,
        eyebrow: 'Build notes',
        title: 'Context, architecture, and how the build matured.',
        intro: laterBody[0] || proj.description,
        paragraphs: laterBody.length > 1 ? laterBody.slice(1) : earlyBody.slice(1),
        chips: proj.tags?.slice(0, 6) || [],
        footer: proj.link
          ? 'Open the repository for implementation detail. This page stays focused on the product view.'
          : null,
      },
    ];
  }, [proj, currentQuote]);

  const activeLensData = lenses.find((lens) => lens.id === activeLens) || lenses[0];

  if (!proj) {
    return (
      <Container sx={{ py: 6 }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h6">Project not found.</Typography>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/#projects')} variant="outlined">
            Back to projects
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, position: 'relative', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Stack spacing={3.5}>
          <Stack spacing={1.25}>
            <Breadcrumbs
              separator={<ArrowOutwardIcon sx={{ fontSize: 14, transform: 'rotate(-45deg)' }} />}
            >
              <Link
                underline="hover"
                color="text.secondary"
                sx={{ cursor: 'pointer', transition: 'color 200ms' }}
                onClick={() => navigate('/')}
              >
                Home
              </Link>
              <Link
                underline="hover"
                color="text.secondary"
                sx={{ cursor: 'pointer', transition: 'color 200ms' }}
                onClick={() => navigate('/#projects')}
              >
                Projects
              </Link>
              <Typography color="text.primary" sx={{ fontWeight: 600 }}>
                {proj.title}
              </Typography>
            </Breadcrumbs>
          </Stack>

          <DetailShell accentColor={accentColor}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, lg: 5 }}>
                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <MetaPill>
                      <MetaDot />
                      <Typography variant="caption" sx={{ fontWeight: 800, letterSpacing: '0.08em' }}>
                        PROJECT DETAIL
                      </Typography>
                    </MetaPill>
                    <MetaPill>
                      <Typography variant="caption" sx={{ fontWeight: 700 }}>
                        {proj.category}
                      </Typography>
                    </MetaPill>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontWeight: 700, alignSelf: 'center' }}
                    >
                      {proj.date}
                    </Typography>
                  </Stack>

                  <Stack spacing={1.5}>
                    <Typography
                      component="h1"
                      sx={{
                        fontWeight: 800,
                        fontSize: { xs: '2.4rem', md: '4rem' },
                        lineHeight: { xs: 1.02, md: 0.98 },
                        letterSpacing: '-0.05em',
                        maxWidth: 720,
                      }}
                    >
                      {proj.title}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{
                        fontWeight: 500,
                        lineHeight: 1.55,
                        maxWidth: 720,
                      }}
                    >
                      {proj.description}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: 'text.primary',
                        lineHeight: 1.8,
                        fontSize: '1.02rem',
                        maxWidth: 700,
                      }}
                    >
                      {proj.lead}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {proj.tags?.slice(0, 6).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          bgcolor: 'transparent',
                          border: (theme) => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                        }}
                      />
                    ))}
                  </Stack>

                  <Grid container spacing={1.25}>
                    {(proj.metrics || []).slice(0, 3).map((metric) => (
                      <Grid size={{ xs: 12, sm: 4 }} key={metric.label}>
                        <SnapshotCard>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mb: 0.75, fontWeight: 700, letterSpacing: '0.08em' }}
                          >
                            {metric.label}
                          </Typography>
                          <Typography sx={{ fontWeight: 700, lineHeight: 1.35 }}>
                            {metric.value}
                          </Typography>
                        </SnapshotCard>
                      </Grid>
                    ))}
                  </Grid>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
                    {proj.link && (
                      <ActionButton
                        variant="contained"
                        endIcon={<LaunchRoundedIcon />}
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {linkLabel}
                      </ActionButton>
                    )}
                  </Stack>
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, lg: 7 }}>
                <Stack spacing={1.5}>
                  <PreviewStage accentColor={accentColor}>
                    {currentImage ? (
                      <>
                        <AnimatePresence mode="wait">
                          <PreviewMedia
                            key={currentImage}
                            src={currentImage}
                            alt={`${proj.title} preview ${activeImageIndex + 1}`}
                            initial={{ opacity: 0.32, scale: 1.02 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0.24, scale: 0.99 }}
                            transition={{ duration: 0.35, ease: 'easeOut' }}
                          />
                        </AnimatePresence>
                        <PreviewShade />
                      </>
                    ) : proj.mockPreview ? (
                      <MockPreview accentColor={accentColor}>
                        <Stack spacing={0.75}>
                          <Typography
                            variant="caption"
                            sx={{
                              width: 'fit-content',
                              borderRadius: 999,
                              px: 1,
                              py: 0.45,
                              bgcolor: alpha('#ffffff', 0.9),
                              color: alpha('#111827', 0.82),
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                            }}
                          >
                            {proj.mockPreview.eyebrow}
                          </Typography>
                          <Typography
                            sx={{
                              color: theme => (theme.palette.mode === 'dark' ? '#F8FAFC' : '#0F172A'),
                              fontWeight: 800,
                              fontSize: { xs: '2rem', md: '2.8rem' },
                              lineHeight: 1.02,
                              letterSpacing: '-0.04em',
                              maxWidth: 420,
                            }}
                          >
                            {proj.mockPreview.title}
                          </Typography>
                        </Stack>

                        <MockMetricGrid>
                          {proj.mockPreview.metrics.map((metric) => (
                            <MockMetric key={metric.label}>
                              <Typography
                                sx={{
                                  fontWeight: 800,
                                  fontSize: { xs: '1.4rem', md: '1.7rem' },
                                  color: theme => (theme.palette.mode === 'dark' ? '#F8FAFC' : '#111827'),
                                }}
                              >
                                {metric.value}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: theme => alpha(
                                    theme.palette.mode === 'dark' ? '#F8FAFC' : '#111827',
                                    0.66
                                  ),
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.08em',
                                  fontWeight: 700,
                                }}
                              >
                                {metric.label}
                              </Typography>
                            </MockMetric>
                          ))}
                        </MockMetricGrid>

                        <MockChecklist>
                          {proj.mockPreview.checks.map((item) => (
                            <MockChecklistRow key={item}>
                              <Box
                                sx={{
                                  width: 12,
                                  height: 12,
                                  borderRadius: '50%',
                                  mt: 0.55,
                                  bgcolor: accentColor,
                                }}
                              />
                              <Typography
                                sx={{
                                  color: theme => alpha(
                                    theme.palette.mode === 'dark' ? '#F8FAFC' : '#111827',
                                    0.88
                                  ),
                                  lineHeight: 1.6,
                                  fontWeight: 500,
                                }}
                              >
                                {item}
                              </Typography>
                            </MockChecklistRow>
                          ))}
                        </MockChecklist>

                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {(proj.tags || []).slice(0, 3).map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                bgcolor: alpha('#ffffff', 0.1),
                                color: '#F8FAFC',
                                border: `1px solid ${alpha('#ffffff', 0.16)}`,
                                fontWeight: 600,
                              }}
                            />
                          ))}
                        </Stack>
                      </MockPreview>
                    ) : null}

                    <PreviewOverlay>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={1.25}>
                        <MetaPill
                          sx={{
                            bgcolor: alpha('#ffffff', 0.9),
                            borderColor: alpha('#ffffff', 0.4),
                          }}
                        >
                          <MetaDot sx={{ bgcolor: accentColor }} />
                          <Typography
                            variant="caption"
                            sx={{ color: '#111827', fontWeight: 800, letterSpacing: '0.06em' }}
                          >
                            {proj.category}
                          </Typography>
                        </MetaPill>

                        {totalImages > 1 && (
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              onClick={() =>
                                setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages)
                              }
                              sx={{
                                bgcolor: alpha('#ffffff', 0.88),
                                '&:hover': { bgcolor: '#ffffff' },
                              }}
                            >
                              <ChevronLeftRoundedIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => setActiveImageIndex((prev) => (prev + 1) % totalImages)}
                              sx={{
                                bgcolor: alpha('#ffffff', 0.88),
                                '&:hover': { bgcolor: '#ffffff' },
                              }}
                            >
                              <ChevronRightRoundedIcon />
                            </IconButton>
                          </Stack>
                        )}
                      </Stack>

                      <Stack direction="row" justifyContent="space-between" alignItems="flex-end" gap={1.5}>
                        <Chip
                          label={totalImages > 1 ? `${String(activeImageIndex + 1).padStart(2, '0')} / ${String(totalImages).padStart(2, '0')}` : 'Preview'}
                          size="small"
                          sx={{
                            bgcolor: alpha('#111827', 0.72),
                            color: '#F8FAFC',
                            fontWeight: 700,
                          }}
                        />
                      </Stack>
                    </PreviewOverlay>
                  </PreviewStage>

                  {totalImages > 1 && (
                    <ThumbRail>
                      {proj.images.map((src, index) => (
                        <ThumbButton
                          key={src}
                          type="button"
                          active={index === activeImageIndex}
                          accentColor={accentColor}
                          onClick={() => setActiveImageIndex(index)}
                        >
                          <img src={src} alt={`${proj.title} thumbnail ${index + 1}`} />
                        </ThumbButton>
                      ))}
                    </ThumbRail>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </DetailShell>

          {activeLensData && (
            <LensShell accentColor={accentColor}>
              <Stack spacing={2.5}>
                <Stack
                  direction={{ xs: 'column', md: 'row' }}
                  spacing={1.5}
                  justifyContent="space-between"
                  alignItems={{ md: 'center' }}
                >
                  <Stack spacing={0.75}>
                    <Typography
                      variant="overline"
                      sx={{ letterSpacing: '0.14em', color: 'text.secondary', fontWeight: 700 }}
                    >
                      Build lens
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 800,
                        lineHeight: 1.08,
                        maxWidth: 780,
                      }}
                    >
                      A cleaner read of the product, the decisions, and the delivery.
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {lenses.map((lens) => {
                      const Icon = lens.icon;
                      return (
                        <LensButton
                          key={lens.id}
                          type="button"
                          active={activeLens === lens.id}
                          accentColor={accentColor}
                          onClick={() => setActiveLens(lens.id)}
                        >
                          <Icon fontSize="small" />
                          <span>{lens.label}</span>
                        </LensButton>
                      );
                    })}
                  </Stack>
                </Stack>

                <AnimatePresence mode="wait">
                  <Box
                    key={activeLensData.id}
                    component={motion.div}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.26, ease: 'easeOut' }}
                  >
                    <Stack spacing={2.1}>
                      <Stack spacing={1}>
                        <Typography
                          variant="overline"
                          sx={{ letterSpacing: '0.14em', color: 'text.secondary', fontWeight: 700 }}
                        >
                          {activeLensData.eyebrow}
                        </Typography>
                        <Typography
                          variant="h4"
                          sx={{
                            fontWeight: 800,
                            lineHeight: 1.1,
                            maxWidth: 780,
                          }}
                        >
                          {activeLensData.title}
                        </Typography>
                        {activeLensData.intro && (
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ lineHeight: 1.78, fontSize: '1.02rem', maxWidth: 920 }}
                          >
                            {activeLensData.intro}
                          </Typography>
                        )}
                      </Stack>

                      {activeLensData.cards?.length > 0 && (
                        <Grid container spacing={1.25}>
                          {activeLensData.cards.map((card) => (
                            <Grid size={{ xs: 12, sm: 4 }} key={card.label}>
                              <SnapshotCard>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                  sx={{
                                    display: 'block',
                                    mb: 0.75,
                                    fontWeight: 700,
                                    letterSpacing: '0.08em',
                                  }}
                                >
                                  {card.label}
                                </Typography>
                                <Typography sx={{ fontWeight: 700, lineHeight: 1.35 }}>
                                  {card.value}
                                </Typography>
                              </SnapshotCard>
                            </Grid>
                          ))}
                        </Grid>
                      )}

                      {activeLensData.bullets?.length > 0 && (
                        <Stack spacing={1.2}>
                          {activeLensData.bullets.map((item) => (
                            <HighlightRow key={item}>
                              <Box
                                sx={{
                                  width: 22,
                                  height: 22,
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  bgcolor: alpha(accentColor, 0.12),
                                  mt: 0.35,
                                }}
                              >
                                <CheckCircleOutlineIcon sx={{ fontSize: 14, color: accentColor }} />
                              </Box>
                              <Typography sx={{ lineHeight: 1.72, color: 'text.primary' }}>
                                {item}
                              </Typography>
                            </HighlightRow>
                          ))}
                        </Stack>
                      )}

                      {activeLensData.paragraphs?.map((paragraph) => (
                        <Typography
                          key={paragraph}
                          variant="body1"
                          sx={{ lineHeight: 1.82, fontSize: '1.02rem', maxWidth: 980 }}
                        >
                          {paragraph}
                        </Typography>
                      ))}

                      {activeLensData.chips?.length > 0 && (
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                          {activeLensData.chips.map((tag) => (
                            <Chip
                              key={tag}
                              label={tag}
                              size="small"
                              sx={{
                                fontWeight: 600,
                                bgcolor: 'transparent',
                                border: theme => `1px solid ${alpha(theme.palette.text.primary, 0.08)}`,
                              }}
                            />
                          ))}
                        </Stack>
                      )}

                      {activeLensData.quote && (
                        <QuotePanel>
                          <Typography
                            sx={{
                              fontStyle: 'italic',
                              lineHeight: 1.7,
                              fontSize: '1.04rem',
                              mb: 1,
                            }}
                          >
                            {activeLensData.quote.text}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                            {activeLensData.quote.speaker}
                          </Typography>
                        </QuotePanel>
                      )}

                      {activeLensData.footer && (
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                          {activeLensData.footer}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                </AnimatePresence>
              </Stack>
            </LensShell>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
