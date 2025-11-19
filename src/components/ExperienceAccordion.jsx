// src/components/ExperienceTimeline.js

import React, { forwardRef } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Avatar,
  Button,
  Paper,
  Chip,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import experiences from './Experience';
import SectionFrame from './SectionFrame';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@mui/lab';

const heroStats = [
  { label: 'Years of experience', value: '4+' },
  { label: 'Products launched', value: '18' },
  { label: 'Podiums / features', value: '6' },
];

const HeroCard = styled(Box)(({ theme }) => ({
  borderRadius: 34,
  padding: theme.spacing(4),
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(4,9,23,0.95), rgba(6,20,48,0.92))'
      : 'linear-gradient(135deg, rgba(248,250,255,0.98), rgba(227,235,255,0.95))',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 45px 90px rgba(2,6,23,0.75)'
    : '0 35px 70px rgba(15,23,42,0.12)',
}));

const TimelineCard = styled(Paper)(({ theme }) => ({
  borderRadius: 28,
  padding: theme.spacing(3),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
}));

const ExperienceTimeline = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLearnMore = (id) => {
    navigate(`/experience/${id}`);
  };

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Career"
      title="Experience"
      subtitle="Roles, internships, and leadership tours with measurable impact."
    >
      <HeroCard
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              Building products and teams that scale—from security rotations to AI copilots and DevRel tours.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              I’ve led ICPC programs, shipped secure SaaS stacks, and partnered with communities to launch experiences under tight timelines.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={2} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              {heroStats.map((stat) => (
                <Box key={stat.label} sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 900 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </HeroCard>

      <Timeline position="alternate" sx={{ mt: 4 }}>
        {experiences.map((exp, idx) => (
          <TimelineItem key={exp.id} component={motion.div} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }}>
            <TimelineOppositeContent sx={{ m: 'auto 0' }}>
              <Typography variant="body2" color="text.secondary">
                {exp.year}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: theme.palette.background.paper }}>
                <Avatar src={exp.logo} alt={exp.company} sx={{ width: 40, height: 40 }} />
              </TimelineDot>
              {idx < experiences.length - 1 && <TimelineConnector sx={{ bgcolor: alpha(theme.palette.primary.main, 0.3) }} />}
            </TimelineSeparator>
            <TimelineContent>
              <TimelineCard>
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {exp.title}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {exp.company}
                      </Typography>
                    </Box>
                  </Stack>
                  <Stack spacing={1}>
                    {exp.content.map((line, i) => (
                      <Typography key={i} variant="body2" color="text.secondary">
                        {line}
                      </Typography>
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {(exp.tags || []).map((tag) => (
                      <Chip key={tag} label={tag} size="small" variant="outlined" />
                    ))}
                  </Stack>
                  <Box textAlign="right">
                    <Button variant="contained" size="small" onClick={() => handleLearnMore(exp.id)}>
                      Learn More
                    </Button>
                  </Box>
                </Stack>
              </TimelineCard>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </SectionFrame>
  );
});

export default ExperienceTimeline;
