// src/components/InvolvementSection.jsx

import React, { useState, forwardRef } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Backdrop,
  IconButton,
  Link,
} from '@mui/material';
import { styled, keyframes, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Carousel from 'react-material-ui-carousel';
import { motion } from 'framer-motion';

// Sample data for involvements
const involvementData = [
  {
    img: '/images/nsa_ulm_1.jpg',
    tag: 'Vice President, Cultural Affairs',
    title: 'Nepalese Student Association',
    description:
      'Organized biggest college events like Dashain & Tihar Banquet and Nepali Night.',
    collaborators: [{ name: 'Nepalese Student Association', avatar: '/static/images/avatar/3.jpg' }],
    details: {
      images: ['/images/nsa_ulm_1.jpg', '/images/nsa_ulm_2.jpg'],
      additionalInfo:
    `Organized cultural events to promote Nepalese heritage on campus. Facilitated workshops and seminars to engage students in multicultural activities. Collaborated with university departments to host festivals and exhibitions. Managed a team of volunteers to execute successful events with high participation.
      `,
    },
  },
  {
    img: '/images/honors_ulm.jpg',
    tag: 'Honors Program Participant',
    title: 'Honors Program, ULM',
    description:
      'Secured the Honors scholarship by demonstrating academic excellence. Maintained a high GPA to remain on the Presidential List.',
    collaborators: [{ name: 'ULM Honors Program', avatar: '/static/images/avatar/3.jpg' }],
    details: {
      images: ['/images/honors_ulm.jpg', '/images/honors_ulm1.jpeg'],
      additionalInfo:
    `Secured the Honors scholarship by demonstrating academic excellence. Maintained a high GPA to remain on the Presidential List. Engaged in research projects in computer science. Presented research findings at academic conferences, earning recognition for innovative approaches. Participated in leadership development workshops to enhance critical thinking and collaboration skills.
      `,
    },
  },
  // Add more involvements here...
];

// Reuse styled components from ProjectSection

// Particle component
const Particle = styled(Box)(({ theme, size, top, left }) => ({
  position: 'absolute',
  width: size || '10px',
  height: size || '10px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  top: top || '50%',
  left: left || '50%',
  opacity: 0.7,
}));

// Shine keyframes for ShinyText
const shine = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// ShinyText component
const ShinyText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  backgroundSize: '200% auto',
  display: 'inline-block',
  letterSpacing: '0.05em',
  animation: `${shine} 3s linear infinite`,
}));

// StyledCard component
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: theme.palette.background.paper,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer',
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

// StyledCardContent component
const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

// StyledTypography component
const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

// Collaborators component
function Collaborators({ collaborators }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <AvatarGroup max={3}>
          {collaborators.map((collaborator, index) => (
            <Avatar
              key={index}
              alt={collaborator.name}
              src={collaborator.avatar}
              sx={{ width: 24, height: 24 }}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {collaborators.map((collaborator) => collaborator.name).join(', ')}
        </Typography>
      </Box>
    </Box>
  );
}

Collaborators.propTypes = {
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

// BackdropContent component
const BackdropContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: '800px',
  maxHeight: '80vh', // Limit height for smaller screens
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  outline: 'none',
}));

// InvolvementSection component
const InvolvementSection = forwardRef((props, ref) => {
  const theme = useTheme();
  const [selectedInvolvement, setSelectedInvolvement] = useState(null);

  const handleOpen = (involvement) => {
    setSelectedInvolvement(involvement);
  };

  const handleClose = () => {
    setSelectedInvolvement(null);
  };

  return (
    <Box ref={ref} sx={{ p: 4, position: 'relative', overflow: 'hidden' }}>
      {/* Floating Particles */}
      {/* <Particle top="10%" left="15%" size="8px" />
      <Particle top="30%" left="80%" size="12px" />
      <Particle top="50%" left="40%" size="10px" />
      <Particle top="80%" left="20%" size="6px" /> */}

      {/* Heading */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <ShinyText variant="h3">Involvement</ShinyText>
        </Box>
      </Box>

      {/* Grid of Involvements */}
      <Grid container spacing={3} justifyContent="center">
        {involvementData.map((involvement, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <StyledCard onClick={() => handleOpen(involvement)} tabIndex={0}>
                <CardMedia
                  component="img"
                  height="140"
                  image={involvement.img}
                  alt={involvement.title}
                />
                <StyledCardContent>
                  <Typography gutterBottom variant="caption" component="div">
                    {involvement.tag}
                  </Typography>
                  <Typography variant="h6" component="div">
                    {involvement.title}
                  </Typography>
                  <StyledTypography variant="body2" color="text.secondary">
                    {involvement.description}
                  </StyledTypography>
                </StyledCardContent>
                <Collaborators collaborators={involvement.collaborators} />
              </StyledCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Backdrop for Involvement Details */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Boolean(selectedInvolvement)}
        onClick={handleClose}
      >
        {selectedInvolvement && (
          <BackdropContent onClick={(e) => e.stopPropagation()}>
            <IconButton
              onClick={handleClose}
              aria-label="close"
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }}>
              {selectedInvolvement.title}
            </Typography>
            {/* Image Carousel */}
            {selectedInvolvement.details.images && selectedInvolvement.details.images.length > 0 && (
              <Carousel
                autoPlay={false}
                navButtonsAlwaysVisible
                indicators={selectedInvolvement.details.images.length > 1}
              >
                {selectedInvolvement.details.images.map((image, idx) => (
                  <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={`${selectedInvolvement.title} image ${idx + 1}`}
                    key={idx}
                    sx={{ objectFit: 'contain', mb: 2 }}
                  />
                ))}
              </Carousel>
            )}
            {/* Involvement Description */}
            <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary }}>
              {selectedInvolvement.description}
            </Typography>
            {/* Additional Information */}
            {selectedInvolvement.details.additionalInfo && (
              <Typography variant="body2" paragraph sx={{ color: theme.palette.text.secondary }}>
                {selectedInvolvement.details.additionalInfo}
              </Typography>
            )}
            {/* Involvement Link */}
            {selectedInvolvement.details.link && (
              <Link href={selectedInvolvement.details.link} target="_blank" rel="noopener">
                View Involvement
              </Link>
            )}
          </BackdropContent>
        )}
      </Backdrop>
    </Box>
  );
});

export default InvolvementSection;
