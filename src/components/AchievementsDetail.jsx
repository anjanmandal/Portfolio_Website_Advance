// src/components/AchievementsDetail.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Breadcrumbs,
  Link,
  useTheme,
  useMediaQuery,
  Stack,
  Divider,
  Chip,
  Grid,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';
import { alpha, styled } from '@mui/material/styles';
import MetricTile from './MetricTile';

/* ——— Story data enriched with tags/metrics/highlights ——— */
const achievements = [
  {
    title: 'Pelican Cup Undergraduate Winner 2026',
    dateline: 'Monroe, LA • March 26, 2026',
    byline: 'By Anjan Mandal',
    description:
      'Social Bridge AI won first place and $25,000 in the undergraduate division of ULM’s 2026 Entrepreneurship Pelican Cup.',
    lead:
      'Social Bridge AI, led by Anjan Mandal with teammates Roshani Pathak and Pradeep Poudel, captured first place in the undergraduate division at the 2026 Entrepreneurship Pelican Cup at ULM.',
    tags: ['Pelican Cup', 'Social Bridge AI', 'Entrepreneurship', 'Autism Support'],
    highlights: [
      'Won first place and a $25,000 prize in the new undergraduate division.',
      'Presented an AI roleplay platform that helps autistic users practice communication and social skills.',
      'Advanced through a 44-entry statewide competition spanning nine Louisiana schools.',
    ],
    metrics: [
      { label: 'Outcome', value: '1st Place' },
      { label: 'Prize', value: '$25,000' },
      { label: 'Team', value: 'Social Bridge AI' },
    ],
    body: [
      'The 2026 Entrepreneurship Pelican Cup introduced separate undergraduate and graduate divisions, making the competition larger and more selective than in prior years. From 44 entries across Louisiana, only 12 finalist teams advanced to the oral finals at ULM.',
      'Social Bridge AI stood out with a mission-driven platform that uses artificial intelligence and guided roleplay to help people on the autism spectrum strengthen communication and social confidence through practice-based support.',
      'Our final presentation combined product vision, customer need, and a practical business case for expanding autism support through accessible technology. That work earned Social Bridge AI first place in the undergraduate division and a $25,000 award.',
      'The win also created immediate momentum for the next build phase, alongside teammates Roshani Pathak and Pradeep Poudel and with faculty support from Dr. Prasanthi Sreekumari, while keeping the company rooted in Louisiana.',
    ],
    images: [
      '/images/pelican_cup.jpg',
      '/images/pelican_1.jpg',
      '/images/pelican_2.jpg',
      '/images/pelican_3.jpg',
      '/images/pelican_4.jpeg',
    ],
  },
  {
    title: 'ICPC NA South Division Gold Medalist 2025',
    dateline: 'Baton Rouge, LA • February 2025',
    byline: 'By Anjan Mandal',
    description:
      'Gold medal finish at LSU during the 2025 ICPC North America South Central Regional.',
    lead:
      'Team Warhawks from the University of Louisiana Monroe captured the gold medal in Division 1 at the 2025 ICPC North America South Central Regional hosted by LSU.',
    tags: ['ICPC', 'Gold Medal', 'Division 1', 'Team Warhawks'],
    highlights: [
      'Solved 9 of 12 Division 1 problems before the scoreboard freeze.',
      'Maintained zero incorrect submissions during the final stretch.',
      'Earned a berth to the 2025 ICPC North America Championship.',
    ],
    metrics: [
      { label: 'Outcome', value: 'Gold Medal' },
      { label: 'Division', value: 'NA South Central D1' },
      { label: 'Venue', value: 'LSU Baton Rouge' },
    ],
    quotes: [
      {
        text: '"Standing on the LSU arena floor as gold medalists proved that Warhawks ingenuity belongs on the ICPC stage."',
        speaker: '— Team Warhawks, ULM',
      },
    ],
    body: [
      'The Division 1 contest gathered powerhouse programs from across the South Central region, turning LSU\'s campus into a buzzing arena of algorithms, strategy, and relentless debugging.',
      'Warhawks teammates rotated seamlessly between coding, testing, and big-picture planning, keeping composure through the scoreboard freeze and locking in the top podium spot.',
      'The victory cements ULM\'s momentum heading toward the 2025 ICPC North America Championship and highlights the growing strength of competitive programming on campus.',
    ],
    images: [
      '/images/icpc-warhawks-1.jpeg',
      '/images/icpc-warhawks-2.jpeg',
      '/images/icpc-warhawks-3.jpeg',
      '/images/icpc-warhawks-4.jpeg',
      '/images/icpc-warhawks-5.jpeg',
    ],
  },
  {
    title: 'Nexus Technology Cup Finalist 2025',
    dateline: 'Baton Rouge, LA • March 15, 2025',
    byline: 'By Anjan Mandal',
    description:
      'Autism Speaks AI placed top-4 in the Nexus Technology Cup college track for its assistive coaching platform.',
    lead:
      'Autism Speaks AI earned a top-4 finalist position in the College Track at Nexus Technology Cup 2025, showcasing an AI-powered platform designed to support individuals on the autism spectrum with transitions and improved social communication skills.',
    tags: ['Nexus Cup', 'AI for Good', 'Autism Speaks AI'],
    highlights: [
      'Designed adaptive lesson plans rooted in speech therapy research.',
      'Delivered a clickable Figma-to-React prototype in under 48 hours.',
      'Won judges\' praise for deep community partnerships and inclusion.',
    ],
    metrics: [
      { label: 'Outcome', value: 'Top 4 Finalist' },
      { label: 'Focus', value: 'Autism Speaks AI' },
      { label: 'Track', value: 'College Division' },
    ],
    quotes: [
      {
        text: '"Placing among the top four at Nexus validated our mission of using technology for inclusion and empowerment."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'The project leverages cutting-edge AI to create an adaptive platform that delivers personalized learning and communication support for autistic individuals, fostering independence and confidence.',
      'Special recognition goes to Pradeep Poudel for his outstanding technical expertise and collaboration that helped bring Autism Speaks AI to life.',
      'The competition, organized by Nexus Louisiana at The Water Campus in Baton Rouge, brought together innovative teams from across the region to demonstrate how technology can drive meaningful social change.',
    ],
    images: [
      '/images/NexusTechCup_4081.JPG',
      '/images/NexusTechCup_660.JPG',
      '/images/NexusTechCup_3584.JPG',
      '/images/NexusTechCup_3596.JPG',
      '/images/NexusTechCup_3750.JPG',
    ],
  },
  {
    title: 'ULM Hawkathon Winner 2025',
    dateline: 'Monroe, LA • April 15, 2025',
    byline: 'By Anjan Mandal',
    description:
      'PixelPioneers earned a podium finish at Hawkathon 2025 with Autism Speak AI, a neurodiversity-focused mentor platform.',
    lead:
      'Team PixelPioneers secured third place at Hawkathon 2025 with Autism Speak AI, an AI-driven platform that enhances learning opportunities and improves communication skills for individuals on the autism spectrum.',
    tags: ['Hawkathon', 'PixelPioneers', 'Autism Speak AI'],
    highlights: [
      'Interviewed neurodivergent students and counselors before ideating.',
      'Built a React + Firebase MVP with personalized learning journeys.',
      'Presented a live demo that emphasized accessibility heuristics.',
    ],
    metrics: [
      { label: 'Outcome', value: '3rd Place' },
      { label: 'Team', value: 'PixelPioneers' },
      { label: 'Stack', value: 'React + Firebase' },
    ],
    quotes: [
      {
        text: '"This journey was a true testament to the creativity, commitment, and collaboration of our team."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'Our project leverages advanced AI to build an interactive learning platform designed to help people with autism overcome communication challenges through personalized, engaging experiences.',
      'Special thanks to Sabeen Gr for her incredible technical contributions and teamwork.',
      'We presented our work at an event organized by GDSC ULM and the ULM ACM Student Chapter, supported by Dinesh Chhantyal and many community partners, showcasing how technology can drive meaningful social change.',
    ],
    images: [
      '/images/hackathon_1_2025.jpeg',
      '/images/hackathon_2_2025.jpg',
      '/images/hackathon_3_2025.jpg',
      '/images/hackathon_4_2025.jpeg',
      '/images/hackathon_5_2025.jpeg',
    ],
  },
  {
    title: 'ULM Hawkathon Runner-up 2024',
    dateline: 'Monroe, LA • April 20, 2024',
    byline: 'By Anjan Mandal',
    description:
      'DebugDynasty\'s FindIt platform reunited lost items across campus to earn runner-up status at Hawkathon 2024.',
    lead:
      'Team DebugDynasty claimed runner-up honors at Hawkathon 2024 with "FindIt," a Lost & Found web app reconnecting communities with their missing belongings.',
    tags: ['Hawkathon', 'FindIt', 'DebugDynasty'],
    highlights: [
      'Implemented geotagged listings with realtime updates.',
      'Conducted hallway usability testing with 30+ students mid-sprint.',
      'Optimized responsive UI patterns for mobile-first adoption.',
    ],
    metrics: [
      { label: 'Outcome', value: 'Runner-up' },
      { label: 'Team', value: 'DebugDynasty' },
      { label: 'Stack', value: 'React + Firebase' },
    ],
    quotes: [
      {
        text: '"Tackling a real-world problem under a 24-hour deadline pushed our agile problem-solving skills to the limit."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'Composed of Aavash, Bipin, and Pradeep, we designed a user-friendly interface that lets people list lost items, browse found reports, and filter by category or location.',
      'Built with React on the front end and Firebase on the back end, "FindIt" synchronizes data in real time so community members see updates instantly.',
      'Under intense hackathon pressure, we completed three full design–build–test cycles, learning to prioritize features that delivered the highest impact.',
      'Our goal was simple but powerful: reduce the time and frustration of reunification, and bring tech-driven empathy back to local communities.',
    ],
    images: [
      '/images/wakathone.JPG',
      '/images/wakathone2.jpg',
      '/images/wakathone3.jpg',
      '/images/wakathone4.JPG',
      '/images/wakathone5.jpg',
    ],
  },
  {
    title: 'Featured on ULM Honors Site',
    dateline: 'Monroe, LA • November 12, 2024',
    byline: 'By Anjan Mandal',
    description:
      'ULM Honors spotlight captured how internships and research projects translated into production software at SquarePlanIT.',
    lead:
      'Mandal\'s internship at SquarePlanIT allowed him to explore every stage of the software lifecycle—from maintaining legacy systems to designing, testing, coding, and debugging new applications—bridging the gap between theory and real-world practice.',
    tags: ['ULM Honors', 'SquarePlanIT', 'Feature'],
    highlights: [
      'Chronicled a summer rotation that spanned .NET, PHP, and VB stack updates.',
      'Documented best practices to help onboarding interns ramp faster.',
      'Connected campus research work with enterprise security audits.',
    ],
    metrics: [
      { label: 'Focus', value: 'SquarePlanIT Internship' },
      { label: 'Medium', value: 'ULM Honors' },
      { label: 'Theme', value: 'Career Growth' },
    ],
    quotes: [
      {
        text: '"This experience not only enhanced my technical skills but also taught me the importance of adaptability and continuous learning in software development."',
        speaker: '— Anjan Mandal',
      },
      {
        text: '"Writing and maintaining documentation taught me how to communicate complex ideas clearly to both technical and non-technical audiences."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'He worked extensively with ASP.NET, PHP, and VB.NET, quickly mastering new languages to address client needs and even learning an entirely new language in just a few days to fix an urgent production issue.',
      'Beyond coding, Mandal honed project management and problem-solving skills by planning development sprints, coordinating with stakeholders, and prioritizing features under tight deadlines.',
      'He took ownership of end-to-end documentation—creating user guides, API specs, and troubleshooting manuals—which sharpened his ability to convey intricate workflows to diverse teams.',
      'Overall, the internship underscored the importance of lifelong learning and flexibility in adapting to evolving technologies and client requirements.',
    ],
    images: ['/images/honor-program-ulm.png'],
  },
  {
    title: 'Guest Speaker at ULM Career Fair',
    dateline: 'Monroe, LA • October 15, 2024',
    byline: 'By Anjan Mandal',
    description:
      'Invited speaker at ULM\'s CS & Cyber Career Networking Event to decode security internship takeaways for peers.',
    lead:
      'I was honored to speak at the University of Louisiana Monroe\'s Computer Science & Cyber Security Career Networking Event, where I shared insights from my Summer 2024 internship at SquarePlanIT and offered practical advice on breaking into the tech industry.',
    tags: ['Career Fair', 'Cybersecurity', 'Public Speaking'],
    highlights: [
      'Delivered a 30-minute session on secure SDLC, DevSecOps, and zero-trust culture.',
      'Hosted Q&A with recruiters and 100+ students directly after the talk.',
      'Mentored peers on resume storytelling, LinkedIn follow-ups, and networking.',
    ],
    metrics: [
      { label: 'Role', value: 'Guest Speaker' },
      { label: 'Audience', value: 'CS + Cyber Cohort' },
      { label: 'Focus', value: 'SquarePlanIT Internship' },
    ],
    quotes: [
      {
        text: '"It was a privilege to present my journey—from onboarding at SquarePlanIT to leading a security audit initiative—to eager CS and cybersecurity students."',
        speaker: '— Anjan Mandal',
      },
      {
        text: '"Networking with recruiters from top firms and hearing about their upcoming opportunities reinforced how vital soft skills are alongside technical expertise."',
        speaker: '— Anjan Mandal',
      },
      {
        text: '"A heartfelt thank you to Ms. Kellye Blackburn and Dr. Prasanthi SreeKumari for their unwavering support in organizing this event."',
        speaker: '— Anjan Mandal',
      },
    ],
    body: [
      'During my 30-minute presentation, I walked attendees through the lifecycle of a real-world project: scoping requirements, setting up CI/CD pipelines, and implementing best practices for secure coding.',
      'I highlighted key takeaways from my role as a cybersecurity analyst—how to conduct threat modeling, perform vulnerability scans, and integrate Static Application Security Testing (SAST) into a development workflow.',
      'After the talk, I joined a panel discussion on resume optimization, where I emphasized quantifying impact with metrics and tailoring applications to specific company needs.',
      'The networking session that followed gave students a chance to meet representatives from leading tech companies; I encouraged everyone to practice their elevator pitches and follow up on LinkedIn.',
      'Overall, the event fostered a collaborative environment for students, faculty, and industry professionals—reinforcing ULM\'s commitment to bridging academia and the rapidly evolving cybersecurity landscape.',
    ],
    images: [
      '/images/guest_speaker.jpg',
      '/images/guest_speaker3.jpg',
      '/images/guest_speaker4.jpg',
      '/images/guest_speaker5.jpg',
      '/images/guest_speaker2.jpg',
    ],
  },
];

const FloatingCard = styled(Paper)(({ theme }) => ({
  borderRadius: 24,
  padding: theme.spacing(4),
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.82),
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(18px)',
  transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[2],
    borderColor: alpha(theme.palette.primary.main, 0.18),
  },
}));

const QuoteCard = styled(Card)(({ theme }) => ({
  borderRadius: 5,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.74)
      : alpha(theme.palette.common.white, 0.88),
  border: `1px solid ${theme.palette.divider}`,
  borderLeft: `4px solid ${theme.palette.secondary.main}`,
  position: 'relative',
  overflow: 'hidden',
}));

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
    <Box sx={{ py: { xs: 6, md: 8 }, position: 'relative', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Modern Breadcrumb */}
        <Box mb={4}>
          <Breadcrumbs
            separator={<ArrowOutwardIcon sx={{ fontSize: 14, transform: 'rotate(-45deg)' }} />}
            sx={{ mb: 2 }}
          >
            <Link
              underline="hover"
              color="text.secondary"
              sx={{ 
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
                transition: 'color 200ms',
              }}
              onClick={() => navigate('/')}
            >
              Home
            </Link>
            <Link
              underline="hover"
              color="text.secondary"
              sx={{ 
                cursor: 'pointer',
                '&:hover': { color: 'primary.main' },
                transition: 'color 200ms',
              }}
              onClick={() => navigate('/#achievements')}
            >
              Achievements
            </Link>
            <Typography color="text.primary" sx={{ fontWeight: 600 }}>
              {ach.title}
            </Typography>
          </Breadcrumbs>
        </Box>

        <Grid container spacing={4}>
          {/* Left Column - Main Content */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={4}>
              {/* Hero Image with Modern Overlay */}
              <Box
                component={motion.div}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                sx={{
                  position: 'relative',
                  borderRadius: 5,
                  overflow: 'hidden',
                  height: { xs: 300, md: 500 },
                  border: `1px solid ${alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.08 : 0.36)}`,
                  boxShadow: theme.shadows[2],
                }}
              >
                <Box
                  component="img"
                  src={ach.images[0]}
                  alt={ach.title}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(to top, rgba(15,12,10,0.82) 0%, rgba(15,12,10,0.34) 54%, transparent 100%)'
                      : 'linear-gradient(to top, rgba(29,23,18,0.58) 0%, rgba(29,23,18,0.18) 50%, transparent 100%)',
                  }}
                />
                <Stack
                  spacing={2}
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    p: { xs: 3, md: 5 },
                    color: '#fff',
                  }}
                >
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Chip 
                      label={ach.dateline} 
                      size="small"
                      sx={{ 
                        bgcolor: alpha('#fff', 0.2),
                        color: '#fff',
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                    {ach.tags?.slice(0, 2).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: alpha('#fff', 0.5),
                          color: '#fff',
                          backdropFilter: 'blur(10px)',
                        }}
                      />
                    ))}
                  </Stack>
                  <Typography 
                    variant={isMdUp ? 'h2' : 'h3'} 
                    component="h1"
                    sx={{ 
                      fontWeight: 800,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    }}
                  >
                    {ach.title}
                  </Typography>
                </Stack>
              </Box>

              {/* Metrics - Modern Card Design */}
              {ach.metrics?.length > 0 && (
                <Grid container spacing={2}>
                  {ach.metrics.map((metric, idx) => (
                    <Grid size={{ xs: 12, sm: 4 }} key={`${metric.label}-${idx}`}>
                      <MetricTile
                        component={motion.div}
                        label={metric.label}
                        value={metric.value}
                        valueVariant="h4"
                        sx={{ height: '100%' }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}

              {/* Main Content Card */}
              <FloatingCard
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Stack spacing={4}>
                  {/* Header Info */}
                  <Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ mb: 2, fontWeight: 500 }}
                    >
                      {ach.dateline} • {ach.byline}
                    </Typography>
                    <Typography 
                      variant="h4"
                      sx={{ 
                        fontWeight: 700,
                        mb: 2,
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                        lineHeight: 1.3,
                      }}
                    >
                      {ach.lead}
                    </Typography>
                  </Box>

                  <Divider sx={{ borderColor: theme.palette.divider }} />

                  {/* Body Content */}
                  <Stack spacing={3}>
                    {ach.body.map((paragraph, idx) => (
                      <Typography 
                        variant="body1" 
                        key={idx}
                        sx={{ 
                          wordBreak: 'break-word',
                          overflowWrap: 'break-word',
                          lineHeight: 1.8,
                          fontSize: '1.05rem',
                          color: 'text.primary',
                        }}
                      >
                        {paragraph}
                      </Typography>
                    ))}
                  </Stack>

                  {/* Quotes Section */}
                  {ach.quotes?.length > 0 && (
                    <Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 3,
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 4,
                            height: 24,
                            borderRadius: 2,
                            bgcolor: 'primary.main',
                          }}
                        />
                        Insights
                      </Typography>
                      <Stack spacing={2}>
                        {ach.quotes.map((quote, idx) => (
                          <QuoteCard
                            key={idx}
                            component={motion.div}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + idx * 0.1 }}
                          >
                            <CardContent sx={{ p: 3 }}>
                              <Typography
                                variant="body1"
                                sx={{ 
                                  fontStyle: 'italic', 
                                  mb: 2,
                                  wordBreak: 'break-word',
                                  overflowWrap: 'break-word',
                                  lineHeight: 1.7,
                                  fontSize: '1.1rem',
                                  color: 'text.primary',
                                }}
                              >
                                {quote.text}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ 
                                  fontWeight: 600,
                                  wordBreak: 'break-word',
                                  overflowWrap: 'break-word',
                                }}
                              >
                                {quote.speaker}
                              </Typography>
                            </CardContent>
                          </QuoteCard>
                        ))}
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </FloatingCard>

              {/* Image Gallery */}
              {ach.images.length > 1 && (
                <Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3,
                      fontWeight: 700,
                    }}
                  >
                    Gallery
                  </Typography>
                  <Grid container spacing={2}>
                    {ach.images.slice(1).map((src, idx) => (
                      <Grid size={{ xs: 12, sm: 6 }} key={src}>
                        <Box
                          component={motion.div}
                          whileHover={{ scale: 1.02 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                          sx={{
                            borderRadius: 20,
                            overflow: 'hidden',
                            boxShadow: theme.shadows[4],
                            cursor: 'pointer',
                          }}
                        >
                          <Box
                            component="img"
                            src={src}
                            alt={`${ach.title} ${idx + 2}`}
                            loading="lazy"
                            sx={{
                              width: '100%',
                              height: 250,
                              objectFit: 'cover',
                              transition: 'transform 300ms',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              },
                            }}
                          />
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}
            </Stack>
          </Grid>

          {/* Right Column - Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack
              spacing={3}
              sx={{
                position: { lg: 'sticky' },
                top: { lg: 100 },
              }}
            >
              {/* Tags Card */}
              {ach.tags?.length > 0 && (
                <FloatingCard
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2,
                      fontWeight: 700,
                    }}
                  >
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {ach.tags.map((tag) => (
                      <Chip 
                        key={tag} 
                        label={tag} 
                        size="medium"
                        sx={{ 
                          mb: 1,
                          fontWeight: 500,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        }} 
                      />
                    ))}
                  </Stack>
                </FloatingCard>
              )}

              {/* Highlights Card */}
              {ach.highlights?.length > 0 && (
                <FloatingCard
                  component={motion.div}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3,
                      fontWeight: 700,
                    }}
                  >
                    Key Highlights
                  </Typography>
                  <Stack spacing={2}>
                    {ach.highlights.map((item, idx) => (
                      <Stack 
                        direction="row" 
                        spacing={2} 
                        key={idx} 
                        alignItems="flex-start"
                        sx={{ width: '100%' }}
                      >
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            mt: 0.5,
                          }}
                        >
                          <CheckCircleOutlineIcon
                            fontSize="small"
                            color="primary"
                          />
                        </Box>
                        <Typography 
                          variant="body2"
                          sx={{ 
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            lineHeight: 1.7,
                            flex: 1,
                            pt: 0.5,
                          }}
                        >
                          {item}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </FloatingCard>
              )}

            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
