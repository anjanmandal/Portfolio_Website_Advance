// src/components/AchievementsDetail.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  ImageList,
  ImageListItem,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { motion } from 'framer-motion';

/* ——— All achievements now in this array ——— */
const achievements = [
  {
  title: 'Nexus Technology Cup Finalist 2025',
  dateline: 'Baton Rouge, LA • March 15, 2025',
  byline: 'By Anjan Mandal',
  lead:
    'Autism Speaks AI earned a top-4 finalist position in the College Track at Nexus Technology Cup 2025, showcasing an AI-powered platform designed to support individuals on the autism spectrum with transitions and improved social communication skills.',
  quotes: [
    {
      text: '“Placing among the top four at Nexus validated our mission of using technology for inclusion and empowerment.”',
      speaker: '— Anjan Mandal'
    }
  ],
  body: [
    'The project leverages cutting-edge AI to create an adaptive platform that delivers personalized learning and communication support for autistic individuals, fostering independence and confidence.',
    'Special recognition goes to Pradeep Poudel for his outstanding technical expertise and collaboration that helped bring Autism Speaks AI to life.',
    'The competition, organized by Nexus Louisiana at The Water Campus in Baton Rouge, brought together innovative teams from across the region to demonstrate how technology can drive meaningful social change.'
  ],
  images: [
    '/images/NexusTechCup_4081.JPG',
    '/images/NexusTechCup_660.JPG',
    '/images/NexusTechCup_3584.JPG',
    '/images/NexusTechCup_3596.JPG',
    '/images/NexusTechCup_3750.JPG'
  ]
}, {
    title: 'ULM Hawkathon Winner 2025',
    dateline: 'Monroe, LA • May 27, 2025',
    byline: 'By Anjan Mandal',
    lead:
      'Team PixelPioneers secured third place at Hawkathon 2025 with Autism Speak AI, an AI-driven platform that enhances learning opportunities and improves communication skills for individuals on the autism spectrum.',
    quotes: [
      {
        text: '“This journey was a true testament to the creativity, commitment, and collaboration of our team.”',
        speaker: '— Anjan Mandal'
      },

    ],
    body: [
      'Our project leverages advanced AI to build an interactive learning platform designed to help people with autism overcome communication challenges through personalized, engaging experiences.',
      'Special thanks to Sabeen Gr for her incredible technical contributions and teamwork.',
      'We presented our work at an event organized by GDSC ULM and the ULM ACM Student Chapter, supported by Dinesh Chhantyal and many community partners, showcasing how technology can drive meaningful social change.'
    ],
    images: [
      '/images/hackathon_1_2025.jpeg',
      '/images/hackathon_2_2025.jpg',
      '/images/hackathon_3_2025.jpg',
      '/images/hackathon_4_2025.jpeg',
      '/images/hackathon_5_2025.jpeg'
    ]
  },
 {
    title: 'ULM Hawkathon Runner-up 2024',
    dateline: 'Monroe, LA • April 20, 2024',
    byline: 'By Anjan Mandal',
    lead:
      'Team DebugDynasty claimed runner-up honors at Hawkathon 2024 with “FindIt,” a Lost & Found web app reconnecting communities with their missing belongings.',
    quotes: [
      {
        text: '“Tackling a real-world problem under a 24-hour deadline pushed our agile problem-solving skills to the limit.”',
        speaker: '— Anjan Mandal'
      },
    
    ],
    body: [
      'Composed of Aavash, Bipin, and Pradeep, we designed a user-friendly interface that lets people list lost items, browse found reports, and filter by category or location.',
      'Built with React on the front end and Firebase on the back end, “FindIt” synchronizes data in real time so community members see updates instantly.',
      'Under intense hackathon pressure, we completed three full design–build–test cycles, learning to prioritize features that delivered the highest impact.',
      'Our goal was simple but powerful: reduce the time and frustration of reunification, and bring tech-driven empathy back to local communities.'
    ],
    images: [
      '/images/wakathone.JPG',
      '/images/wakathone2.jpg',
      '/images/wakathone3.jpg',
      '/images/wakathone4.JPG',
      '/images/wakathone5.jpg'
    ]
  },
{
  title: 'Featured on ULM Honors Site',
  dateline: 'Monroe, LA • November 12, 2024',
  byline: 'By Anjan Mandal',
  lead:
    'Mandal’s internship at SquarePlanIT allowed him to explore every stage of the software lifecycle—from maintaining legacy systems to designing, testing, coding, and debugging new applications—bridging the gap between theory and real-world practice.',
  quotes: [
    {
      text: '“This experience not only enhanced my technical skills but also taught me the importance of adaptability and continuous learning in software development.”',
      speaker: '— Anjan Mandal'
    },
    {
      text: '“Writing and maintaining documentation taught me how to communicate complex ideas clearly to both technical and non-technical audiences.”',
      speaker: '— Anjan Mandal'
    }
  ],
  body: [
    'He worked extensively with ASP.NET, PHP, and VB.NET, quickly mastering new languages to address client needs and even learning an entirely new language in just a few days to fix an urgent production issue.',
    'Beyond coding, Mandal honed project management and problem-solving skills by planning development sprints, coordinating with stakeholders, and prioritizing features under tight deadlines.',
    'He took ownership of end-to-end documentation—creating user guides, API specs, and troubleshooting manuals—which sharpened his ability to convey intricate workflows to diverse teams.',
    'Overall, the internship underscored the importance of lifelong learning and flexibility in adapting to evolving technologies and client requirements.'
  ],
  images: ['/images/honor-program-ulm.png']
},

  {
  title: 'Guest Speaker at ULM Career Fair',
  dateline: 'Monroe, LA • October 15, 2024',
  byline: 'By Anjan Mandal',
  lead:
    'I was honored to speak at the University of Louisiana Monroe’s Computer Science & Cyber Security Career Networking Event, where I shared insights from my Summer 2024 internship at SquarePlanIT and offered practical advice on breaking into the tech industry.',
  quotes: [
    {
      text: '“It was a privilege to present my journey—from onboarding at SquarePlanIT to leading a security audit initiative—to eager CS and cybersecurity students.”',
      speaker: '— Anjan Mandal'
    },
    {
      text: '“Networking with recruiters from top firms and hearing about their upcoming opportunities reinforced how vital soft skills are alongside technical expertise.”',
      speaker: '— Anjan Mandal'
    },
    {
      text: '“A heartfelt thank you to Ms. Kellye Blackburn and Dr. Prasanthi SreeKumari for their unwavering support in organizing this event.”',
      speaker: '— Anjan Mandal'
    },
  ],
  body: [
    'During my 30-minute presentation, I walked attendees through the lifecycle of a real-world project: scoping requirements, setting up CI/CD pipelines, and implementing best practices for secure coding.',
    'I highlighted key takeaways from my role as a cybersecurity analyst—how to conduct threat modeling, perform vulnerability scans, and integrate Static Application Security Testing (SAST) into a development workflow.',
    'After the talk, I joined a panel discussion on resume optimization, where I emphasized quantifying impact with metrics and tailoring applications to specific company needs.',
    'The networking session that followed gave students a chance to meet representatives from leading tech companies; I encouraged everyone to practice their elevator pitches and follow up on LinkedIn.',
    'Overall, the event fostered a collaborative environment for students, faculty, and industry professionals—reinforcing ULM’s commitment to bridging academia and the rapidly evolving cybersecurity landscape.'
  ],
  images: [
    '/images/guest_speaker.jpg',
    '/images/guest_speaker3.jpg',
    '/images/guest_speaker4.jpg',
    '/images/guest_speaker5.jpg',
    '/images/guest_speaker2.jpg'
  ]
}

];

export default function AchievementsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));

  const ach = achievements.find(
    (a) => a.title.toLowerCase().replace(/[^\w]+/g, '-') === slug
  );

  if (!ach) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography variant="h6">Achievement not found.</Typography>
        <Box textAlign="center" mt={4}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate(-1)}
            variant="outlined"
          >
            Back
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          Home
        </Link>
        <Link underline="hover" color="inherit" onClick={() => navigate('/')} sx={{ cursor: 'pointer' }}>
          Achievements
        </Link>
        <Typography color="text.primary">{ach.title}</Typography>
      </Breadcrumbs>

      {/* Hero banner */}
      <Box
        component={motion.div}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        sx={{
          position: 'relative',
          height: { xs: 240, md: 400 },
          borderRadius: 2,
          overflow: 'hidden',
          mb: 4,
        }}
      >
        <Box component="img" src={ach.images[0]} alt={ach.title}
             sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)' }} />
        <Box sx={{ position: 'absolute', bottom: 24, left: 24, color: 'common.white', maxWidth: '70%' }}>
          <Typography variant={isMdUp ? 'h2' : 'h4'} component="h1" gutterBottom>
            {ach.title}
          </Typography>
          <Typography variant="h6">{ach.description}</Typography>
        </Box>
      </Box>

      {/* News-style Details */}
      <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
        {/* Dateline & Byline */}
        <Typography variant="subtitle2" color="text.secondary">
          {ach.dateline}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {ach.byline}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Lead Paragraph */}
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          {ach.lead}
        </Typography>

        {/* Pull-Quotes */}
        {ach.quotes?.map((q, i) => (
          <Box
            key={i}
            component="blockquote"
            sx={{
              borderLeft: '4px solid',
              borderColor: 'primary.main',
              pl: 2,
              my: 3,
            }}
          >
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {q.text}
            </Typography>
            <Typography variant="body2" color="text.secondary" align="right">
              {q.speaker}
            </Typography>
          </Box>
        ))}

        {/* Body Paragraphs */}
        <Stack spacing={2}>
          {ach.body.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <Typography variant="body1" paragraph>
                {p}
              </Typography>
            </motion.div>
          ))}
        </Stack>
      </Paper>

      {/* Image gallery */}
      {ach.images.length > 1 && (
        <>
          <Typography variant="h5" gutterBottom>
            Gallery
          </Typography>
          <ImageList variant="masonry" cols={isMdUp ? 2 : 1} gap={12} sx={{ mb: 6 }}>
            {ach.images.slice(1).map((src, i) => (
              <ImageListItem key={i}>
                <Box
                  component={motion.img}
                  whileHover={{ scale: 1.05 }}
                  src={src}
                  alt={`${ach.title} ${i + 2}`}
                  loading="lazy"
                  sx={{ width: '100%', borderRadius: 1, objectFit: 'cover' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </>
      )}

      {/* Back button */}
      <Box textAlign="center">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          variant="outlined"
        >
          Back
        </Button>
      </Box>
    </Container>
  );
}