// src/components/EducationSection.jsx

import React, { forwardRef, memo } from 'react';
import {
  Box,
  Container,
  Typography,
  useTheme,
  Avatar,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@mui/lab';
import { motion, useReducedMotion } from 'framer-motion';
import { styled, keyframes } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// Import your logos
import ulmLogo from '/images/ulm-logo.png';
import nicLogo from '/images/ni-logo.png';

// Gradient shine keyframes for title
const shine = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const AnimatedTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  backgroundSize: '200% auto',
  animation: `${shine} 4s linear infinite`,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
}));

// Education entries
const educationEntries = [
  {
    id: 'bsc',
    period: '2022 – 2025',
    title: 'B.Sc. Computer Science',
    institution: 'University of Louisiana Monroe',
    logo: ulmLogo,
    bullets: [
      'Focused on software development, data structures, algorithms, and AI.',
      'Maintained a 3.96 GPA with research projects in Machine Learning and Data Science.',
    ],
  },
  {
    id: 'hs',
    period: '2019 – 2021',
    title: 'High School Diploma',
    institution: 'National Infotech College',
    logo: nicLogo,
    bullets: [
      'Excelled in computer science and mathematics.',
      'Led coding competitions and STEM clubs.',
    ],
  },
];

// Framer Motion fade-in variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const EducationSection = forwardRef((_, ref) => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      ref={ref}
      component={motion.section}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      sx={{ py: { xs: 6, md: 12 } }}
    >
      <Container maxWidth="lg" sx={{ textAlign: 'center', mb: 6 }}>
        <AnimatedTitle component="div">Education</AnimatedTitle>
        <Typography variant="subtitle1" color="text.secondary">
          My academic journey and continuous learning path
        </Typography>
      </Container>

      <Timeline position="alternate">
        {educationEntries.map((entry, idx) => {
          const isOnRight = idx % 2 === 0;

          return (
            <TimelineItem
              key={entry.id}
              component={motion.div}
              variants={fadeInVariant}
              custom={idx}
            >
              <TimelineOppositeContent
                sx={{
                  m: 'auto 0',
          
                }}
                variant="body2"
                color="text.secondary"
              >
                {entry.period}
              </TimelineOppositeContent>

              <TimelineSeparator>
                <TimelineDot sx={{ p: 0, bgcolor: 'transparent' }}>
                  <Avatar
                    src={entry.logo}
                    alt={entry.title}
                    variant="rounded"
                    sx={{ width: 56, height: 56, boxShadow: theme.shadows[3] }}
                  />
                </TimelineDot>
                {idx < educationEntries.length - 1 && <TimelineConnector />}
              </TimelineSeparator>

              <TimelineContent
                sx={{
                  display: 'flex',
                  justifyContent: isOnRight ? 'flex-start' : 'flex-end',
                  py: '12px',
                  px: 2,
                }}
              >
                <Card
                  variant="outlined"
                  elevation={3}
                  sx={{
                    maxWidth: 360,
                    width: '100%',
                    p: 2,
                    textAlign: isOnRight ? 'left' : 'right',
                  }}
                >
                  {/* Header: logo + title */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Avatar
                      src={entry.logo}
                      alt={entry.title}
                      variant="rounded"
                      sx={{ width: 40, height: 40, mr: 1 }}
                    />
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {entry.title}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        {entry.institution}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Bullets */}
                  <List dense>
                    {entry.bullets.map((bullet, i) => (
                      <ListItem key={i} disableGutters>
                        <ListItemIcon>
                          <CheckCircleOutlineIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={bullet} />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
    </Box>
  );
});

export default memo(EducationSection);
