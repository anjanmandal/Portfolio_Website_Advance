// src/components/Projects.jsx
import React, { forwardRef } from 'react';
import { Box, Typography, Button, Chip, Stack } from '@mui/material';
import { styled, keyframes, alpha } from '@mui/material/styles';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import MobileIcon from '@mui/icons-material/PhoneAndroid';
import StorageIcon from '@mui/icons-material/Storage';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from 'react-router-dom';
import SectionFrame from './SectionFrame';

/* ——— Shiny "Projects" header ——— */
const shine = keyframes`
  0%   { background-position:-200% 0 }
  100% { background-position:200% 0 }
`;
const ShinyText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(
    90deg,
    ${theme.palette.primary.light},
    ${theme.palette.primary.main},
    ${theme.palette.secondary.main}
  )`,
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% auto',
  display: 'inline-block',
  letterSpacing: '0.05em',
  animation: `${shine} 3s linear infinite`,
}));

const SectionBlock = styled('section')(({ theme }) => ({
  position: 'relative',
  borderRadius: 24,
  padding: theme.spacing(4),
  minHeight: 280,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(8,14,30,0.75))'
      : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,255,0.9))',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 20px 60px rgba(0,0,0,0.4)'
      : '0 20px 60px rgba(0,0,0,0.08)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 24px 72px rgba(0,0,0,0.5)'
        : '0 24px 72px rgba(0,0,0,0.12)',
    borderColor: alpha(theme.palette.primary.main, 0.3),
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
}));

const Thumbnail = styled(Box)(({ src, theme }) => ({
  borderRadius: 20,
  minHeight: 220,
  flex: 1,
  minWidth: 240,
  backgroundImage: theme.palette.mode === 'dark'
    ? `linear-gradient(135deg, rgba(2,6,23,0.5), rgba(2,6,23,0.2)), url(${src})`
    : `linear-gradient(135deg, rgba(255,255,255,0.3), rgba(248,250,255,0.2)), url(${src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 300ms ease',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: 20,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
    opacity: 0,
    transition: 'opacity 300ms ease',
  },
  [`${SectionBlock}:hover &::before`]: {
    opacity: 1,
  },
}));

const accentColors = ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'];

/* ——— Project data ——— */
const projects = [
  {
    title: 'HelpHub',
    date: '2024',
    category: 'Full-Stack Development',
    description:
      'HelpHub is a dynamic web application designed to bridge the gap between individuals seeking assistance and professionals offering their expertise. Whether you need help with household tasks, project management, or specialized services, HelpHub provides a seamless platform to connect, collaborate, and achieve your goals efficiently.',
    details: 'Bid system • Real-time notifications • LinkedIn integration',
    icon: WebIcon,
    images: ['/images/dashboard.png'],
    tag: 'Full-Stack Development',
    link: 'https://github.com/anjanmandal/HelpHub.git',
    additionalInfo:
      'This platform also includes features like event scheduling, notification systems, and integration with LinkedIn for seamless professional networking. HelpHub\'s bid system is thoughtfully designed to create a balanced marketplace where affordability meets quality.',
  },
  {
    title: 'LA.CO₂ – Louisiana Carbon Platform',
    date: '2025',
    category: 'Climate Data Platform',
    description:
      'LA.CO₂ centralizes carbon emission tracking, CCUS compliance, and public transparency for Louisiana’s carbon storage initiatives. Operators, regulators, and the public share one source of truth backed by AI explanations.',
    details: 'Operator portal • Regulator QA/QC dashboard • Public transparency hub',
    icon: StorageIcon,
    images: [

      '/images/laco2-2.png',
      '/images/laco2-3.png',
      '/images/laco2-4.png',
      '/images/laco2-5.png',
      '/images/laco2-6.png',
    ],
    tag: 'ClimateTech',
    link: 'https://github.com/anjanmandal/LA.CO-.git',
    additionalInfo:
      'Operator portal supports CSV/XLSX uploads with automated validation and integration-ready APIs. Regulators review reports against ClimateTrace/EPA datasets, run QA/QC tools, and export inspection briefs. The public portal exposes an interactive CCUS map, emissions/capture trend charts, downloadable datasets, and AI-generated summaries powered by OpenAI.',
  },
  {
    title: 'PivotProof',
    date: '2025',
    category: 'Sports Science Platform',
    description:
      'PivotProof is an ACL prevention and recovery solution tailored for Louisiana\'s young athletes. It blends context logging, movement verification, AI-driven coaching, and public health data to reduce ACL risk statewide.',
    details: 'Daily Risk log • Movement Coach • Counterfactual planner • N-of-1 biomechanical twins',
    icon: MobileIcon,
    images: ['/images/dashboard.png'],
    tag: 'Sports Science',
    link: 'https://github.com/anjanmandal/LA.CO-.git',
    additionalInfo:
      'Daily Risk 2.0 captures fatigue, surface, menstrual phase, and heat. Movement Coach analyzes 3-5s clips, issues instant cues, and assigns micro-plans. Counterfactual Coach simulates workload tweaks for coaches, and an N-of-1 Movement Twin personalizes risk priors for every athlete.',
  },
  {
    title: 'AI-L&L-VIDEO-GENERATOR',
    date: '2024',
    category: 'AI & Full-Stack',
    description:
      'A full-stack application that generates video content from a text prompt. This project consists of a backend built with Node.js and Express that handles text generation and video processing, and a frontend built with React, providing a user-friendly interface with dark mode and 3D visual effects.',
    details: 'AI text generation • Text-to-speech • Video creation • 3D effects',
    icon: CodeIcon,
    images: ['/images/L&L.png'],
    tag: 'Full-Stack Development',
    link: 'https://github.com/anjanmandal/L-L.git',
    additionalInfo:
      'AI-Powered Text Generation: Generates responses to user prompts using AI. Text-to-Speech and Video Creation: Converts text responses into speech and combines them with dynamic subtitles to create video content. Dark Mode Support: Toggle dark/light themes for the interface. Three.js Visual Effects: 3D star background for a visually engaging experience.',
  },
  {
    title: 'Alumni Platform',
    date: '2024',
    category: 'Full-Stack Development',
    description:
      'An interactive platform designed to connect alumni and current students in real-time. Built with React.js, Node.js, and MongoDB, it features real-time chat functionality, allowing users to network with alumni, receive updates on job opportunities, and stay informed about upcoming events and workshops.',
    details: 'Real-time chat • Event scheduling • Job opportunities',
    icon: StorageIcon,
    images: ['/images/project_alumni.png'],
    tag: 'Full-Stack Development',
    link: 'https://github.com/anjanmandal/ULM_Alumni_Search_Dashboard.git',
    additionalInfo:
      'This platform also includes features like event scheduling, notification systems, and integration with LinkedIn for seamless professional networking.',
  },
  {
    title: 'Lost and Found Website',
    date: '2024',
    category: 'Full-Stack Development',
    description:
      'A robust serverless web application designed to streamline the process of reporting and recovering lost items. Built with React.js, Node.js, and MongoDB, this platform offers user-friendly interfaces for uploading lost items, searching for found items, and facilitating real-time communication between users through integrated chat functionality.',
    details: 'Real-time chat • Advanced search • Geotagging • WebSocket',
    icon: MobileIcon,
    images: ['/images/lost_found3.png'],
    tag: 'Full-Stack Development',
    link: 'https://github.com/anjanmandal/Lost-and-Found-website-.git',
    additionalInfo:
      'This Lost and Found platform provides a comprehensive solution for communities to report and locate lost items. Key features include: Real-Time Chat and Notifications: Leveraging WebSocket technology, the platform provides real-time messaging between users. Advanced Search and Filtering: Users can search and filter items based on multiple criteria, such as location, date, category, and keywords.',
  },
  {
    title: 'Okay Journey',
    date: '2024',
    category: 'Full-Stack Development',
    description:
      'This Bus Ticketing Website offers a comprehensive and user-friendly platform for travelers to search for, book, and manage their bus tickets online.',
    details: 'E-ticketing • Payment gateway • Multi-language • Dynamic pricing',
    icon: WebIcon,
    images: ['/images/okay_journey2.jpeg'],
    tag: 'Full-Stack Development',
    link: 'https://www.okayjourney.com',
    additionalInfo:
      'This Bus Ticketing Website offers a comprehensive and user-friendly platform for travelers to search for, book, and manage their bus tickets online. Users can effortlessly search for available bus routes by entering their origin, destination, and travel dates, with the ability to filter results based on price, travel time, and bus amenities.',
  },
];

const ProjectsSection = forwardRef((_, ref) => {
  const navigate = useNavigate();

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Build log"
      title="Highlighted Projects"
      subtitle="Production builds, research explorations, and hackathon prototypes."
      contentSx={{ p: { xs: 1, sm: 2 }, pt: { xs: 2, md: 3 } }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: 1120,
          mx: 'auto',
          pl: { xs: 0, sm: 5 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: { xs: 8, sm: 16 },
            top: 0,
            bottom: 0,
            width: 2,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
            display: { xs: 'none', sm: 'block' },
          }}
        />

        <Stack spacing={4}>
          {projects.map((proj, idx) => {
            const slug = proj.title.toLowerCase().replace(/[^\w]+/g, '-');
            const accent = accentColors[idx % accentColors.length];
            const IconComponent = proj.icon || CodeIcon;

            return (
              <SectionBlock key={proj.title}>
                <Box sx={{ flex: 1.1 }}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2} flexWrap="wrap">
                    <Chip
                      icon={<IconComponent fontSize="small" />}
                      label={proj.category}
                      size="small"
                      sx={{
                        bgcolor: alpha(accent, 0.15),
                        color: accent,
                        borderColor: alpha(accent, 0.3),
                      }}
                      variant="outlined"
                    />
                    <Typography variant="caption" color="text.secondary">
                      {proj.date}
                    </Typography>
                  </Stack>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
                    {proj.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, mb: 2 }}>
                    {proj.description}
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 3 }} flexWrap="wrap">
                    <Chip
                      label={proj.details}
                      size="small"
                      sx={{
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                        color: 'text.primary',
                      }}
                    />
                    <Button
                      variant="text"
                      endIcon={<ArrowOutwardIcon />}
                      sx={{ color: accent }}
                      onClick={() => navigate(`/projects/${slug}`)}
                    >
                      View full details
                    </Button>
                  </Stack>
                </Box>
                <Thumbnail src={proj.images[0]} />
              </SectionBlock>
            );
          })}
        </Stack>
      </Box>
    </SectionFrame>
  );
});

export default ProjectsSection;
