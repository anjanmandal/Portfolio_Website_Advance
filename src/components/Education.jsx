// src/components/EducationSection.jsx

import React, { forwardRef, memo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
} from '@mui/material';
import { styled, useTheme,keyframes } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';

// Motion Variants
const floatVariants = {
  animate: {
    y: [0, -20, 0],
    transition: {
      y: {
        repeat: Infinity,
        duration: 6,
        ease: 'easeInOut',
      },
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.2,
      ease: 'easeOut',
    },
  }),
};

const EducationCardMotion = motion(Card);

// Styled component for the section title
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2.5rem',
  textAlign: 'center',
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(4),
}));

// Styled component for the timeline connector and points
const TimelineConnector = styled(Box)(({ theme }) => ({
  width: '2px',
  flexGrow: 1,
  backgroundColor: theme.palette.divider,
}));

const TimelinePoint = styled(Box)(({ theme }) => ({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
}));

// Styled component for floating shapes using Framer Motion
const FloatingShape = styled(motion.div)(({ theme, size, top, left }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `radial-gradient(circle, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
  opacity: 0.1,
  width: size || 150,
  height: size || 150,
  top: top || '50%',
  left: left || '50%',
  zIndex: 0,
}));

const ShinyText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  backgroundSize: '200% auto',
  display: 'inline-block',
  letterSpacing: '0.05em',
  animation: `shine 3s linear infinite`,
}));

// Animation for text shining effect
const shine = keyframes`
  0% { background-position: 0% }
  100% { background-position: 200% }
`;

const EducationSection = forwardRef((props, ref) => {
  const theme = useTheme();
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = !prefersReducedMotion;

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: { xs: 8, md: 12 },
        backgroundColor:'transparent',
      }}
    >
      {/* Floating Shapes with Framer Motion */}
      {shouldAnimate && (
        <>
          <FloatingShape
            size={300}
            top="5%"
            left="10%"
            variants={floatVariants}
            animate="animate"
          />
          <FloatingShape
            size={200}
            top="80%"
            left="80%"
            variants={floatVariants}
            animate="animate"
          />
        </>
      )}

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Centered Section Title */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ShinyText variant="h3">Education</ShinyText>
      </Box>

        {/* Timeline and Education Cards */}
        <Grid container spacing={6}>
          {/* Timeline Connector */}
          <Grid
            item
            xs={1}
            sx={{
              display: { xs: 'none', md: 'flex' },
              flexDirection: 'column',
              alignItems: 'center',
              mt: 2,
            }}
          >
            <TimelinePoint />
            <TimelineConnector sx={{ flexGrow: 1 }} />
            <TimelinePoint />
            <TimelineConnector sx={{ flexGrow: 1 }} />
            <TimelinePoint />
          </Grid>

          {/* Education Milestones */}
          <Grid item xs={12} md={11}>
            {/* First Education Card */}
            <EducationCardMotion
              custom={0}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              }}
              transition={{ duration: 0.3 }}
              sx={{
                mb: 4,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
                >
                  B.Sc. Computer Science
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.text.secondary, mb: 1 }}
                >
                  University of Louisiana Monroe | 2022 - 2025
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Focused on software development, data structures, algorithms, and artificial intelligence. Currently maintaining a 3.96 GPA with multiple research projects in AI.
                </Typography>
              </CardContent>
            </EducationCardMotion>

            {/* Second Education Card */}
            <EducationCardMotion
              custom={1}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              }}
              transition={{ duration: 0.3 }}
              sx={{
                mb: 4,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.palette.secondary.main,
                  }}
                >
                  High School Diploma
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.text.secondary, mb: 1 }}
                >
                  National Infotech College | 2019 - 2021
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Excelled in computer science and mathematics, developing a passion for technology and software development, leading to numerous coding competitions.
                </Typography>
              </CardContent>
            </EducationCardMotion>

            {/* Third Education Card */}
            <EducationCardMotion
              custom={2}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
              }}
              transition={{ duration: 0.3 }}
              sx={{
                mb: 4,
                backgroundColor: theme.palette.background.paper,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                    color: theme.palette.primary.dark,
                  }}
                >
                  Online Courses & Certifications
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.text.secondary, mb: 1 }}
                >
                  Various Platforms | 2021 - Present
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Completed certifications in Full-Stack Development, Machine Learning, and Cloud Computing through platforms like Coursera and Udemy to enhance professional skills.
                </Typography>
              </CardContent>
            </EducationCardMotion>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
});

export default memo(EducationSection);
