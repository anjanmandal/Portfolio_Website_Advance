// AchievementsSection.jsx

import React, {forwardRef} from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
} from '@mui/material';
import { styled, useTheme,keyframes } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Star, EmojiEvents, Code } from '@mui/icons-material';

// Motion Variants
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.2,
      ease: 'easeOut',
    },
  }),
  hover: {
    scale: 1.05,
    boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.3)',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

// Styled Motion Components
const MotionCard = motion(Card);



// Define the shine keyframes
const shine = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const ShinyText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  backgroundSize: '200% auto',
  display: 'inline-block',
  letterSpacing: '0.05em',
  animation: `${shine} 3s linear infinite`, // Use the shine keyframes here
}));


// Styled component for Achievement Icons
const AchievementIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
  width: theme.spacing(7),
  height: theme.spacing(7),
}));

const AchievementsSection = forwardRef((props, ref) => {

  const theme = useTheme();

  // Sample Achievements Data
  const achievements = [
    {
      icon: <Star />,
      title: 'Dean’s List',
      description:
        'Consistently achieved a position on the Dean’s List for outstanding academic performance throughout my undergraduate studies.',
    },
    {
      icon: <EmojiEvents />,
      title: 'Coding Competition Winner',
      description:
        'Secured first place in the 2023 National Coding Competition, demonstrating exceptional problem-solving and programming skills.',
    },
    {
      icon: <Code />,
      title: 'Certified Full-Stack Developer',
      description:
        'Earned certification in Full-Stack Development from Coursera, showcasing proficiency in both frontend and backend technologies.',
    },
    // Add more achievements as needed
  ];

  return (
    ref={ref}
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        py: 10,
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Floating Shapes with Framer Motion */}
      <MotionFloatingShape
        size={200}
        top="15%"
        left="10%"
        colorGradient={[
          theme.palette.secondary.light,
          theme.palette.primary.dark,
        ]}
      />
      <MotionFloatingShape
        size={120}
        top="65%"
        left="80%"
        colorGradient={[
          theme.palette.primary.light,
          theme.palette.secondary.dark,
        ]}
      />
      <MotionFloatingShape
        size={90}
        top="80%"
        left="25%"
        colorGradient={[
          theme.palette.secondary.light,
          theme.palette.primary.dark,
        ]}
      />

      {/* Floating Particles with Framer Motion */}
      <MotionParticle
        size={8}
        color={theme.palette.primary.main}
        top="35%"
        left="15%"
        delay={0}
      />
      <MotionParticle
        size={6}
        color={theme.palette.secondary.main}
        top="25%"
        left="50%"
        delay={0.5}
      />
      <MotionParticle
        size={10}
        color={theme.palette.primary.light}
        top="75%"
        left="85%"
        delay={1}
      />
      <MotionParticle
        size={12}
        color={theme.palette.secondary.light}
        top="10%"
        left="45%"
        delay={1.5}
      />
      <MotionParticle
        size={5}
        color={theme.palette.primary.dark}
        top="55%"
        left="65%"
        delay={2}
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
          Achievements
        </ShinyText>

        {/* Achievements Grid */}
        <Grid container spacing={4} justifyContent="center">
          {achievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <MotionCard
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index}
                whileHover="hover"
                sx={{
                  padding: 3,
                  background: theme.palette.background.paper,
                  backdropFilter: 'blur(8px)',
                  borderRadius: theme.spacing(2),
                  boxShadow: `0px 4px 12px rgba(0, 0, 0, 0.1)`,
                  cursor: 'pointer',
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <AchievementIcon>
                    {achievement.icon}
                  </AchievementIcon>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
                    gutterBottom
                  >
                    {achievement.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {achievement.description}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
});

// Styled component for Floating Shapes with Framer Motion
const MotionFloatingShape = styled(motion.div)(
  ({ theme, size, top, left, colorGradient }) => ({
    position: 'absolute',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${colorGradient[0]}, ${colorGradient[1]})`,
    opacity: 0.15,
    width: size || 150,
    height: size || 150,
    top: top || '50%',
    left: left || '50%',
    willChange: 'transform',
    // Animation for floating
    animation: `float 8s ease-in-out infinite`,
    '@keyframes float': {
      '0%': { transform: 'translateY(0px) translateX(0px)' },
      '50%': { transform: 'translateY(-15px) translateX(15px)' },
      '100%': { transform: 'translateY(0px) translateX(0px)' },
    },
  })
);

// Styled component for Particles with Framer Motion
const MotionParticle = styled(motion.div)(
  ({ theme, size, color, top, left }) => ({
    position: 'absolute',
    width: size || 8,
    height: size || 8,
    borderRadius: '50%',
    background: color || theme.palette.primary.main,
    opacity: 0.4,
    top: top || '50%',
    left: left || '50%',
    willChange: 'transform',
    // Animation for floating particles
    animation: `randomFloat 7s ease-in-out infinite`,
    '@keyframes randomFloat': {
      '0%': { transform: 'translateY(0) translateX(0)' },
      '50%': { transform: 'translateY(-10px) translateX(10px)' },
      '100%': { transform: 'translateY(0) translateX(0)' },
    },
  })
);
export default AchievementsSection;