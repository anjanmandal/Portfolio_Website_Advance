// src/components/AboutSection.jsx

import React, {forwardRef} from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import { styled, keyframes, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import CommonBackground from './CommonBackground';

// Keyframes for floating shapes (circles)
const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Styled component for particles in the background
const Particle = styled(Box)(({ size, color, delay, top, left }) => ({
  position: 'absolute',
  width: size || 8,
  height: size || 8,
  borderRadius: '50%',
  background: color,
  top: top || '50%',
  left: left || '50%',
  opacity: 0.3,
  animation: `${float} 6s ease-in-out ${delay || '0s'} infinite`, // Corrected to use template literals
}));

// Keyframes for rotating the conic gradient
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// Keyframes for the pulsating glow effect
const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 25px 10px rgba(255, 255, 255, 0.5);
  }
`;

// Styled component for the Smart Frame around the image
const SmartFrame = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: theme.spacing(50),
  height: theme.spacing(50),
  borderRadius: '20%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: theme.palette.background.paper,
  boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)', // Added quotes

  // Outer frame with rotating gradient
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -8, // Adjust based on desired frame thickness
    left: -8,
    right: -8,
    bottom: -8,
    borderRadius: '20%',
    background: `conic-gradient(
      ${theme.palette.primary.light},
      ${theme.palette.primary.main},
      ${theme.palette.secondary.main},
      ${theme.palette.primary.light}
    )`, // Enclosed in backticks
    zIndex: -2,

  },

  // Inner glow effect
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '20%',
    boxShadow: `0 0 15px 5px ${theme.palette.primary.main}`,
    animation: `${pulse} 3s ease-in-out infinite`, // Corrected to use template literals
    zIndex: -1,
  },
}));

// Styled component for the Image
const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '20%',
});

// Keyframes for the shine effect on the text
const shine = keyframes`
  0% {
    background-position: -200%;
  }
  50% {
    background-position: 200%;
  }
  100% {
    background-position: -200%;
  }
`;

// Keyframes for a subtle fade-in effect when text appears
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled component for animating the text with a shine effect and fade-in
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
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  backgroundSize: '200% auto',
  animation: `${shine} 3s linear infinite, ${fadeIn} 1.5s ease-out`, // Corrected to use template literals
  display: 'inline-block',
  letterSpacing: '0.05em',
}));

const AboutSection = forwardRef((props, ref) => {
  const theme = useTheme();

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <CommonBackground>
      <Box
       ref={ref}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: 15,
        }}
      >
        {/* Background Shapes */}
        <Particle
          color={theme.palette.primary.main}
          size={10}
          top="40%"
          left="20%"
          delay="0s"
        />
        <Particle
          color={theme.palette.secondary.main}
          size={6}
          top="30%"
          left="60%"
          delay="1s"
        />
        <Particle
          color={theme.palette.primary.light}
          size={8}
          top="70%"
          left="80%"
          delay="1.5s"
        />
        <Particle
          color={theme.palette.secondary.light}
          size={12}
          top="20%"
          left="40%"
          delay="2s"
        />
        <Particle
          color={theme.palette.primary.dark}
          size={5}
          top="60%"
          left="70%"
          delay="2.5s"
        />

        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Grid Layout for Image and Text */}
          <Grid container spacing={4} alignItems="center">
            {/* Image Section with Smart Animated Frame */}
            <Grid
              item
              xs={12}
              md={6}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <SmartFrame>
                <StyledImage alt="Anjan's Profile" src="/images/Anjan.jpg" />
              </SmartFrame>
            </Grid>

            {/* About and Story Section with Animation */}
            <Grid item xs={12} md={6}>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {/* Shiny Text with Fade-In */}
                  <motion.div variants={itemVariants}>
                    <ShinyText variant="h3">FULL STACK DEVELOPER</ShinyText>
                  </motion.div>

                  {/* About Section */}
                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        color: theme.palette.text.primary,
                      }}
                    >
                      About Me
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      I am Anjan Mandal, a passionate Full Stack Developer, dedicated to software development, engineering, and creating innovative solutions that make a meaningful impact. With a strong background in both front-end and back-end technologies and a keen eye for design, I strive to bring cutting-edge ideas to life.
                    </Typography>
                  </motion.div>

                  {/* Story Section */}
                  <motion.div variants={itemVariants}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        color: theme.palette.text.primary,
                      }}
                    >
                      My Story
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      My journey into the world of technology began during my childhood when a neighbor purchased a laptop. One day, I had the opportunity to use it, sparking a deep curiosity about how technology shapes our world. This early experience ignited my passion for learning and exploring the vast possibilities within the tech landscape.

                      Over the years, I have cultivated my skills in both front-end and back-end development, working on several projects that challenge conventional thinking and push the boundaries of innovation.
                    </Typography>
                  </motion.div>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </CommonBackground>
  );
});

export default AboutSection;
