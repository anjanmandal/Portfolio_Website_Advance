// src/components/AchievementsSection.jsx

import React, { forwardRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Stack,
  useTheme,
} from '@mui/material';
import { styled, keyframes, alpha } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PublicIcon from '@mui/icons-material/Public';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from 'react-router-dom';
import SectionFrame from './SectionFrame';

/* ——— Shiny “Achievements” header ——— */
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
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(8,14,30,0.75))'
    : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,255,0.9))',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 20px 60px rgba(0,0,0,0.4)'
    : '0 20px 60px rgba(0,0,0,0.08)',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: theme.spacing(4),
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 24px 72px rgba(0,0,0,0.5)'
      : '0 24px 72px rgba(0,0,0,0.12)',
    borderColor: alpha(theme.palette.primary.main, 0.3),
  },
}));

const Thumbnail = styled(Box)(({ src, theme }) => ({
  borderRadius: 20,
  minHeight: 220,
  width: '100%',
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

const accentColors = ['#5B8DEF', '#FF6A88', '#33A4B5', '#FDA085', '#A18CD1', '#4FACFE'];

/* ——— Your data — include date, description, images… ——— */
const achievements = [
  {
    title: 'ICPC NA South Division Gold Medalist 2025',
    date: 'February 2025',
    location: 'Baton Rouge, LA • LSU',
    category: 'Competitive Programming',
    description:
      'Team Warhawks from the University of Louisiana Monroe earned a gold medal in Division 1 at the 2025 ICPC North America South Central Regional hosted by LSU.',
    details:
      'Division 1 • Gold medal run at LSU',
    icon: EmojiEventsIcon,
    images: ['/images/icpc-warhawks-1.jpeg'],
  },
  {
    title: 'Nexus Technology Cup Finalist 2025',
    date: 'June 18, 2025',
    location: 'Baton Rouge, LA • The Water Campus',
    category: 'Innovation Challenge',
    description:
      'Autism Speaks AI achieved a top-4 finalist position at Nexus Technology Cup 2025 with their innovative AI platform supporting individuals on the autism spectrum.',
    details:
      'Autism Speaks AI • College Track finalist',
    icon: RocketLaunchIcon,
    images: ['/images/NexusTechCup_3751.JPG'],
  },
  {
    title: 'ULM Hawkathon Winner 2025',
    date: 'April 15, 2025',
    location: 'Monroe, LA • ULM',
    category: 'Hackathon',
    description:
      "Team PixelPioneers secured 3rd place at Hawkathon 2025 with their AI-powered Autism Speak AI platform.",
    details: 'PixelPioneers • Autism Speak AI prototype',
    icon: MilitaryTechIcon,
    images: ['/images/hackathon_1_2025.jpeg'],
  },
  {
    title: 'ULM Hawkathon Runner-up 2024',
    date: 'September 30, 2024',
    location: 'Monroe, LA • ULM',
    category: 'Hackathon',
    description:
      "Team DebugDynasty built a Lost & Found website, reconnecting communities with missing items.",
    details: 'DebugDynasty • FindIt lost & found platform',
    icon: MilitaryTechIcon,
    images: ['/images/wakathone.JPG'],
  },
  {
    title: 'Featured on ULM Honors Site',
    date: 'July 1, 2024',
    location: 'Monroe, LA',
    category: 'Media Feature',
    description:
      "Anjan Mandal applied his internship and research experience to real-world software challenges.",
    details: 'Honors spotlight on internship impact',
    icon: PublicIcon,
    images: ['/images/honor-program-ulm.png'],
  },
  {
    title: 'Guest Speaker at ULM Career Fair',
    date: 'November 20, 2024',
    location: 'Monroe, LA • CS Career Fair',
    category: 'Thought Leadership',
    description:
      "Anjan Mandal shared his SquarePlanIT internship insights at ULM’s CS & Cyber Security networking event.",
    details: 'Shared internship journey with CS & Cyber cohort',
    icon: RecordVoiceOverIcon,
    images: ['/images/guest_speaker.jpg'],
  },
];

const AchievementsSection = forwardRef((_, ref) => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Wins & Milestones"
      title="Achievements"
      subtitle="A snapshot of the recent competitions, features, and speaking engagements that are shaping my journey."
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={8}>
          <Box sx={{ position: 'relative', pl: 5 }}>
            <Box
              sx={{
                position: 'absolute',
                left: 16,
                top: 0,
                bottom: 0,
                width: 2,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
              }}
            />

              <Stack spacing={4}>
                {achievements.map((a, idx) => {
                  const slug = a.title.toLowerCase().replace(/[^\w]+/g, '-');
                  const accent = accentColors[idx % accentColors.length];
                  const IconComponent = a.icon || EmojiEventsIcon;

                  return (
                    <SectionBlock key={idx}>
                      <Box>
                        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                          <Chip
                            icon={<IconComponent fontSize="small" />}
                            label={a.category}
                            size="small"
                            sx={{
                              bgcolor: alpha(accent, 0.15),
                              color: accent,
                              borderColor: alpha(accent, 0.3),
                            }}
                            variant="outlined"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {a.date} • {a.location}
                          </Typography>
                        </Stack>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                          {a.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, mb: 2 }}>
                          {a.description}
                        </Typography>
                        <Stack direction="row" spacing={2} sx={{ mt: 3 }} flexWrap="wrap">
                          <Chip
                            label={a.details}
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
                            onClick={() => navigate(`/achievements/${slug}`)}
                          >
                            View full story
                          </Button>
                        </Stack>
                      </Box>
                      <Thumbnail src={a.images[0]} />
                    </SectionBlock>
                  );
                })}
              </Stack>
            </Box>
          </Grid>

        <Grid item xs={12} md={4} sx={{ display: 'none' }} />
      </Grid>
    </SectionFrame>
  );
});

export default AchievementsSection;
