// AchievementsSection.jsx

import React, { useState,forwardRef } from 'react';
import {
  Box,
  Grid,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Link,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Star, EmojiEvents, Code } from '@mui/icons-material';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Trophy from './Earth'; // Ensure this path is correct
import Carousel from 'react-material-ui-carousel'; // Import Carousel

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

// Styled component for the Achievements heading with shimmer effect
const ShimmerText = styled(motion(Typography))(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% auto',
  display: 'inline-block',
  letterSpacing: '0.05em',
  cursor: 'default',
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

  // State to manage Dialog visibility and selected achievement
  const [open, setOpen] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Sample Achievements Data with Multiple Images
  const achievements = [
    {
      icon: <Star />,
      title: 'Featured on ULM Website',
      description:
        'ULM Honors Program students, including Anjan Mandal, gained invaluable hands-on experience this summer through internships and research. These opportunities allowed students to apply their academic knowledge in real-world settings, enhancing their skills and preparing them for future careers.',
      details:
        'Anjan Mandal, a dedicated ULM Honors Program student, honed their skills in software development through a series of immersive internships and research projects over the summer. These real-world experiences enabled Anjan to apply theoretical knowledge in practical settings, developing solutions to real challenges and collaborating closely with industry professionals. Working on diverse projects that spanned from full-stack development to advanced data analysis, Anjan gained a deeper understanding of software engineering principles and best practices.',
      images: [
        '/images/honor-program-ulm.png',
        '/images/honor-program-ulm.png',
        '/images/honor-program-ulm.png',
      ], // Array of image paths
    },
    {
      icon: <EmojiEvents />,
      title: 'ULM Hawkathon Winner',
      description:
        'Anjan Mandal and Team DebugDynasty, proudly secured the runner-up position at the recent ULM Hackathon, hosted by GDSC ULM and ACM Student Chapter. Their project, a Lost and Found website, provides a streamlined platform for communities to reconnect lost items with their owners.',
      details:
        `Anjan Mandal and Team DebugDynasty, composed of talented members Aavash Kuikel, Bipin Sapkota, and Pradeep Poudel, proudly secured the runner-up position at the recent ULM Hackathon, organized by GDSC ULM and the ACM Student Chapter. Their project, a Lost and Found website, tackled a prevalent issue within communities—the need for a centralized platform to facilitate the return of lost items to their rightful owners.
      Recognizing the common challenge of misplaced belongings, the team conceptualized and developed a user-friendly platform where individuals can report lost items and search for items that have been found. With innovative design and robust functionality, their Lost and Found website provides a seamless interface for users to report missing items and browse found items, streamlining the process of reuniting owners with their lost belongings.The hackathon offered Anjan and the team an invaluable opportunity to apply their technical skills in a competitive setting, collaborate with like-minded individuals, and learn from industry experts. With support from GDSC ULM and the ACM Student Chapter, the team thrived in a collaborative environment that encouraged creativity and growth.
      Anjan expressed immense pride in the team’s dedication and hard work throughout the event, highlighting the impact of teamwork and innovative thinking in delivering practical, real-world solutions. Looking forward, Anjan and Team DebugDynasty are excited about the potential of their project to benefit the community and are eager to continue developing it further. Stay tuned for more updates as they aim to make a lasting difference!`,
      images: [
        '/images/wakathone.JPG',
        '/images/wakathone2.jpg',
        '/images/wakathone3.jpg',
      ],
    },
    {
      icon: <Code />,
      title: 'Guest Speaker at ULM Career Fair',
      description:
        'Anjan Mandal recently spoke at the ULM Computer Science & Cyber Security Career Networking Event, sharing his internship experience at SquarePlanIT and offering career insights to fellow students. He connected with esteemed faculty and industry representatives.',
      details:
        `Anjan Mandal had the honor of being a featured speaker at the University of Louisiana Monroe's Computer Science & Cyber Security Career Networking Event for Fall 2024. This prestigious event brought together students, faculty, and industry professionals, fostering meaningful connections within the tech community.
      During his talk, Anjan shared valuable insights from his recent internship with SquarePlanIT, where he gained hands-on experience in the field. He offered practical advice and tips for students embarking on their own career journeys, drawing from his own experiences to help guide them in navigating the tech industry. His presentation covered essential career skills, the importance of real-world experience, and strategies for making the most of internship opportunities.
      Beyond his role as a speaker, Anjan had the opportunity to network with company representatives and learn about exciting career paths and industry trends. This exposure to a variety of tech fields broadened his perspective on the opportunities available and inspired him to continue his own career development.
      Anjan expressed deep gratitude to Ms. Kellye Blackburn and Dr. Prasanthi SreeKumari for their outstanding support in organizing the event. He was honored to connect with esteemed faculty members, including Dr. Missy Judice, SHRM-SCP, Dr. Jarrid Richards, and fellow speaker Sijan Malla, all of whom provided invaluable insights and mentorship. A special acknowledgment was extended to Dr. Kim Taylor for her ongoing guidance and support throughout his journey.
      Reflecting on the event, Anjan emphasized the importance of mentorship, networking, and knowledge sharing in the tech field. He looks forward to strengthening these new connections and contributing further to the ULM community. This experience underscored the power of community and collaboration, leaving Anjan inspired to continue making a positive impact in the industry.`,
      images: [
        '/images/guest_speaker.jpg',
        '/images/guest_speaker2.jpg',
        '/images/guest_speaker3.jpg',
      ],
    },
    // Add more achievements as needed
  ];

  // Handler to open Dialog with selected achievement
  const handleOpen = (achievement) => {
    setSelectedAchievement(achievement);
    setOpen(true);
  };

  // Handler to close Dialog
  const handleClose = () => {
    setOpen(false);
    setSelectedAchievement(null);
  };

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
      {/* 3D Trophy in the Background */}
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 0,
        }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Trophy />
        <Stars
          radius={300} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade // Faded dots (default=false)
        />
      </Canvas>

      {/* Floating Shapes with Framer Motion */}
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
          zIndex: 1, // Ensures content stays above the 3D background
        }}
      >
        {/* Shimmer Heading */}
        <ShimmerText
          variant="h3"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ backgroundPosition: '100% 50%' }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: 'linear',
          }}
        >
          Achievements
        </ShimmerText>

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
                onClick={() => handleOpen(achievement)}
                tabIndex={0} // Make card focusable
                role="button" // Indicate that it's clickable
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleOpen(achievement);
                  }
                }}
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
                  <AchievementIcon aria-label={`${achievement.title} icon`}>
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

      {/* Achievement Detail Dialog */}
      {selectedAchievement && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="achievement-dialog-title"
          aria-describedby="achievement-dialog-description"
          fullWidth
          maxWidth="md" // Increased width for better carousel display
        >
          <DialogTitle id="achievement-dialog-title">
            {selectedAchievement.title}
          </DialogTitle>
          <DialogContent dividers>
            {/* Achievement Image Carousel */}
            {selectedAchievement.images && selectedAchievement.images.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Carousel
                  key={selectedAchievement.title} // Add unique key to force re-render
                  autoPlay={false}
                  navButtonsAlwaysVisible
                  indicators={selectedAchievement.images.length > 1}
                  // Optional: Customize carousel props as needed
                >
                  {selectedAchievement.images.map((image, idx) => (
                    <Box
                      key={idx}
                      component="img"
                      src={image}
                      alt={`${selectedAchievement.title} image ${idx + 1}`}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: 2,
                        objectFit: 'cover',
                        display: 'block', // Ensure no inline spacing
                      }}
                    />
                  ))}
                </Carousel>
              </Box>
            )}
            {/* Project Description */}
            <DialogContentText id="achievement-dialog-description">
              {selectedAchievement.details}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            {/* Optional: Add a link or action button */}
            {/* <Button
              component={Link}
              href={selectedAchievement.link}
              target="_blank"
              rel="noopener"
              color="primary"
            >
              Learn More
            </Button> */}
          </DialogActions>
        </Dialog>
      )}
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
