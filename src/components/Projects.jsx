// src/components/ProjectSection.jsx
import React, { useState, forwardRef } from 'react';
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

/* --- Swiper imports (Carousel) --- */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/* ----------------- sample data (unchanged) ------------------ */
const cardData = [
  {
    img: '/images/dashboard.png',
    tag: 'Full-Stack Development',
    title: 'HelpHub',
    description:
      'HelpHub is a dynamic web application designed to bridge the gap between individuals seeking assistance and professionals offering their expertise. Whether you need help with household tasks, project management, or specialized services, HelpHub provides a seamless platform to connect, collaborate, and achieve your goals efficiently.',
    collaborators: [{ name: 'Anjan Mandal', avatar: '/static/images/avatar/2.jpg' }],
    details: {
      images: ['/images/bid.png', '/images/request.png','/images/mybids.png'],
      link: 'https://github.com/anjanmandal/HelpHub.git',
      additionalInfo:
        `This platform also includes features like event scheduling, notification systems, and integration with LinkedIn for seamless professional networking. HelpHub's bid system is thoughtfully designed to create a balanced marketplace where affordability meets quality. By implementing strategic bid adjustments and prioritizing the smallest original bids, HelpHub ensures that both requesters and professionals derive maximum value from their interactions, fostering a thriving community of assistance and support.
        Affordability for Requesters: Maintains reasonable costs for those seeking help, preventing overpayment.

Encourages Quality and Competition: By adjusting bids based on the Promised Amount, the system incentivizes professionals to offer both competitive and quality services.

Transparency and Trust: Clear bid adjustments and selection criteria foster trust between requesters and professionals.

Efficient Matching: Automatically identifying the most suitable bid streamlines the process of connecting requesters with the right professionals.`,
    },
  },
  {
    img: '/images/L&L.png',
    tag: 'Full-Stack Development',
    title: 'AI-L&L-VIDEO-GENERATOR',
    description:
      'A full-stack application that generates video content from a text prompt. This project consists of a backend built with Node.js and Express that handles text generation and video processing, and a frontend built with React, providing a user-friendly interface with dark mode and 3D visual effects.',
    collaborators: [{ name: 'Anjan Mandal', avatar: '/static/images/avatar/2.jpg' }],
    details: {
      images: ['/images/L&L.png', '/images/L&L2.png','/images/L&L3.png'],
      link: 'https://github.com/anjanmandal/L-L.git',
      additionalInfo:
        `A full-stack application that generates video content from a text prompt. This project consists of a backend built with Node.js and Express that handles text generation and video processing, and a frontend built with React, providing a user-friendly interface with dark mode and 3D visual effects.
        AI-Powered Text Generation: Generates responses to user prompts using AI. Text-to-Speech and Video Creation: Converts text responses into speech and combines them with dynamic subtitles to create video content. Dark Mode Support: Toggle dark/light themes for the interface. Three.js Visual Effects: 3D star background for a visually engaging experience. Submitting a Prompt Enter a prompt in the text field. Click "Generate Video". Wait for the video to be generated and displayed below. How It Works Frontend: The user enters a text prompt, which is sent to the backend. Backend: Generates a text response with AI. Converts the response text to audio. Creates a video.`,
    },
  },
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
    collaborators: [{ name: 'Anjan Mandal', avatar: '/static/images/avatar/2.jpg' }],
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

/* -----------------  styled helpers (unchanged) -------------- */
const shine = keyframes`
  0% { background-position:-200% 0 }
  100%{ background-position:200% 0 }
`;
const ShinyText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(90deg,${theme.palette.primary.light},${theme.palette.primary.main},${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% auto',
  display: 'inline-block',
  letterSpacing: '0.05em',
  animation: `${shine} 3s linear infinite`,
}));
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform .3s, box-shadow .3s',
  '&:hover': {
    cursor: 'pointer',
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
  },
}));
const StyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': { paddingBottom: 16 },
});
const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
});
const BackdropContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  maxHeight: '80vh',
  overflowY: 'auto',
  background: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  outline: 'none',
}));

/* collaborators badge */
const Collaborators = ({ collaborators }) => (
  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', p: 2 }}>
    <AvatarGroup max={3}>
      {collaborators.map((c, i) => (
        <Avatar key={i} src={c.avatar} alt={c.name} sx={{ width: 24, height: 24 }} />
      ))}
    </AvatarGroup>
    <Typography variant="caption">
      {collaborators.map((c) => c.name).join(', ')}
    </Typography>
  </Box>
);

/* ================  component  ==================== */
const ProjectSection = forwardRef((_, ref) => {
  const theme = useTheme();
  const [current, setCurrent] = useState(null);

  return (
    <Box ref={ref} sx={{ p: 4, position: 'relative' }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <ShinyText variant="h3">Projects</ShinyText>
      </Box>

      {/* cards */}
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((proj, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <StyledCard onClick={() => setCurrent(proj)} tabIndex={0}>
              <CardMedia component="img" height="140" image={proj.img} alt={proj.title} />
              <StyledCardContent>
                <Typography variant="caption" gutterBottom>{proj.tag}</Typography>
                <Typography variant="h6">{proj.title}</Typography>
                <StyledTypography variant="body2" color="text.secondary">
                  {proj.description}
                </StyledTypography>
              </StyledCardContent>
              <Collaborators collaborators={proj.collaborators} />
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* modal */}
      <Backdrop
        open={Boolean(current)}
        onClick={() => setCurrent(null)}
        sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
      >
        {current && (
          <BackdropContent onClick={(e) => e.stopPropagation()}>
            <IconButton
              onClick={() => setCurrent(null)}
              sx={{ position: 'absolute', top: 8, right: 8 }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h4" gutterBottom color="text.primary">
              {current.title}
            </Typography>

            {/* Swiper carousel */}
            {current.details.images?.length > 0 && (
              <Box mb={2}>
                <Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={16}
                  slidesPerView={1}
                  navigation
                  pagination={{ clickable: true }}
                >
                  {current.details.images.map((src, idx) => (
                    <SwiperSlide key={idx}>
                      <Box
                        component="img"
                        src={src}
                        alt={`${current.title} ${idx + 1}`}
                        sx={{ width: '100%', height: 300, objectFit: 'contain' }}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            )}

            <Typography variant="body1" paragraph color="text.secondary">
              {current.description}
            </Typography>

            {current.details.additionalInfo && (
              <Typography variant="body2" paragraph color="text.secondary">
                {current.details.additionalInfo}
              </Typography>
            )}

            {current.details.link && (
              <Link href={current.details.link} target="_blank" rel="noopener">
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
