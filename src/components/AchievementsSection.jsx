// src/components/AchievementsSection.jsx
import React, { useState, forwardRef } from 'react';
import {
  Box, Grid, Typography, Container, Card, CardContent,
  Avatar, Dialog, DialogTitle, DialogContent, DialogContentText,
  DialogActions, Button
} from '@mui/material';
import { styled, useTheme, keyframes} from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Star, EmojiEvents, Code, Close as CloseIcon } from '@mui/icons-material';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import Trophy from './Earth';

/* --- Swiper --- */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/* --------- anim / styled helpers (unchanged) ---------- */
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: c => ({ opacity: 1, y: 0, transition: { duration: .6, delay: c * .2 } }),
  hover: { scale: 1.05, boxShadow: '0 12px 24px rgba(0,0,0,.3)', transition: { duration: .3 } }
};
const MotionCard = motion(Card);
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
const AchievementIcon = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.paper,
  marginBottom: theme.spacing(2),
  width: theme.spacing(7),
  height: theme.spacing(7)
}));

/* -------- achievement data (unchanged) -------- */

const achievements = [
  {
    "icon": <EmojiEvents />,
    "title": "ULM Hawkathon Winner 2025",
    "description": "Team PixelPioneers, including Pradeep and Sabin GR, secured 3rd position at Hawkathon 2025, 'Made with AI',ULM, with their impactful project: Autism Speak AI. This innovative tool is designed to support individuals with autism in developing and enhancing their communication skills through AI-powered interactions.",
    "details": "Our project, Autism Speak AI, leverages advanced artificial intelligence to create an interactive learning platform that empowers people with autism to overcome communication challenges. Throughout Hawkathon 2025 at ULM, our team PixelPioneers demonstrated creativity, technical excellence, and determination under the invaluable guidance of Dharmendra Sharma. This milestone not only reflects our commitment to using technology for social good but also serves as motivation to continue improving and refining our solution for the community. We are proud of our achievement and excited about the future possibilities for Autism Speak AI.",
    "images": [
      "/images/hackathon_1_2025.jpeg",
      "/images/hackathon_2_2025.jpg",
      "/images/hackathon_3_2025.jpg",
      "/images/hackathon_4_2025.jpeg",
      "/images/hackathon_5_2025.jpeg",
    ]
  },
  {
    icon: <EmojiEvents />,
    title: 'ULM Hawkathon Winner 2024',
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

/* --------------- component ------------------- */
const AchievementsSection = forwardRef((_, ref) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <Box ref={ref} sx={{ position: 'relative', overflow: 'hidden', py: 10 }}>
      {/* 3‑D background */}
      <Canvas style={{ position: 'absolute', inset: 0 }} camera={{ position: [0,0,5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5,5,5]} intensity={1} />
        <Trophy />
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />
      </Canvas>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* heading with shimmer */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
               <ShinyText variant="h3">Achievements</ShinyText>
            </Box>

        {/* cards */}
        <Grid container spacing={4} justifyContent="center">
          {achievements.map((a, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4 }}>
              <MotionCard
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                whileHover="hover"
                onClick={() => { setSelected(a); setOpen(true); }}
                tabIndex={0}
                sx={{ p:3, backdropFilter:'blur(8px)', bgcolor: theme.palette.background.paper }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <AchievementIcon>{a.icon}</AchievementIcon>
                  <Typography variant="h6" color="primary" gutterBottom>{a.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{a.description}</Typography>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        {/* modal */}
        {selected && (
          <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
            <DialogTitle>{selected.title}</DialogTitle>
            <DialogContent dividers>
              {/* Swiper gallery */}
              {selected.images?.length > 0 && (
                <Box mb={2}>
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    spaceBetween={16}
                    slidesPerView={1}
                  >
                    {selected.images.map((src, idx) => (
                      <SwiperSlide key={idx}>
                        <Box
                          component="img"
                          src={src}
                          alt={`${selected.title} ${idx+1}`}
                          sx={{ width:'100%', borderRadius:2, objectFit:'cover', maxHeight:350 }}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              )}

              <DialogContentText whiteSpace="pre-line">
                {selected.details}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)} startIcon={<CloseIcon />}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </Box>
  );
});

export default AchievementsSection;
