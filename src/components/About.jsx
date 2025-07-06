// src/components/AboutSection.jsx

import React, { forwardRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  IconButton,
  Button,
  Card,
  Collapse
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
import ModernStatsSection from './ModernStatsSection';

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
  width: theme.spacing(45),
  height: theme.spacing(45),
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

// Accordion content wrapper
const AccordionContentBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  borderRadius: '15px',

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

const Highlight = styled('span')(({ theme }) => ({
  position: 'relative',
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: -2,
    width: '100%',
    height: '3px',
    background: theme.palette.text.warning,
    transform: 'scaleX(0)',
    transformOrigin: 'left',
    transition: 'transform 0.3s ease',
  },
  '&:hover::after': {
    transform: 'scaleX(1)',
  },
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

  const toggleAccordion = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  return (

 <Box
  ref={ref}
  sx={(theme) => ({
        position: 'relative',
    /* existing backgroundImage lines stay here */

    /* ↓ Overlay: same for light & dark, tweak alpha as you like */
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      backgroundColor: theme.palette.mode === 'dark'
        ? 'rgba(0,0,0,0.7)'   // darker overlay in dark mode
        : 'rgba(255,255,255,0.6)', // light veil in light mode
      zIndex: 0,                 // sits above the photo
    },
    /* Raise the main container above the overlay */
    '& > .MuiContainer-root': { zIndex: 1 },
    overflow: 'hidden',
    py: 5,
    mt: 5,
    width: '100%',
    /* 1️⃣  Put the photo first, gradient second  */
    backgroundImage: `
      url("/images/NexusTechCup_3605.JPG"),
      radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)
    `,
    backgroundSize: 'cover, cover',        // photo and gradient
    backgroundPosition: 'center, center',
    backgroundRepeat: 'no-repeat, no-repeat',
    /* 2️⃣  Dark-mode override keeps the gradient while reusing the same picture */
    ...theme.applyStyles('dark', {
      backgroundImage: `
        url("/images/NexusTechCup_3750.JPG"),
        radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)
      `,
    }),
  })}
>

        <Container
          maxWidth="lg"
          sx={{
            width:'100%',
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
              size={{xs:12, md:6}}
            
              sx={{ display: 'flex', justifyContent: 'center'  }}
            >
              <SmartFrame>
                <StyledImage alt="Anjan's Profile" src="/images/NexusTechCup_3755.JPG" />
              </SmartFrame>
            </Grid>

            {/* About and Story Section with Animation */}
            <Grid item  size={{xs:12, md:6}}>
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
                      sx={{ color: theme.palette.text.primary, lineHeight: 1.6 }}
                    >
                      I am <Highlight>Anjan Mandal</Highlight>, a passionate{' '}
                      <Highlight>Full Stack Developer</Highlight> committed to delivering{' '}
                      innovative software solutions and driving meaningful
                      impact through technology. With a solid foundation in{' '}
                      <Highlight>front-end</Highlight> and <Highlight>back-end </Highlight>development and a strong focus on{' '}
                      <Highlight>user-centered design</Highlight>.
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
                      sx={{ color: theme.palette.text.primary, lineHeight: 1.6 }}
                    >
                      My journey into the world of <Highlight>technology</Highlight> began during my childhood when a
                      neighbor purchased a laptop. One day, I had the opportunity to use it,
                      sparking a deep <Highlight>curiosity</Highlight> about how technology shapes our world. This early
                      experience ignited my passion for <Highlight>learning</Highlight> and <Highlight>exploring</Highlight> the vast possibilities
                      within the tech landscape.
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
          <Collapse in={isAccordionOpen} timeout="auto" unmountOnExit>
          <AccordionContentBox>
            {/* Heading */}
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
              <StylishText>Hi, I am Anjan Mandal</StylishText>
            </Typography>

            {/* Intro line */}
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.6 }}>
              Welcome to my personal space! Connect with me on social media to stay updated
              with my latest projects and insights.
            </Typography>

            <Grid container spacing={4} alignItems="center">
              {/* left: social / contact */}
              <Grid item xs={12} md={6}>
                <SocialIcons>
                  <IconButton
                    aria-label="Facebook"
                    href="https://facebook.com/Anjan-Mandal"
                    target="_blank"
                    rel="noopener"
                    color="primary"
                  >
                    <FacebookIcon fontSize="large" />
                  </IconButton>
                  <IconButton
                    aria-label="LinkedIn"
                    href="https://linkedin.com/in/madalak"
                    target="_blank"
                    rel="noopener"
                    sx={{ color: '#0A66C2' }}
                  >
                    <LinkedInIcon fontSize="large" />
                  </IconButton>
                </SocialIcons>

                <ActionButtons>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    href="/files/Anjan_Mandal_Resume_2025_ULM.pdf"
                    download
                    sx={{
                      borderRadius: '10px',
                      textTransform: 'none',
                      fontSize: '1rem',
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main,
                      '&:hover': {
                        backgroundColor: theme.palette.primary.light,
                      },
                    }}
                  >
                    Download Resume
                  </Button>
                </ActionButtons>

                <Box sx={{ mt: 4 }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Contact Me
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <IconButton aria-label="Email" href="mailto:anjanmandal2076@gmail.com">
                      <EmailIcon />
                    </IconButton>
                    <IconButton aria-label="Phone" href="tel:+3186907227">
                      <PhoneIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>

              {/* right: extra image */}
              <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  component="img"
                  src="/images/NexusTechCup_682.JPG"
                  alt="Anjan additional"
                  sx={{
                    width: 250,
                    height: 250,
                    borderRadius: '50%',
                    border: `5px solid ${theme.palette.primary.main}`,
                    objectFit: 'cover',
                    boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
              <ModernStatsSection />
            </Box>
          </AccordionContentBox>
        </Collapse>
        </Container>
      </Box>
  
  );
});

export default AboutSection;
