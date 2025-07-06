// src/components/AchievementsSection.jsx

import React, { forwardRef } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Typography,
  Button,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { EmojiEvents, Star, Code } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

/* ——— Shiny “Achievements” header ——— */
const shine = keyframes`
  0%   { background-position:-200% 0 }
  100% { background-position:200% 0 }
`;
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
  WebkitTextFillColor: 'transparent',
  backgroundSize: '200% auto',
  display: 'inline-block',
  letterSpacing: '0.05em',
  animation: `${shine} 3s linear infinite`,
}));

/* ——— Your data — include date, description, images… ——— */
const achievements = [
  {
  title: 'Nexus Technology Cup Finalist 2025',
  date: 'June 18, 2025',
  description:
    'Autism Speaks AI achieved a top-4 finalist position at Nexus Technology Cup 2025 with their innovative AI platform supporting individuals on the autism spectrum.',
  details:
    'The project showcased at The Water Campus in Baton Rouge demonstrated how advanced AI can deliver personalized learning and communication tools for autistic individuals. Special recognition goes to Pradeep Poudel for his technical expertise and collaboration during the competition.',
  images: ['/images/NexusTechCup_3751.JPG']
},
  {
    title: 'ULM Hawkathon Winner 2025',
    date: 'April 15, 2025',
    description:
      "Team PixelPioneers secured 3rd place at Hawkathon 2025 with their AI-powered Autism Speak AI platform.",
    details: '…',
    images: ['/images/hackathon_1_2025.jpeg'],
  },
  {
    title: 'ULM Hawkathon Runner-up 2024',
    date: 'September 30, 2024',
    description:
      "Team DebugDynasty built a Lost & Found website, reconnecting communities with missing items.",
    details: '…',
    images: ['/images/wakathone.JPG'],
  },
  {
    title: 'Featured on ULM Honors Site',
    date: 'July 1, 2024',
    description:
      "Anjan Mandal applied his internship and research experience to real-world software challenges.",
    details: '…',
    images: ['/images/honor-program-ulm.png'],
  },
  {
    title: 'Guest Speaker at ULM Career Fair',
    date: 'November 20, 2024',
    description:
      "Anjan Mandal shared his SquarePlanIT internship insights at ULM’s CS & Cyber Security networking event.",
    details: '…',
    images: ['/images/guest_speaker.jpg'],
  },
];

const AchievementsSection = forwardRef((_, ref) => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 6 }} ref={ref}>
      {/* Shiny header */}
      <Box textAlign="center" mb={4}>
        <ShinyText>Achievements</ShinyText>
      </Box>

      {/* News-style list */}
      <Grid container direction="column" spacing={4}>
        {achievements.map((a, idx) => {
          const slug = a.title.toLowerCase().replace(/[^\w]+/g, '-');
          return (
            <Grid item key={idx}>
              <Card
                variant="outlined"
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', md: 'row' },
                }}
              >
                <CardMedia
                  component="img"
                  image={a.images[0]}
                  alt={a.title}
                  sx={{
                    width: { xs: '100%', md: 240 },
                    height: 140,
                    objectFit: 'cover',
                  }}
                />

                <CardContent sx={{ flex: 1 }}>
                  <Typography
                    variant="overline"
                    color="text.secondary"
                    display="block"
                    gutterBottom
                  >
                    {a.date}
                  </Typography>

                  <Typography variant="h6" component="h2" gutterBottom>
                    {a.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {a.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ alignSelf: 'center', pl: 2, pb: 2 }}>
                  <Button
                    size="small"
                    variant='contained'
                    borderRadius='5'
                    onClick={() => navigate(`/achievements/${slug}`)}
                  >
                    Read more
                  </Button>
                </CardActions>
              </Card>

              {idx < achievements.length - 1 && <Divider sx={{ my: 2 }} />}
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
});

export default AchievementsSection;
