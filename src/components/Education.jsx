// src/components/EducationSection.jsx

import React, { forwardRef } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Avatar,
  Paper,
  Chip,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import SchoolIcon from '@mui/icons-material/School';
import TimelineIcon from '@mui/icons-material/Timeline';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
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
      'Applied ML research and ICPC Warhawks strategist',
    ],
    focus: ['Systems Design', 'AI', 'ICPC'],
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

const stats = [
 { label: 'Coursework', value: 'DSA · OS · Networks · DBs · Distributed systems · AI/ML' },
{ label: 'Research', value: 'Applied ML for accessibility & developer experience (DX)' },
{ 
  label: 'Community', 
  value: 'ICPC coaching · STEM clubs · STEM workshops · Former VP, NSA · Lead software developer' 
},


];

const HeroCard = styled(Box)(({ theme }) => ({
  borderRadius: 36,
  padding: theme.spacing(4),
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(4,9,23,0.95), rgba(8,23,45,0.9))'
      : 'linear-gradient(135deg, rgba(249,251,255,0.96), rgba(229,236,255,0.94))',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 40px 90px rgba(2,6,23,0.75)'
    : '0 35px 75px rgba(15,23,42,0.12)',
}));

const TimelineWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  paddingLeft: theme.spacing(6),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: theme.spacing(2),
    top: 0,
    bottom: 0,
    width: 2,
    background: alpha(theme.palette.primary.main, 0.2),
  },
}));

const EntryCard = styled(Paper)(({ theme }) => ({
  borderRadius: 28,
  padding: theme.spacing(3),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.75)
      : alpha(theme.palette.background.paper, 0.95),
  position: 'relative',
  boxShadow: theme.shadows[2],
}));

const EntryDot = styled(Box)(({ theme }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.paper,
  position: 'absolute',
  left: -34,
  top: theme.spacing(3),
}));

const CertCTA = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  padding: theme.spacing(2.5),
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(14,23,42,0.85), rgba(6,15,35,0.85))'
      : 'linear-gradient(135deg, rgba(244,247,255,0.95), rgba(224,234,255,0.9))',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  cursor: 'pointer',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 20px 50px rgba(2, 6, 23, 0.45)'
      : '0 20px 45px rgba(15, 23, 42, 0.12)',
  transition: 'transform 300ms ease, box-shadow 300ms ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow:
      theme.palette.mode === 'dark'
        ? '0 28px 60px rgba(2, 6, 23, 0.55)'
        : '0 28px 60px rgba(15, 23, 42, 0.18)',
  },
}));

const EducationSection = forwardRef((_, ref) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Academic track"
      title="Education"
      subtitle="Learning fueled by research, competitive programming, and community."
      contentSpacing={5}
    >
      <HeroCard>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
             Honors CS scholar at ULM, ICPC NA South Division 1 Gold medalist (LSU), and community STEM leader on academic scholarship.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
             As an Honors scholar at ULM on academic scholarship, my coursework spans data structures & algorithms, operating systems, distributed systems, and AI/ML. Outside the classroom, I serve in student tech leadership, and mentor STEM cohorts through research labs, clubs, and community workshops.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="column" spacing={1.5} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              {stats.map((stat) => (
                <Box key={stat.label}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {stat.label}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                </Box>
              ))}
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
                    <Typography variant="caption" color="text.secondary">
                      Tap to review credentials & badges
                    </Typography>
                  </Box>
                </Stack>
                <ArrowOutwardIcon sx={{ color: alpha(theme.palette.primary.main, 0.9) }} />
              </CertCTA>
            </Stack>
          </Grid>
        </Grid>
      </HeroCard>

      <TimelineWrapper sx={{ mt: 4 }}>
        <Stack spacing={3}>
          {education.map((entry) => (
            <EntryCard key={entry.title}>
              <EntryDot />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="space-between">
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar src={entry.logo} alt={entry.institution} sx={{ width: 56, height: 56 }} />
                  <Box>
                    <Typography variant="overline" sx={{ letterSpacing: 2 }}>
                      {entry.period}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {entry.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                      {entry.institution}
                    </Typography>
                  </Box>
                </Stack>
                <TimelineIcon color="primary" />
              </Stack>
              <Stack spacing={1.2} mt={2}>
                {entry.details.map((text) => (
                  <Typography key={text} variant="body2" color="text.secondary">
                    {text}
                  </Typography>
                ))}
              </Stack>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={2}>
                {entry.focus.map((chip) => (
                  <Chip key={chip} label={chip} size="small" variant="outlined" />
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
