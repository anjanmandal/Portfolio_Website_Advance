// src/components/ExperienceDetail.js

import React, { Suspense } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
  Grid,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import experiences from './Experience'; // Update the import path if necessary
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

// Styled component for the main image with parallax effect
const ParallaxImage = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
  marginBottom: theme.spacing(4),
  '& img': {
    width: '100%',
    height: 'auto',
    display: 'block',
    transition: 'transform 0.5s ease-out',
  },
}));

// Styled component for the overlay with glassmorphism effect
const Overlay = styled(motion.div)(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.25)', // Semi-transparent white
  color: theme.palette.text.primary,
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1),
  backdropFilter: 'blur(10px)', // Frosted glass effect
  boxShadow: theme.shadows[1],
  display: 'flex',
  alignItems: 'center',
}));

// Motion variants for the overlay animation
const overlayVariants = {
  rest: { opacity: 0.8, y: 0 },
  hover: { opacity: 1, y: -5 },
};

// Motion variants for container and list items
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2 },
  }),
};

// 3D Background Component
function BackgroundAnimation() {
  return (
    <>
      {/* Add stars or other 3D elements */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
    </>
  );
}

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const experience = experiences.find((exp) => exp.id.toString() === id);

  if (!experience) {
    return (
      <Box sx={{ padding: 4, textAlign: 'center' }}>
        <Typography variant="h4" color="error">
          Experience Not Found
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  // Parallax effect handler
  const handleMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const xPos = e.clientX - rect.left;
    const yPos = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${xPos}px`);
    target.style.setProperty('--mouse-y', `${yPos}px`);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* 3D Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <BackgroundAnimation />
            <ambientLight intensity={0.5} />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Suspense>
        </Canvas>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          padding: { xs: 2, md: 4 },
          maxWidth: 1200,
          margin: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Animate the main content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section at the Top */}
          <Grid container spacing={4} alignItems="center" sx={{ mb: 4 }}>
            <Grid item xs={12} md={3}>
              <Avatar
                src={experience.logo}
                alt={experience.company}
                sx={{
                  width: { xs: 80, md: 120 },
                  height: { xs: 80, md: 120 },
                  margin: 'auto',
                  boxShadow: theme.shadows[4],
                }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
              >
                {experience.title}
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ mb: 1 }}>
                {experience.company}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {experience.year}
              </Typography>
            </Grid>
          </Grid>

          {/* Parallax Image with Overlay */}
          <ParallaxImage
            onMouseMove={handleMouseMove}
            initial="rest"
            animate="rest"
            whileHover="hover"
          >
            <img
              src={experience.mainImage}
              alt={`${experience.company} main`}
              style={{
                transformOrigin: 'center center',
              }}
            />
            {/* Overlay with description */}
            <Overlay variants={overlayVariants}>
              <InfoOutlined sx={{ mr: 1 }} />
              <Typography variant="body2">
                {experience.imageDescription || 'Description of the picture.'}
              </Typography>
            </Overlay>
          </ParallaxImage>

          {/* Description */}
          <Typography variant="body1" sx={{ my: 4, lineHeight: 1.7 }}>
            {experience.description}
          </Typography>

          {/* Responsibilities */}
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
            Responsibilities
          </Typography>
          <List>
            {experience.content.map((item, idx) => (
              <motion.div
                key={idx}
                variants={listItemVariants}
                custom={idx}
                initial="hidden"
                animate="visible"
              >
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItem>
              </motion.div>
            ))}
          </List>

          {/* Back Button */}
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(-1)}
              size="large"
            >
              Back to Experiences
            </Button>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ExperienceDetail;
