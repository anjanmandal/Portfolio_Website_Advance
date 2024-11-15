// src/components/ProjectSection.jsx

import React, { useState,forwardRef } from 'react';
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
import { styled, keyframes,useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Carousel from 'react-material-ui-carousel'; // Optional: For image carousel
// Sample data for projects
const cardData = [
  {
    img: '/images/project_alumni.png',
    tag: 'Full-Stack Development',
    title: 'Alumni Platform',
    description:
      'An interactive platform designed to connect alumni and current students in real-time. Built with React.js, Node.js, and MongoDB, it features real-time chat functionality, allowing users to network with alumni, receive updates on job opportunities, and stay informed about upcoming events and workshops. The platform fosters a supportive community that enhances career growth and engagement.',
    collaborators: [{ name: 'Anjan Mandal', avatar: '/static/images/avatar/2.jpg' }],
    details: {
      images: ['/images/project_alumni.png', '/images/project_alumni2.png','/images/project_alumni3.png'],
      link: 'https://github.com/anjanmandal/ULM_Alumni_Search_Dashboard.git',
      additionalInfo:
        'This platform also includes features like event scheduling, notification systems, and integration with LinkedIn for seamless professional networking.',
    },
  },
  {
    img: '/images/lost_found3.png',
    tag: 'Full-Stack Development',
    title: 'Lost and Found Website',
    description:
      'A robust serverless web application designed to streamline the process of reporting and recovering lost items. Built with React.js, Node.js, and MongoDB, this platform offers user-friendly interfaces for uploading lost items, searching for found items, and facilitating real-time communication between users through integrated chat functionality.',
    collaborators: [{ name: 'Aavash Kuikel', avatar: '/static/images/avatar/2.jpg' },{ name: 'Pradeep Poudel', avatar: '/static/images/avatar/2.jpg' },{ name: 'Beepin Sapkota', avatar: '/static/images/avatar/2.jpg' }],
    details: {
      images: ['/images/lost_found1.png', '/images/lost_found2.png'],
      link: 'https://github.com/anjanmandal/Lost-and-Found-website-.git',
      additionalInfo:
      `This Lost and Found platform provides a comprehensive solution for communities to report and locate lost items. Key features include:
        Real-Time Chat and Notifications**: Leveraging WebSocket technology, the platform provides real-time messaging between users. This allows individuals who have lost items and those who have found items to communicate instantly, facilitating timely resolutions. Users also receive instant notifications when new items matching their search criteria are posted. Role-based access control is enforced to protect user information, ensuring only authorized users can view or edit sensitive data. Advanced Search and Filtering: Users can search and filter items based on multiple criteria, such as location, date, category, and keywords, ensuring they find relevant results quickly. The platform uses DynamoDB’s indexing capabilities for fast and efficient querying of items. Cross-Platform Compatibility: Developed with a responsive design using React.js and Material-UI, the platform provides an optimal experience across mobile, tablet, and desktop devices. Compatibility with all major browsers and devices ensures users can access the platform wherever they are.`
   ,
    },
  },
  {
    img: '/images/okay_journey2.jpeg',
    tag: 'Full-Stack Development',
    title: 'Okay Journey',
    description:
      'This Bus Ticketing Website offers a comprehensive and user-friendly platform for travelers to search for, book, and manage their bus tickets online. ',
    collaborators: [{ name: 'National Innovation Center', avatar: '/static/images/avatar/2.jpg' },{ name: 'Anjan Mandal', avatar: '/static/images/avatar/2.jpg' }],
    details: {
      images: ['/images/okay_journey3.jpg', '/images/okay_journey.png'],
      link: 'https://www.okayjourney.com',
      additionalInfo:
     `This Bus Ticketing Website offers a comprehensive and user-friendly platform for travelers to search for, book, and manage their bus tickets online. Users can effortlessly search for available bus routes by entering their origin, destination, and travel dates, with the ability to filter results based on price, travel time, and bus amenities. The website features real-time seat availability, allowing passengers to select their preferred seats via an interactive seat map. Upon booking, users receive immediate confirmation and an electronic ticket (e-ticket) sent directly to their email, ensuring a smooth and efficient booking process. The platform integrates a secure payment gateway, supporting various payment methods such as credit/debit cards, net banking, digital wallets, and UPI, all protected by SSL encryption and compliant with PCI-DSS standards to safeguard user data. It caters to a global audience by offering multi-language and multi-currency support, making the booking process accessible and convenient for international travelers. Registered users can access their personal accounts to view their booking history, download past e-tickets, and manage their profiles, facilitating easy repeat bookings. The website also features dynamic pricing that adjusts ticket costs based on demand and seasonality, along with promotional codes and seasonal discounts to provide users with the best possible fares.`
   ,
    },
  },
  // Add other projects similarly...
  // ...
];

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

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

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

// Styled Backdrop Content
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

const ProjectSection = forwardRef((props, ref) => {
  const theme = useTheme();
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpen = (project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  return (
    <Box ref={ref} sx={{ p: 4, position: 'relative', overflow: 'hidden' }}>
      {/* Floating Particles */}
      <Particle top="10%" left="15%" size="8px" />
      <Particle top="30%" left="80%" size="12px" />
      <Particle top="50%" left="40%" size="10px" />
      <Particle top="80%" left="20%" size="6px" />

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
        <ShinyText variant="h3">Projects</ShinyText>
      </Box>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((project, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <StyledCard onClick={() => handleOpen(project)} tabIndex={0}>
              <CardMedia
                component="img"
                height="140"
                image={project.img}
                alt={project.title}
              />
              <StyledCardContent>
                <Typography gutterBottom variant="caption" component="div">
                  {project.tag}
                </Typography>
                <Typography variant="h6" component="div">
                  {project.title}
                </Typography>
                <StyledTypography variant="body2" color="text.secondary">
                  {project.description}
                </StyledTypography>
              </StyledCardContent>
              <Collaborators collaborators={project.collaborators} />
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* Backdrop for Project Details */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={Boolean(selectedProject)}
        onClick={handleClose}
      >
        {selectedProject && (
          <BackdropContent onClick={(e) => e.stopPropagation()}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
            </Box>
            <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }} >
              {selectedProject.title}
            </Typography>
            {/* Image Carousel */}
            {selectedProject.details.images && selectedProject.details.images.length > 0 && (
              <Carousel
                autoPlay={false}
                navButtonsAlwaysVisible
                indicators={selectedProject.details.images.length > 1}
              >
                {selectedProject.details.images.map((image, idx) => (
                  <CardMedia
                    component="img"
                    height="300"
                    image={image}
                    alt={`${selectedProject.title} image ${idx + 1}`}
                    key={idx}
                    sx={{ objectFit: 'contain', mb: 2 }}
                  />
                ))}
              </Carousel>
            )}
            {/* Project Description */}
            <Typography variant="body1" paragraph sx={{ color: theme.palette.text.secondary }} >
              {selectedProject.description}
            </Typography>
            {/* Additional Information */}
            {selectedProject.details.additionalInfo && (
              <Typography variant="body2" paragraph sx={{ color: theme.palette.text.secondary }}>
                {selectedProject.details.additionalInfo}
              </Typography>
            )}
            {/* Project Link */}
            {selectedProject.details.link && (
              <Link href={selectedProject.details.link} target="_blank" rel="noopener">
                View Project
              </Link>
            )}
          </BackdropContent>
        )}
      </Backdrop>
    </Box>
  );
});
export default ProjectSection;