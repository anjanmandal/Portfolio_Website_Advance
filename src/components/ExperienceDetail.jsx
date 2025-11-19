// src/components/ExperienceDetail.jsx

import React from 'react';
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
} from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import experiences from './Experience';

const ParallaxImage = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.spacing(3),
  boxShadow: theme.shadows[6],
  '& img': {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.5s ease-out',
  },
}));

const Overlay = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  background: alpha(theme.palette.background.paper, 0.6),
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1.5),
  backdropFilter: 'blur(10px)',
  boxShadow: theme.shadows[2],
  display: 'flex',
  alignItems: 'center',
}));

const overlayVariants = {
  rest: { opacity: 0.85, y: 0 },
  hover: { opacity: 1, y: -6 },
};

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 },
  }),
};

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

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

  const infoChips = [
    { label: 'Timeline', value: experience.year },
    { label: 'Company', value: experience.company },
    { label: 'Focus', value: (experience.tags && experience.tags.join(' · ')) || 'Security · AI · DX' },
  ];

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #020b1d 0%, #041637 55%, #020816 100%)'
            : 'linear-gradient(135deg, #f8fbff 0%, #eef2ff 60%, #f1f5ff 100%)',
        color: theme.palette.text.primary,
        pb: 6,
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack spacing={4} component={motion.div} variants={heroVariants} initial="hidden" animate="visible">
          <Paper
            sx={{
              borderRadius: 5,
              p: { xs: 3, md: 4 },
              border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.15)}`,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}>
                <Stack spacing={1} alignItems="center">
                  <Avatar src={experience.logo} alt={experience.company} sx={{ width: 96, height: 96 }} />
                  <Typography variant="subtitle2" color="text.secondary">
                    {experience.year}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" sx={{ fontWeight: 900 }}>
                  {experience.title}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {experience.company}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                  {experience.description}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                  {infoChips.map((chip) => (
                    <Chip key={chip.label} label={`${chip.label}: ${chip.value}`} size="small" variant="outlined" />
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Paper>

          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <Paper sx={{ borderRadius: 5, p: { xs: 2.5, md: 3 }, border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.12)}` }}>
                <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>
                  Impact highlights
                </Typography>
                <Stack spacing={2}>
                  {experience.content.map((item, idx) => (
                    <Stack
                      key={idx}
                      component={motion.div}
                      variants={listItemVariants}
                      custom={idx}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, amount: 0.4 }}
                      direction="row"
                      spacing={1.5}
                    >
                      <CheckCircleOutlineIcon color="primary" />
                      <Typography variant="body2" color="text.secondary">
                        {item}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>
            <Grid item xs={12} md={5}>
              <Stack spacing={3}>
                <ParallaxImage initial="rest" animate="rest" whileHover="hover">
                  <img src={experience.mainImage} alt={`${experience.company} main`} />
                  <Overlay variants={overlayVariants}>
                    <InfoOutlined sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      {experience.imageDescription || 'Behind-the-scenes capture.'}
                    </Typography>
                  </Overlay>
                </ParallaxImage>
                <Paper sx={{ borderRadius: 5, p: 3, border: (t) => `1px solid ${alpha(t.palette.primary.main, 0.12)}` }}>
                  <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                    Toolbox & focus
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tech stack: {experience.stack || 'React, Node.js, AWS, SQL'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Primary objectives: reliability, accessibility, and developer mentorship.
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
          </Grid>

          <Box textAlign="center" mt={4}>
            <Button variant="contained" color="primary" onClick={() => navigate(-1)} size="large">
              Back to Experiences
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ExperienceDetail;
