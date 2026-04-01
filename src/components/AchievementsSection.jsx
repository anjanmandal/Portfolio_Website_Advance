// src/components/AchievementsSection.jsx

import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { Box, Typography, Button, Chip, Stack, IconButton } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PublicIcon from '@mui/icons-material/Public';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import { useNavigate } from 'react-router-dom';
import SectionFrame from './SectionFrame';

const SpotlightShell = styled('article', {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ theme, accentColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  borderRadius: 30,
  padding: theme.spacing(3),
  border: `1px solid ${alpha(accentColor, 0.18)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.82),
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(16px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${alpha(accentColor, 0.9)} 0%, ${alpha(
      accentColor,
      0.12
    )} 72%, transparent 100%)`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -32,
    right: -22,
    width: 220,
    height: 220,
    borderRadius: '50%',
    background: alpha(accentColor, 0.08),
    filter: 'blur(32px)',
    zIndex: -1,
  },
}));

const PreviewFrame = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ theme, accentColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  minHeight: 360,
  height: '100%',
  borderRadius: 28,
  border: `1px solid ${alpha(accentColor, 0.16)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.86),
  boxShadow: theme.shadows[1],
}));

const PreviewMedia = styled(motion.img)(() => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
}));

const PreviewShade = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(18, 15, 13, 0.04) 0%, rgba(18, 15, 13, 0.56) 100%)'
      : 'linear-gradient(180deg, rgba(29, 23, 18, 0.05) 0%, rgba(29, 23, 18, 0.3) 100%)',
}));

const PreviewOverlay = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(1.75),
}));

const MetaPill = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.8),
  width: 'fit-content',
  padding: theme.spacing(0.55, 1),
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.12)
      : alpha(theme.palette.primary.main, 0.06),
}));

const MetaDot = styled(Box)(({ theme }) => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
}));

const SnapshotCard = styled(Box)(({ theme }) => ({
  borderRadius: 22,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.primary.main, 0.03),
  padding: theme.spacing(1.6, 1.7),
}));

const SelectorGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1.5),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  },
}));

const SelectorCard = styled('button', {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  width: '100%',
  padding: theme.spacing(1.7),
  borderRadius: 22,
  border: `1px solid ${active ? alpha(accentColor, 0.24) : theme.palette.divider}`,
  background:
    active
      ? theme.palette.mode === 'dark'
        ? alpha(accentColor, 0.12)
        : alpha(accentColor, 0.08)
      : theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.72)
        : alpha(theme.palette.common.white, 0.74),
  textAlign: 'left',
  cursor: 'pointer',
  transition:
    'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease, background 180ms ease',
  boxShadow: active ? theme.shadows[1] : 'none',
  appearance: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: active
      ? `linear-gradient(90deg, ${alpha(accentColor, 0.88)} 0%, ${alpha(
          accentColor,
          0.12
        )} 68%, transparent 100%)`
      : 'transparent',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: alpha(accentColor, 0.18),
    boxShadow: theme.shadows[1],
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha(accentColor, 0.24)}`,
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 999,
  paddingInline: theme.spacing(1.8),
  fontWeight: 700,
}));

const ThumbButton = styled('button', {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  width: 72,
  height: 56,
  borderRadius: 16,
  overflow: 'hidden',
  border: `1px solid ${active ? alpha(accentColor, 0.24) : theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.7)
      : alpha(theme.palette.common.white, 0.76),
  padding: 0,
  cursor: 'pointer',
  boxShadow: active ? theme.shadows[1] : 'none',
  transition: 'transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  '&:hover': {
    transform: 'translateY(-1px)',
    borderColor: alpha(accentColor, 0.18),
  },
}));

const accentColors = ['#B85A2E', '#D46F3A', '#8F4524', '#74695E', '#F3AF7A', '#564D46'];
const AUTO_ADVANCE_MS = 4200;

const achievements = [
  {
    title: 'Pelican Cup Undergraduate Winner 2026',
    date: 'March 2026',
    location: 'Monroe, LA',
    category: 'Entrepreneurship',
    filters: ['Startup', 'Competition', 'AI'],
    tag: 'Startup win',
    icon: EmojiEventsIcon,
    description:
      'Social Bridge AI won first place and $25,000 in the undergraduate division at ULM’s 2026 Entrepreneurship Pelican Cup.',
    summary:
      'That win pushed the product, pitch, and research direction into a much stronger startup track with clear momentum behind the next build phase.',
    highlights: ['Social Bridge AI', 'Pelican Cup', '$25K award'],
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
    date: 'February 2025',
    location: 'Baton Rouge, LA',
    category: 'Competitive Programming',
    filters: ['Competition', 'Engineering'],
    tag: 'Division 1 gold',
    icon: EmojiEventsIcon,
    description:
      'Team Warhawks earned gold in Division 1 at the 2025 ICPC North America South Central Regional hosted by LSU.',
    summary:
      'The result reinforced ULM’s momentum in competitive programming and highlighted a stronger systems and algorithms foundation behind my engineering work.',
    highlights: ['Team Warhawks', 'ICPC', 'Division 1'],
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
    date: 'March 2025',
    location: 'Baton Rouge, LA',
    category: 'Innovation Challenge',
    filters: ['AI', 'Startup', 'Competition'],
    tag: 'Top 4 finalist',
    icon: RocketLaunchIcon,
    description:
      'Autism Speaks AI finished top 4 in the Nexus Technology Cup college track with an assistive AI coaching platform.',
    summary:
      'The project combined accessibility, product thinking, and rapid prototyping into a stronger public-facing AI-for-good pitch.',
    highlights: ['Autism Speaks AI', 'Nexus Cup', 'College track'],
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
    date: 'April 2025',
    location: 'Monroe, LA',
    category: 'Hackathon',
    filters: ['Hackathon', 'AI', 'Competition'],
    tag: 'Podium finish',
    icon: MilitaryTechIcon,
    description:
      'PixelPioneers reached the podium at Hawkathon 2025 with Autism Speak AI, an AI platform focused on neurodiversity support.',
    summary:
      'The build showed how fast product prototyping, accessibility thinking, and live demos can come together in a short sprint.',
    highlights: ['PixelPioneers', 'Hawkathon', 'Autism Speak AI'],
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
    date: 'April 2024',
    location: 'Monroe, LA',
    category: 'Hackathon',
    filters: ['Hackathon', 'Community', 'Competition'],
    tag: 'Runner-up',
    icon: MilitaryTechIcon,
    description:
      'DebugDynasty earned runner-up honors with FindIt, a Lost and Found platform built to reconnect communities with missing belongings.',
    summary:
      'That build was an early signal of product-oriented engineering: a tight problem, a fast prototype, and a community-focused use case.',
    highlights: ['DebugDynasty', 'FindIt', 'Community utility'],
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
    date: 'November 2024',
    location: 'Monroe, LA',
    category: 'Media Feature',
    filters: ['Feature', 'Career'],
    tag: 'Campus feature',
    icon: PublicIcon,
    description:
      'ULM Honors highlighted how internship and research work translated into production software and stronger engineering habits.',
    summary:
      'The feature connected campus work with real-world delivery, documentation, and adaptability across multiple stacks.',
    highlights: ['ULM Honors', 'SquarePlanIT', 'Career growth'],
    images: ['/images/honor-program-ulm.png'],
  },
  {
    title: 'Guest Speaker at ULM Career Fair',
    date: 'October 2024',
    location: 'Monroe, LA',
    category: 'Thought Leadership',
    filters: ['Speaking', 'Career', 'Community'],
    tag: 'Guest speaker',
    icon: RecordVoiceOverIcon,
    description:
      'I spoke at ULM’s CS and Cyber career networking event about internship lessons, secure delivery, and how to break into the industry.',
    summary:
      'The session blended practical engineering advice with mentorship and public speaking, reinforcing a stronger community role on campus.',
    highlights: ['Career fair', 'CS + Cyber', 'Mentorship'],
    images: [
      '/images/guest_speaker.jpg',
      '/images/guest_speaker3.jpg',
      '/images/guest_speaker4.jpg',
      '/images/guest_speaker5.jpg',
      '/images/guest_speaker2.jpg',
    ],
  },
];

const getYear = (value) => {
  const match = value.match(/\d{4}/);
  return match ? Number.parseInt(match[0], 10) : 0;
};

const sortedAchievements = [...achievements].sort((a, b) => getYear(b.date) - getYear(a.date));

const slugify = (title) => title.toLowerCase().replace(/[^\w]+/g, '-');

const AchievementsSection = forwardRef((_, ref) => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeAchievementTitle, setActiveAchievementTitle] = useState(
    sortedAchievements[0]?.title || ''
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const filters = useMemo(
    () => [
      'All',
      ...Array.from(new Set(sortedAchievements.flatMap((achievement) => achievement.filters || []))),
    ],
    []
  );

  const filteredAchievements = useMemo(() => {
    if (activeFilter === 'All') return sortedAchievements;
    return sortedAchievements.filter((achievement) =>
      (achievement.filters || []).includes(activeFilter)
    );
  }, [activeFilter]);

  useEffect(() => {
    if (!filteredAchievements.length) {
      setActiveAchievementTitle('');
      return;
    }

    if (!filteredAchievements.some((achievement) => achievement.title === activeAchievementTitle)) {
      setActiveAchievementTitle(filteredAchievements[0].title);
    }
  }, [activeAchievementTitle, filteredAchievements]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeAchievementTitle]);

  const activeAchievement =
    filteredAchievements.find((achievement) => achievement.title === activeAchievementTitle) ||
    filteredAchievements[0];

  if (!activeAchievement) {
    return null;
  }

  const activeIndex = sortedAchievements.findIndex(
    (achievement) => achievement.title === activeAchievement.title
  );
  const activeAccent = accentColors[(activeIndex >= 0 ? activeIndex : 0) % accentColors.length];
  const ActiveIcon = activeAchievement.icon || EmojiEventsIcon;
  const totalImages = activeAchievement.images?.length || 0;
  const currentImage = totalImages
    ? activeAchievement.images[activeImageIndex % totalImages]
    : null;

  const handlePrevImage = () => {
    if (!totalImages) return;
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNextImage = () => {
    if (!totalImages) return;
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  };

  useEffect(() => {
    if (totalImages <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % totalImages);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [totalImages, activeAchievement.title]);

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Wins & Milestones"
      title="Achievements"
      subtitle="A snapshot of the recent competitions, features, and speaking engagements shaping my journey."
      contentSx={{ p: { xs: 1, sm: 2 }, pt: { xs: 2, md: 3 } }}
    >
      <Stack spacing={3} sx={{ maxWidth: 1180, mx: 'auto' }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'flex-start', lg: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Browse by milestone type
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Filter the wins, then select a story to update the featured spotlight.
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {filters.map((filter) => (
              <Chip
                key={filter}
                icon={filter === 'All' ? <TuneRoundedIcon sx={{ fontSize: 16 }} /> : undefined}
                label={filter}
                clickable
                onClick={() => setActiveFilter(filter)}
                variant="outlined"
                sx={{
                  bgcolor:
                    activeFilter === filter
                      ? (theme) => alpha(theme.palette.primary.main, 0.08)
                      : 'transparent',
                  borderColor:
                    activeFilter === filter
                      ? (theme) => alpha(theme.palette.primary.main, 0.18)
                      : undefined,
                  color: activeFilter === filter ? 'text.primary' : 'text.secondary',
                }}
              />
            ))}
          </Stack>
        </Stack>

        <SpotlightShell accentColor={activeAccent}>
          <Box
            sx={{
              display: 'grid',
              gap: 3,
              alignItems: 'stretch',
              gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) minmax(360px, 1fr)' },
            }}
          >
            <AnimatePresence mode="wait">
              <Box
                key={`${activeAchievement.title}-content`}
                component={motion.div}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                sx={{ minWidth: 0 }}
              >
                <Stack spacing={2.4}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.25}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent="space-between"
                  >
                    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                      <MetaPill>
                        <MetaDot />
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                        >
                          Featured milestone
                        </Typography>
                      </MetaPill>
                      <Chip
                        icon={<ActiveIcon fontSize="small" />}
                        label={activeAchievement.category}
                        size="small"
                        variant="outlined"
                        sx={{
                          bgcolor: alpha(activeAccent, 0.08),
                          color: activeAccent,
                          borderColor: alpha(activeAccent, 0.22),
                        }}
                      />
                    </Stack>

                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                    >
                      {activeAchievement.date} • {activeAchievement.location}
                    </Typography>
                  </Stack>

                  <Box sx={{ maxWidth: 700 }}>
                    <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1.08 }}>
                      {activeAchievement.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.72 }}>
                      {activeAchievement.description}
                    </Typography>
                  </Box>

                  <SnapshotCard>
                    <Typography
                      variant="caption"
                      sx={{ color: 'text.secondary', letterSpacing: 0.65, textTransform: 'uppercase' }}
                    >
                      Why it matters
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.9, lineHeight: 1.72 }}>
                      {activeAchievement.summary}
                    </Typography>
                  </SnapshotCard>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {activeAchievement.highlights.map((highlight) => (
                      <Chip
                        key={highlight}
                        label={highlight}
                        size="small"
                        variant="outlined"
                        sx={{
                          borderColor: alpha(activeAccent, 0.14),
                          bgcolor: alpha(activeAccent, 0.04),
                          color: 'text.primary',
                        }}
                      />
                    ))}
                  </Stack>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1.5}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent="space-between"
                  >
                    <Chip
                      icon={<StarsRoundedIcon sx={{ fontSize: 16 }} />}
                      label={`${filteredAchievements.length} visible milestones`}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: alpha(activeAccent, 0.16),
                        bgcolor: alpha(activeAccent, 0.06),
                        color: 'text.secondary',
                      }}
                    />

                    <ActionButton
                      variant="contained"
                      endIcon={<ArrowOutwardIcon />}
                      onClick={() =>
                        navigate(`/achievements/${slugify(activeAchievement.title)}`)
                      }
                    >
                      View full story
                    </ActionButton>
                  </Stack>
                </Stack>
              </Box>
            </AnimatePresence>

            <Stack spacing={1.5}>
              <PreviewFrame accentColor={activeAccent}>
                <AnimatePresence mode="wait">
                  {currentImage ? (
                    <PreviewMedia
                      key={currentImage}
                      src={currentImage}
                      alt={`${activeAchievement.title} preview ${activeImageIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.22 }}
                    />
                  ) : null}
                </AnimatePresence>
                <PreviewShade />
                <PreviewOverlay>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Chip
                      label={activeAchievement.tag}
                      size="small"
                      variant="outlined"
                      sx={{
                        bgcolor: alpha('#fff', 0.82),
                        color: 'text.primary',
                        borderColor: alpha('#fff', 0.24),
                      }}
                    />

                    {totalImages > 1 ? (
                      <Stack direction="row" spacing={0.75}>
                        <IconButton
                          size="small"
                          onClick={handlePrevImage}
                          sx={{
                            bgcolor: alpha('#fff', 0.82),
                            border: '1px solid rgba(255,255,255,0.24)',
                            '&:hover': { bgcolor: alpha('#fff', 0.92) },
                          }}
                        >
                          <ChevronLeftRoundedIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={handleNextImage}
                          sx={{
                            bgcolor: alpha('#fff', 0.82),
                            border: '1px solid rgba(255,255,255,0.24)',
                            '&:hover': { bgcolor: alpha('#fff', 0.92) },
                          }}
                        >
                          <ChevronRightRoundedIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    ) : (
                      <Chip
                        icon={<PhotoLibraryRoundedIcon sx={{ fontSize: 16 }} />}
                        label="Preview"
                        size="small"
                        variant="outlined"
                        sx={{
                          bgcolor: alpha('#fff', 0.82),
                          color: 'text.primary',
                          borderColor: alpha('#fff', 0.24),
                        }}
                      />
                    )}
                  </Stack>

                  <Stack spacing={1.1}>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, maxWidth: 360 }}>
                      {activeAchievement.description}
                    </Typography>

                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={1}
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      justifyContent="space-between"
                    >
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {activeAchievement.highlights.slice(0, 2).map((highlight) => (
                          <Chip
                            key={highlight}
                            label={highlight}
                            size="small"
                            variant="outlined"
                            sx={{
                              bgcolor: alpha('#fff', 0.82),
                              color: 'text.primary',
                              borderColor: alpha('#fff', 0.24),
                            }}
                          />
                        ))}
                      </Stack>

                      {totalImages > 1 ? (
                        <Typography
                          variant="caption"
                          sx={{ color: '#fff', fontWeight: 700, letterSpacing: 0.5 }}
                        >
                          {String(activeImageIndex + 1).padStart(2, '0')} /{' '}
                          {String(totalImages).padStart(2, '0')}
                        </Typography>
                      ) : null}
                    </Stack>
                  </Stack>
                </PreviewOverlay>
              </PreviewFrame>

              {totalImages > 1 ? (
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {activeAchievement.images.map((image, idx) => (
                    <ThumbButton
                      key={`${activeAchievement.title}-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      active={activeImageIndex === idx}
                      accentColor={activeAccent}
                    >
                      <img src={image} alt={`${activeAchievement.title} thumbnail ${idx + 1}`} />
                    </ThumbButton>
                  ))}
                </Stack>
              ) : null}
            </Stack>
          </Box>
        </SpotlightShell>

        <Box>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            sx={{ mb: 1.5 }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Select another milestone
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Click a story card to update the featured spotlight above.
            </Typography>
          </Stack>

          <SelectorGrid>
            {filteredAchievements.map((achievement) => {
              const accent =
                accentColors[
                  (sortedAchievements.findIndex((item) => item.title === achievement.title) +
                    accentColors.length) %
                    accentColors.length
                ];
              const IconComponent = achievement.icon || EmojiEventsIcon;
              const isActive = achievement.title === activeAchievement.title;

              return (
                <SelectorCard
                  key={achievement.title}
                  active={isActive}
                  accentColor={accent}
                  type="button"
                  onClick={() => setActiveAchievementTitle(achievement.title)}
                  aria-pressed={isActive}
                >
                  <Stack spacing={1.25}>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={1}
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                      justifyContent="space-between"
                    >
                      <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                        <Chip
                          icon={<IconComponent fontSize="small" />}
                          label={achievement.category}
                          size="small"
                          variant="outlined"
                          sx={{
                            bgcolor: alpha(accent, 0.08),
                            color: accent,
                            borderColor: alpha(accent, 0.22),
                          }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.secondary', letterSpacing: 0.65, textTransform: 'uppercase' }}
                        >
                          {achievement.date}
                        </Typography>
                      </Stack>

                      {isActive ? (
                        <Chip
                          label="Featured"
                          size="small"
                          variant="outlined"
                          sx={{
                            bgcolor: alpha(accent, 0.08),
                            color: 'text.primary',
                            borderColor: alpha(accent, 0.18),
                          }}
                        />
                      ) : null}
                    </Stack>

                    <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.24 }}>
                      {achievement.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.68,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {achievement.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {achievement.highlights.slice(0, 2).map((highlight) => (
                        <Chip
                          key={highlight}
                          label={highlight}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: alpha(accent, 0.14),
                            bgcolor: alpha(accent, 0.04),
                            color: 'text.secondary',
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </SelectorCard>
              );
            })}
          </SelectorGrid>
        </Box>
      </Stack>
    </SectionFrame>
  );
});

export default AchievementsSection;
