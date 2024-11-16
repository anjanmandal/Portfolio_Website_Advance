// src/components/AboutSection.jsx

import React, { forwardRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  Button,
} from '@mui/material';
import { styled, keyframes, useTheme } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CommonBackground from './CommonBackground';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

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
  animation: `${float} 6s ease-in-out ${delay || '0s'} infinite`,
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
  boxShadow: '0px 10px 30px -5px rgba(0, 0, 0, 0.3)',

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
    )`,
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
    animation: `${pulse} 3s ease-in-out infinite`,
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
  animation: `${shine} 3s linear infinite, ${fadeIn} 1.5s ease-out`,
  display: 'inline-block',
  letterSpacing: '0.05em',
}));

// Styled component for a more stylish "Hi, I am Anjan Mandal" text
const StylishText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(
    90deg,
    ${theme.palette.secondary.light},
    ${theme.palette.secondary.main},
    ${theme.palette.primary.main}
  )`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  backgroundSize: '200% auto',
  animation: `${shine} 4s linear infinite, ${fadeIn} 2s ease-out`,
  display: 'inline-block',
  letterSpacing: '0.05em',
}));

// Styled component for animating the "Learn More" button with vertical shake
const ShakingMotionButton = styled(motion(Button))(({ theme }) => ({
  borderRadius: '50px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  fontSize: '1.2rem',
  padding: theme.spacing(1.5, 6),
  marginTop: theme.spacing(8),
}));

// Styled component for the accordion content
const AccordionContent = styled(motion(Box))(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  borderRadius: '15px',
  background: theme.palette.background.paper,
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
}));

// Styled component for social media icons
const SocialIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

// Styled component for additional action buttons within the accordion
const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

// Styled component for the framed image within the accordion
const FramedImage = styled(motion.img)(({ theme }) => ({
  width: '250px',
  height: '250px',
  borderRadius: '50%',
  border: `5px solid ${theme.palette.primary.main}`,
  objectFit: 'cover',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  marginTop: theme.spacing(4),
}));

const AboutSection = forwardRef((props, ref) => {
  const theme = useTheme();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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

  const accordionVariants = {
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    open: {
      height: 'auto',
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
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

          {/* Learn More Button with Vertical Shake */}
          <ShakingMotionButton
            variant="contained"
            color="primary"
            size="large"
            onClick={toggleAccordion}
            sx={{
              mt: 8,
              px: 6,
              py: 1.5,
              borderRadius: '50px',
            }}
            animate={{
              y: [0, -2, 2, -2, 2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            {isAccordionOpen ? 'Hide' : 'Learn More'}
          </ShakingMotionButton>

          {/* Accordion Content */}
          <AnimatePresence>
            {isAccordionOpen && (
              <AccordionContent
                variants={accordionVariants}
                initial="closed"
                animate="open"
                exit="closed"
                layout
              >
                {/* Title */}
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 'bold', mb: 2 }}
                >
                  <StylishText variant="h4">Hi, I am Anjan Mandal</StylishText>
                </Typography>

                {/* Introduction Text */}
                <Typography
                  variant="body1"
                  sx={{ color: theme.palette.text.secondary, mb: 4 }}
                >
                  Welcome to my personal space! Connect with me on social media to stay updated with my latest projects and insights.
                </Typography>

                {/* Grid Layout for Accordion Content */}
                <Grid container spacing={4} alignItems="center">
                  {/* Textual Content */}
                  <Grid item xs={12} md={6}>
                    {/* Social Media Icons */}
                    <SocialIcons>
                      <IconButton
                        aria-label="Facebook"
                        color="primary"
                        href="https://www.facebook.com/yourprofile" 
                        target="_blank"
                        rel="noopener"
                        component={motion.a}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FacebookIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        aria-label="Instagram"
                        color="secondary"
                        href="https://www.instagram.com/yourprofile" 
                        target="_blank"
                        rel="noopener"
                        component={motion.a}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <InstagramIcon fontSize="large" />
                      </IconButton>
                      <IconButton
                        aria-label="LinkedIn"
                        sx={{ color: '#0A66C2' }}
                        href="https://www.linkedin.com/in/madalak/" 
                        target="_blank"
                        rel="noopener"
                        component={motion.a}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <LinkedInIcon fontSize="large" />
                      </IconButton>
                    </SocialIcons>

                    {/* Download Resume Button */}
                    <ActionButtons>
                      <Button
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        href="/files/Anjan_Resume_2025.pdf" 
                        download
                        sx={{
                          borderRadius: '10px',
                          textTransform: 'none',
                          fontSize: '1rem',
                          borderColor: theme.palette.primary.main,
                          color: theme.palette.primary.main,
                          '&:hover': {
                            backgroundColor: theme.palette.primary.light,
                            borderColor: theme.palette.primary.main,
                          },
                        }}
                      >
                        Download Resume
                      </Button>
                    </ActionButtons>

                    {/* Contact Information */}
                    <Box sx={{ marginTop: theme.spacing(4) }}>
                      <Typography
                        variant="h5"
                        sx={{ fontWeight: 'bold', mb: 2 }}
                      >
                        Contact Me
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                        <IconButton
                          aria-label="Email"
                          href="mailto:anjanmandal2076@gmail.com" 
                          color="primary"
                          component={motion.a}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <EmailIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Phone"
                          href="tel:+3186907227" // Replace with your phone number
                          color="primary"
                          component={motion.a}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <PhoneIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>

                  {/* Image Within Accordion */}
                  <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <FramedImage
                      src="/images/anjan-profile.jpeg" // Replace with your actual image path
                      alt="Additional Picture"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  </Grid>
                </Grid>
              </AccordionContent>
            )}
          </AnimatePresence>
        </Container>
      </Box>
    </CommonBackground>
  );
});

export default AboutSection;
