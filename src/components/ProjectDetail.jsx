// src/components/ProjectDetail.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  Chip,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CodeIcon from '@mui/icons-material/Code';
import { motion } from 'framer-motion';
import { alpha, styled } from '@mui/material/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
      'Daily Risk 2.0 workflow logs surface type, fatigue, menstrual phase, and heat data while AI generates uncertainty scores and top drivers.',
      'Movement Coach verification loop records 5-second clips, auto-selects key frames, and grades form against biomechanical twins.',
      'Counterfactual Coach batches “what-if” planning—reducing cutting, adjusting workloads, or moving indoors—and returns ranked drill substitutions.',
      'N-of-1 Movement Twin stores athlete baselines, showing drift over time to personalize cues and risk priors.',
    ],
    metrics: [
      { label: 'Focus', value: 'ACL prevention & CCUS transparency' },
      { label: 'Portals', value: 'Operator, Regulator, Public' },
      { label: 'Repository', value: 'LA.CO₂ GitHub' },
    ],
    quotes: [
      {
        text: '"Carbon stewardship and athlete safety shouldn’t live in PDFs. LA.CO₂ makes insight interactive, transparent, and explainable."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'Operators upload CSV/XLSX reports, receive inline validation, and push to APIs for automated emissions reporting. Regulator dashboards cross-check data against ClimateTrace/EPA sources with QA/QC workflows and summarized inspection reports.',
      'The public portal visualizes Louisiana CCUS projects via interactive maps and time-series charts. Datasets are downloadable, and AI-generated narratives (OpenAI) explain each trend in plain language to improve public trust.',
      'Movement Coach and Counterfactual Coach reimagine ACL prevention: athletes log context, get AI risk snapshots, and receive micro-plans, while teams can batch plan sessions and drill substitutions based on risk simulations.',
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
    images: [
      '/images/laco2-1.png',
      '/images/laco2-2.png',
      '/images/laco2-3.png',
      '/images/laco2-4.png',
      '/images/laco2-5.png',
      '/images/laco2-6.png',
    ],
    link: 'https://github.com/anjanmandal/LA.CO-.git',
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

const FloatingCard = styled(Paper)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(3),
  background: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`
    : `linear-gradient(135deg, ${alpha('#ffffff', 0.95)}, ${alpha('#f8fafc', 0.9)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  boxShadow: theme.shadows[4],
  backdropFilter: 'blur(20px)',
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8],
    borderColor: alpha(theme.palette.primary.main, 0.3),
  },
}));

const MetricCard = styled(Box)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(2.5),
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.08)}, ${alpha(theme.palette.secondary.main, 0.04)})`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const QuoteCard = styled(Card)(({ theme }) => ({
  borderRadius: 12,
  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.06)}, transparent)`,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  borderLeft: `3px solid ${theme.palette.primary.main}`,
  position: 'relative',
  overflow: 'hidden',
}));

export default function ProjectDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const proj = projects.find(
    (p) => p.title.toLowerCase().replace(/[^\w]+/g, '-') === slug
  );

  if (!proj) {
    return (
      <Container sx={{ py: 6 }}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h6">Project not found.</Typography>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            variant="outlined"
          >
            Back
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, position: 'relative', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Modern Breadcrumb */}
        <Stack spacing={2} mb={4}>
          <Breadcrumbs
            separator={<ArrowOutwardIcon sx={{ fontSize: 14, transform: 'rotate(-45deg)' }} />}
          >
            <Link
              underline="hover"
              color="text.secondary"
              sx={{ 
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
                transition: 'color 200ms',
              }}
              onClick={() => navigate('/')}
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="text.secondary"
              sx={{ 
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
                transition: 'color 200ms',
              }}
              onClick={() => navigate('/#projects')}
            >
              Projects
            </Link>
            <Typography color="text.primary" sx={{ fontWeight: 600 }}>
              {proj.title}
            </Typography>
          </Breadcrumbs>
        </Stack>

        <Grid container spacing={3}>
          {/* Left Column - Main Content */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
              {/* Hero Image */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                sx={{
                  position: 'relative',
                  borderRadius: 5,
                  overflow: 'hidden',
                  height: { xs: 280, md: 400 },
                  boxShadow: theme.shadows[8],
                }}
              >
                <Box
                  component="img"
                  src={proj.images[0]}
                  alt={proj.title}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                  }}
                />
                <Stack
                  spacing={1.5}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 3, md: 4 },
                    color: '#fff',
                  }}
                >
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip 
                      label={proj.date} 
                      size="small"
                      sx={{ 
                        bgcolor: alpha('#fff', 0.2),
                        color: '#fff',
                        backdropFilter: 'blur(10px)',
                        fontWeight: 500,
                      }}
                    />
                    {proj.tags?.slice(0, 2).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: alpha('#fff', 0.5),
                          color: '#fff',
                          backdropFilter: 'blur(10px)',
                        }}
                      />
                    ))}
                  </Stack>
                  <Typography 
                    variant={isMdUp ? 'h2' : 'h3'} 
                    component="h1"
                    sx={{ 
                      fontWeight: 800,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  >
                    {proj.title}
                  </Typography>
                </Stack>
              </Box>

              {/* Metrics */}
              {proj.metrics?.length > 0 && (
                <Grid container spacing={2}>
                  {proj.metrics.map((metric, idx) => (
                    <Grid item xs={12} sm={4} key={`${metric.label}-${idx}`}>
                      <MetricCard
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ 
                            display: 'block',
                            mb: 1,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                            fontSize: '0.7rem',
                          }}
                        >
                          {metric.label}
                        </Typography>
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700,
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                          }}
                        >
                          {metric.value}
                        </Typography>
                      </MetricCard>
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Main Content Card */}
              <FloatingCard
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Stack spacing={3}>
                  {/* Header Info */}
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                      >
                        {proj.date}
                      </Typography>
                      <Box
                        sx={{
                          width: 4,
                          height: 4,
                          borderRadius: '50%',
                          bgcolor: 'text.secondary',
                        }}
                      />
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontWeight: 500 }}
                      >
                        {proj.category}
                      </Typography>
                    </Stack>
                    <Typography 
                      variant="h4"
                      sx={{ 
                        fontWeight: 700,
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        lineHeight: 1.3,
                      }}
                    >
                      {proj.lead}
                    </Typography>
                  </Stack>

                  <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.15) }} />

                  {/* Body Content */}
                  <Stack spacing={2.5}>
                    {proj.body.map((paragraph, idx) => (
                      <Typography 
                        variant="body1" 
                        key={idx}
                        sx={{ 
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          lineHeight: 1.75,
                          fontSize: '1.05rem',
                          color: 'text.primary',
                        }}
                      >
                        {paragraph}
                      </Typography>
                    ))}
                  </Stack>

                  {/* Quotes Section */}
                  {proj.quotes?.length > 0 && (
                    <Stack spacing={2}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box
                          sx={{
                            width: 3,
                            height: 20,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          }}
                        />
                        <Typography 
                          variant="h6" 
                          sx={{ fontWeight: 700 }}
                        >
                          Developer Insights
                        </Typography>
                      </Stack>
                      <Stack spacing={2}>
                        {proj.quotes.map((quote, idx) => (
                          <QuoteCard
                            key={idx}
                            component={motion.div}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                          >
                            <CardContent sx={{ p: 2.5 }}>
                              <Typography
                                variant="body1"
                                sx={{ 
                                  fontStyle: 'italic', 
                                  mb: 1.5,
                                  wordBreak: 'break-word',
                                  overflowWrap: 'break-word',
                                  lineHeight: 1.7,
                                  fontSize: '1.05rem',
                                  color: 'text.primary',
                                }}
                              >
                                {quote.text}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ 
                                  fontWeight: 600,
                                  wordBreak: 'break-word',
                                  overflowWrap: 'break-word',
                                }}
                              >
                                {quote.speaker}
                              </Typography>
                            </CardContent>
                          </QuoteCard>
                        ))}
                      </Stack>
                    </Stack>
                  )}

                  {/* Image Gallery */}
                  {proj.images.length > 1 && (
                    <Stack spacing={2}>
                      <Typography 
                        variant="h5" 
                        sx={{ fontWeight: 700 }}
                      >
                        Project Gallery
                      </Typography>
                      <Box>
                        <Swiper
                          modules={[Navigation, Pagination]}
                          spaceBetween={16}
                          slidesPerView={1}
                          navigation
                          pagination={{ clickable: true }}
                          style={{ borderRadius: 12 }}
                        >
                          {proj.images.slice(1).map((src, idx) => (
                            <SwiperSlide key={idx}>
                              <Box
                                component="img"
                                src={src}
                                alt={`${proj.title} ${idx + 2}`}
                                sx={{
                                  width: '100%',
                                  height: 350,
                                  objectFit: 'contain',
                                  borderRadius: 12,
                                }}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </Box>
                    </Stack>
                  )}
                </Stack>
              </FloatingCard>
            </Stack>
          </Grid>

          {/* Right Column - Sidebar */}
          <Grid item xs={12} lg={4}>
            <Stack
              spacing={2.5}
              sx={{
                position: { lg: 'sticky' },
                top: { lg: 100 },
              }}
            >
              {/* Tags Card */}
              {proj.tags?.length > 0 && (
                <FloatingCard
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Stack spacing={2}>
                    <Typography 
                      variant="h6" 
                      sx={{ fontWeight: 700 }}
                    >
                      Technologies
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {proj.tags.map((tag) => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          size="medium"
                          icon={<CodeIcon fontSize="small" />}
                          sx={{ 
                            fontWeight: 500,
                            bgcolor: alpha(theme.palette.primary.main, 0.08),
                            color: 'primary.main',
                            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                          }} 
                        />
                      ))}
                    </Stack>
                  </Stack>
                </FloatingCard>
              )}

              {/* Highlights Card */}
              {proj.highlights?.length > 0 && (
                <FloatingCard
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Stack spacing={2}>
                    <Typography 
                      variant="h6" 
                      sx={{ fontWeight: 700 }}
                    >
                      Key Features
                    </Typography>
                    <Stack spacing={2}>
                      {proj.highlights.map((item, idx) => (
                        <Stack 
                          direction="row" 
                          spacing={1.5} 
                          key={idx} 
                          alignItems="flex-start"
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                              mt: 0.5,
                            }}
                          >
                            <CheckCircleOutlineIcon
                              fontSize="small"
                              color="primary"
                              sx={{ fontSize: 14 }}
                            />
                          </Box>
                          <Typography 
                            variant="body2"
                            sx={{ 
                              wordBreak: 'break-word',
                              overflowWrap: 'break-word',
                              lineHeight: 1.7,
                              flex: 1,
                              pt: 0.5,
                            }}
                          >
                            {item}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Stack>
                </FloatingCard>
              )}

              {/* GitHub Link */}
              {proj.link && (
                <FloatingCard
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowOutwardIcon />}
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 600,
                    }}
                  >
                    View on GitHub
                  </Button>
                </FloatingCard>
              )}

              {/* Navigation Card */}
              <FloatingCard
                component={motion.div}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Stack spacing={2}>
                  <Typography 
                    variant="h6" 
                    sx={{ fontWeight: 700 }}
                  >
                    Navigation
                  </Typography>
                  <Stack spacing={1.5}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<ArrowBackIcon />}
                      onClick={() => navigate(-1)}
                      sx={{ 
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      Go Back
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      endIcon={<ArrowOutwardIcon />}
                      onClick={() => navigate('/')}
                      sx={{ 
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      Home
                    </Button>
                    <Button
                      fullWidth
                      variant="text"
                      onClick={() => navigate('/#projects')}
                      sx={{ 
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      All Projects
                    </Button>
                  </Stack>
                </Stack>
              </FloatingCard>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}





