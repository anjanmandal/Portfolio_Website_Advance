// src/components/InvolvementSection.jsx
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
import { motion } from 'framer-motion';

/* --- Swiper --- */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/* ---------------------------  data  --------------------------- */
const involvementData = [
  {
    img: '/images/nsa_ulm_1.jpg',
    tag: 'Vice President, Cultural Affairs',
    title: 'Nepalese Student Association',
    description:
      'Organized biggest college events like Dashain & Tihar Banquet and Nepali Night.',
    collaborators: [
      { name: 'Nepalese Student Association', avatar: '/static/images/avatar/3.jpg' },
    ],
    details: {
      images: ['/images/nsa_ulm_1.jpg', '/images/nsa_ulm_2.jpg'],
      additionalInfo: `
  As Vice President of Cultural Affairs, I spearheaded planning and execution of ULM’s largest cultural events, including the Dashain & Tihar Banquet and Nepali Night, which drew 300+ attendees from diverse backgrounds.  
  I coordinated with performers, vendors, and campus organizations to showcase Nepalese music, dance, and cuisine, fostering cultural exchange and community engagement.  
  Managed logistics such as venue booking, budgeting, marketing, and volunteer recruitment to ensure smooth operations.  
  Also facilitated cultural workshops, language sessions, and outreach programs to promote Nepalese heritage and strengthen ties between international and local students on campus.
`,

    },
  },
  {
    img: '/images/honors_ulm.jpg',
    tag: 'Honors Program Participant',
    title: 'Honors Program, ULM',
    description:
      'Secured the Honors scholarship by demonstrating academic excellence …',
    collaborators: [{ name: 'ULM Honors Program', avatar: '/static/images/avatar/3.jpg' }],
    details: {
      images: ['/images/honors_ulm.jpg', '/images/honors_ulm1.jpeg'],
      additionalInfo: `
  Maintained a high GPA and secured the Honors scholarship through consistent academic excellence.  
  Participated in advanced interdisciplinary coursework designed to challenge critical thinking and problem-solving skills.  
  Presented original research findings at academic conferences and campus symposiums, contributing to discussions on innovative solutions in technology and social impact.  
  Engaged in community service and leadership activities as part of the program’s emphasis on holistic development.  
  Collaborated with peers and faculty mentors to complete a capstone project that explored the intersection of AI and accessibility, further reinforcing the program’s commitment to research and real-world application.
`,

    },
  },
];

/* ------------------------  styled helpers  -------------------- */
// (same helpers you already had – shortened here for brevity)
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
  animation: `${shine} 3s linear infinite`,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform .3s, box-shadow .3s',
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[6],
    cursor: 'pointer',
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

/* ---------------------  backdrop wrapper  -------------------- */
const BackdropContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  maxHeight: '80vh',
  overflowY: 'auto',
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
  outline: 'none',
}));

/* =====================  COMPONENT  =========================== */
const InvolvementSection = forwardRef((_, ref) => {
  const theme = useTheme();
  const [current, setCurrent] = useState(null);

  return (
    <Box ref={ref} sx={{ p: 4, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <ShinyText variant="h3">Involvement</ShinyText>
      </Box>

      {/* cards */}
      <Grid container spacing={3} justifyContent="center">
        {involvementData.map((inv, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <StyledCard onClick={() => setCurrent(inv)} tabIndex={0}>
                <CardMedia component="img" height="140" image={inv.img} alt={inv.title} />
                <StyledCardContent>
                  <Typography variant="caption" gutterBottom>
                    {inv.tag}
                  </Typography>
                  <Typography variant="h6">{inv.title}</Typography>
                  <StyledTypography variant="body2" color="text.secondary">
                    {inv.description}
                  </StyledTypography>
                </StyledCardContent>
                <Collaborators collaborators={inv.collaborators} />
              </StyledCard>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* backdrop / modal */}
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
