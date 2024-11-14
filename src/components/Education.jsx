import React,{forwardRef} from 'react';
import { Box, Grid, Typography, Container, Card, CardContent } from '@mui/material';
import { styled, useTheme,keyframes } from '@mui/material/styles';
import { motion, useReducedMotion } from 'framer-motion';

// Motion Variants
const floatVariants = {
  animate: {
    y: [-10, 0, -10],
    transition: {
      y: {
        repeat: Infinity,
        duration: 8,
        ease: 'easeInOut',
      },
    },
  },
};

const randomFloatVariants = (x) => ({
  animate: {
    x: [0, x, 0],
    y: [0, -10, 0],
    transition: {
      x: {
        repeat: Infinity,
        duration: 7,
        ease: 'easeInOut',
      },
      y: {
        repeat: Infinity,
        duration: 7,
        ease: 'easeInOut',
      },
    },
  },
});

const shinyTextVariants = {
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%'],
    transition: {
      backgroundPosition: {
        repeat: Infinity,
        duration: 3,
        ease: 'linear',
      },
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0px 16px 40px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};


const EducationCardMotion = motion(Card);

// Styled component for shiny text with fade-in and hover effect
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

// Styled component for the timeline connector and points
const TimelineConnector = styled(Box)(({ theme }) => ({
  width: '3px',
  flexGrow: 1,
  backgroundColor: theme.palette.primary.main,
}));

const TimelinePoint = styled(Box)(({ theme }) => ({
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  boxShadow: `0px 0px 8px ${theme.palette.secondary.main}`,
}));

// Styled component for particles using Framer Motion
const Particle = styled(motion.div)(({ theme, size, color }) => ({
  position: 'absolute',
  width: size || 8,
  height: size || 8,
  borderRadius: '50%',
  background: color || theme.palette.primary.main,
  opacity: 0.4,
}));

// Styled component for floating shapes using Framer Motion
const FloatingShape = styled(motion.div)(({ theme, size, top, left }) => ({
  position: 'absolute',
  borderRadius: '50%',
  background: `linear-gradient(135deg, ${theme.palette.secondary.light}, ${theme.palette.primary.dark})`,
  opacity: 0.2,
  width: size || 150,
  height: size || 150,
  top: top || '50%',
  left: left || '50%',
}));

const EducationSection = forwardRef((props, ref) => {
  const theme = useTheme(); // Access your custom theme
  const prefersReducedMotion = useReducedMotion(); // Respect user's reduced motion preference

  // Conditionally apply animations based on user preference
  const shouldAnimate = !prefersReducedMotion;

  return (
   
    <Box
    ref={ref}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: 10,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Floating Shapes with Framer Motion */}
      {shouldAnimate && (
        <>
          <FloatingShape
            size={250}
            top="10%"
            left="5%"
            variants={floatVariants}
            animate="animate"
          />
          <FloatingShape
            size={150}
            top="60%"
            left="75%"
            variants={floatVariants}
            animate="animate"
          />
          <FloatingShape
            size={100}
            top="85%"
            left="30%"
            variants={floatVariants}
            animate="animate"
          />

          {/* Floating Particles with Framer Motion */}
          <Particle
            size={10}
            color={theme.palette.primary.main}
            style={{ top: '40%', left: '20%' }}
            variants={randomFloatVariants(10)}
            animate="animate"
          />
          <Particle
            size={6}
            color={theme.palette.secondary.main}
            style={{ top: '30%', left: '60%' }}
            variants={randomFloatVariants(10)}
            animate="animate"
            transition={{ delay: 1 }}
          />
          <Particle
            size={8}
            color={theme.palette.primary.light}
            style={{ top: '70%', left: '80%' }}
            variants={randomFloatVariants(10)}
            animate="animate"
            transition={{ delay: 1.5 }}
          />
          <Particle
            size={12}
            color={theme.palette.secondary.light}
            style={{ top: '20%', left: '40%' }}
            variants={randomFloatVariants(10)}
            animate="animate"
            transition={{ delay: 2 }}
          />
          <Particle
            size={5}
            color={theme.palette.primary.dark}
            style={{ top: '60%', left: '70%' }}
            variants={randomFloatVariants(10)}
            animate="animate"
            transition={{ delay: 2.5 }}
          />
        </>
      )}

      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          position: 'relative', // Ensures content stays above the background shapes
          zIndex: 1,
        }}
      >
        {/* Shiny Heading with Framer Motion */}
        <ShinyText
          variant="h3"
          variants={shinyTextVariants}
          animate={shouldAnimate ? "animate" : undefined}
          whileHover={{
            backgroundPosition: ['100% 50%', '0% 50%'],
            transition: { duration: 3, ease: 'linear' },
          }}
        >
          Education
        </ShinyText>

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
            }}
          >
            <TimelineConnector />
            <TimelinePoint sx={{ my: 2 }} />
            <TimelineConnector />
            <TimelinePoint sx={{ my: 2 }} />
            <TimelineConnector />
            <TimelinePoint sx={{ my: 2 }} />
            <TimelineConnector />
          </Grid>

          {/* Education Milestones */}
          <Grid item xs={12} md={11}>
            {/* First Education Card */}
            <EducationCardMotion
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover="hover"
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
                  sx={{ color: theme.palette.text.secondary }}
                >
                  University of Louisiana Monroe | 2022 - 2025
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1, color: theme.palette.text.secondary }}
                >
                  Focused on software development, data structures, algorithms, and artificial intelligence. Currently enrolling with a 3.96 GPA and multiple research projects in AI.
                </Typography>
              </CardContent>
            </EducationCardMotion>

            {/* Second Education Card */}
            <EducationCardMotion
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover="hover"
              sx={{ mt: 4 }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', color: theme.palette.secondary.main }}
                >
                  High School Diploma
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  National Infotech College | 2019 - 2021
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1, color: theme.palette.text.secondary }}
                >
                  Excelled in computer science and mathematics. Developed a passion for technology and software development, leading to numerous coding competitions.
                </Typography>
              </CardContent>
            </EducationCardMotion>

            {/* Third Education Card */}
            <EducationCardMotion
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover="hover"
              sx={{ mt: 4 }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 'bold', color: theme.palette.primary.dark }}
                >
                  Online Courses & Certifications
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ color: theme.palette.text.secondary }}
                >
                  Various Platforms | 2021 - Present
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mt: 1, color: theme.palette.text.secondary }}
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
export default EducationSection;

