// src/components/Involvement.jsx
import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { Box, Typography, Chip, Stack, IconButton, Button } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { AnimatePresence, motion } from 'framer-motion';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import Groups2RoundedIcon from '@mui/icons-material/Groups2Rounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import SectionFrame from './SectionFrame';

const AUTO_ADVANCE_MS = 4200;

const involvementData = [
  {
    id: 'nsa',
    label: 'Culture & Community',
    themeColor: '#A35A2D',
    icon: Diversity3RoundedIcon,
    role: 'Vice President, Cultural Affairs',
    title: 'Nepalese Student Association',
    summary:
      'Led cultural programming and community events that brought international and local students together around shared experiences.',
    story:
      'This role pushed me beyond engineering into event leadership, coordination, and community-building. I planned large cultural programs, aligned volunteers and partners, and created spaces where people could actually connect through music, food, and shared tradition.',
    images: ['/images/nsa_ulm_1.jpg', '/images/nsa_ulm_2.jpg'],
    highlights: [
      'Planned Dashain & Tihar Banquet and Nepali Night for a broad campus audience.',
      'Coordinated performers, vendors, volunteers, and campus partners across the full event cycle.',
      'Expanded cultural exchange through workshops, language moments, and student outreach.',
    ],
    focusAreas: ['Culture building', 'Event operations', 'Community outreach'],
    collaborators: ['Nepalese Student Association', 'Campus partners', 'Student volunteers'],
    ctaLabel: 'Community leadership',
  },
  {
    id: 'honors',
    label: 'Academics & Research',
    themeColor: '#6A7B54',
    icon: SchoolRoundedIcon,
    role: 'Honors Program Participant',
    title: 'Honors Program, ULM',
    summary:
      'Used the Honors program as a place to sharpen research habits, academic rigor, and leadership beyond the classroom.',
    story:
      'The Honors experience reinforced how I approach hard problems: stronger academic discipline, deeper research thinking, and more responsibility in presenting work clearly. It connected coursework, scholarship, service, and interdisciplinary exploration into a more complete foundation for product and AI work.',
    images: ['/images/honors_ulm.jpg', '/images/honors_ulm1.jpeg', '/images/honor-program-ulm.png'],
    highlights: [
      'Maintained a strong academic record while participating in advanced interdisciplinary coursework.',
      'Presented research and project work in academic settings tied to technology and social impact.',
      'Combined scholarship, service, and leadership into a more complete academic experience.',
    ],
    focusAreas: ['Academic rigor', 'Research communication', 'Leadership growth'],
    collaborators: ['ULM Honors Program', 'Faculty mentors', 'Research peers'],
    ctaLabel: 'Academic growth',
  },
];

const CommunityCanvas = styled('article', {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ theme, accentColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  borderRadius: 30,
  padding: theme.spacing(2.5),
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
    background: `linear-gradient(90deg, ${alpha(accentColor, 0.88)} 0%, ${alpha(
      accentColor,
      0.12
    )} 72%, transparent 100%)`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    right: -42,
    bottom: -48,
    width: 260,
    height: 260,
    borderRadius: '50%',
    background: alpha(accentColor, 0.08),
    filter: 'blur(40px)',
    zIndex: -1,
  },
}));

const StorySelector = styled('button', {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  width: '100%',
  textAlign: 'left',
  borderRadius: 22,
  padding: theme.spacing(1.6),
  border: `1px solid ${active ? alpha(accentColor, 0.22) : theme.palette.divider}`,
  background:
    active
      ? theme.palette.mode === 'dark'
        ? alpha(accentColor, 0.12)
        : alpha(accentColor, 0.08)
      : theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.74)
        : alpha(theme.palette.common.white, 0.72),
  cursor: 'pointer',
  appearance: 'none',
  transition: 'transform 180ms ease, border-color 180ms ease, background 180ms ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: alpha(accentColor, 0.16),
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha(accentColor, 0.22)}`,
  },
}));

const MediaStage = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ theme, accentColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  minHeight: 500,
  borderRadius: 28,
  border: `1px solid ${alpha(accentColor, 0.18)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.88)
      : alpha(theme.palette.common.white, 0.9),
  boxShadow: theme.shadows[1],
}));

const MediaImage = styled(motion.img)(() => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
}));

const MediaShade = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg, rgba(16,14,12,0.08) 0%, rgba(16,14,12,0.18) 46%, rgba(16,14,12,0.48) 100%)'
      : 'linear-gradient(180deg, rgba(29,23,18,0.02) 0%, rgba(29,23,18,0.08) 46%, rgba(29,23,18,0.24) 100%)',
}));

const MediaOverlay = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(1.8),
}));

const DetailPanel = styled(Box)(({ theme }) => ({
  borderRadius: 26,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.78)
      : alpha(theme.palette.common.white, 0.76),
  padding: theme.spacing(2.2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const NarrativeCard = styled(Box)(({ theme }) => ({
  borderRadius: 22,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.primary.main, 0.03),
  padding: theme.spacing(1.5, 1.6),
}));

const HighlightRow = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '12px 1fr',
  gap: theme.spacing(1.1),
  alignItems: 'start',
  borderRadius: 18,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.common.white, 0.62),
  padding: theme.spacing(1.15, 1.2),
}));

const ThumbButton = styled('button', {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  width: 84,
  height: 64,
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

const AccentDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ accentColor }) => ({
  width: 10,
  height: 10,
  borderRadius: '50%',
  backgroundColor: accentColor,
  marginTop: 6,
}));

const InvolvementSection = forwardRef((_, ref) => {
  const [activeId, setActiveId] = useState(involvementData[0]?.id || '');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeStory = useMemo(
    () => involvementData.find((entry) => entry.id === activeId) || involvementData[0],
    [activeId]
  );

  const totalImages = activeStory.images?.length || 0;
  const currentImage = totalImages ? activeStory.images[activeImageIndex % totalImages] : null;
  const ActiveIcon = activeStory.icon || Groups2RoundedIcon;

  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeId]);

  useEffect(() => {
    if (totalImages <= 1) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveImageIndex((prev) => (prev + 1) % totalImages);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(intervalId);
  }, [activeId, totalImages]);

  const handlePrevImage = () => {
    if (!totalImages) return;
    setActiveImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleNextImage = () => {
    if (!totalImages) return;
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  };

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Community"
      title="Involvement"
      subtitle="Leadership, academic communities, and campus work that shaped how I collaborate beyond shipping software."
      contentSx={{ p: { xs: 1, sm: 2 }, pt: { xs: 2, md: 3 } }}
    >
      <Stack spacing={3} sx={{ maxWidth: 1220, mx: 'auto' }}>
        <Stack
          direction={{ xs: 'column', lg: 'row' }}
          spacing={1.5}
          alignItems={{ xs: 'flex-start', lg: 'center' }}
          justifyContent="space-between"
        >
          <Stack spacing={0.5}>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              Community canvas
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Switch between leadership stories to see how the visuals, tone, and narrative change with each role.
            </Typography>
          </Stack>

          <Chip
            icon={<Groups2RoundedIcon sx={{ fontSize: 16 }} />}
            label={`${involvementData.length} active stories`}
            size="small"
            variant="outlined"
          />
        </Stack>

        <CommunityCanvas accentColor={activeStory.themeColor}>
          <Stack spacing={2}>
            <Box
              sx={{
                display: 'grid',
                gap: 1.25,
                gridTemplateColumns: { xs: '1fr', md: `repeat(${involvementData.length}, minmax(0, 1fr))` },
              }}
            >
              {involvementData.map((entry) => {
                const Icon = entry.icon || Groups2RoundedIcon;
                const isActive = entry.id === activeStory.id;

                return (
                  <StorySelector
                    key={entry.id}
                    type="button"
                    active={isActive}
                    accentColor={entry.themeColor}
                    aria-pressed={isActive}
                    onClick={() => setActiveId(entry.id)}
                  >
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Icon sx={{ fontSize: 18, color: entry.themeColor }} />
                          <Typography
                            variant="caption"
                            sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                          >
                            {entry.label}
                          </Typography>
                        </Stack>
                        {isActive ? (
                          <Chip
                            icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />}
                            label="Active"
                            size="small"
                            variant="outlined"
                            sx={{
                              bgcolor: alpha(entry.themeColor, 0.08),
                              borderColor: alpha(entry.themeColor, 0.18),
                            }}
                          />
                        ) : null}
                      </Stack>

                      <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.16 }}>
                        {entry.title}
                      </Typography>

                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
                        {entry.summary}
                      </Typography>
                    </Stack>
                  </StorySelector>
                );
              })}
            </Box>

            <Box
              sx={{
                display: 'grid',
                gap: 2,
                alignItems: 'start',
                gridTemplateColumns: { xs: '1fr', xl: 'minmax(0, 1.12fr) minmax(320px, 0.88fr)' },
              }}
            >
              <Stack spacing={1.5}>
                <MediaStage accentColor={activeStory.themeColor}>
                  <AnimatePresence mode="wait">
                    {currentImage ? (
                      <MediaImage
                        key={currentImage}
                        src={currentImage}
                        alt={`${activeStory.title} ${activeImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.22 }}
                      />
                    ) : null}
                  </AnimatePresence>
                  <MediaShade />
                  <MediaOverlay>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                      <Chip
                        label={activeStory.ctaLabel}
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
                            aria-label="Previous involvement image"
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
                            aria-label="Next involvement image"
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
                      <Typography
                        variant="h4"
                        sx={{ color: '#fff', fontWeight: 900, lineHeight: 1.02, maxWidth: 420 }}
                      >
                        {activeStory.title}
                      </Typography>
                      <Typography sx={{ color: alpha('#fff', 0.88), maxWidth: 480, lineHeight: 1.7 }}>
                        {activeStory.role}
                      </Typography>
                      {totalImages > 1 ? (
                        <Chip
                          label={`${String(activeImageIndex + 1).padStart(2, '0')} / ${String(totalImages).padStart(2, '0')}`}
                          size="small"
                          variant="outlined"
                          sx={{
                            bgcolor: alpha('#fff', 0.82),
                            color: 'text.primary',
                            borderColor: alpha('#fff', 0.24),
                            fontWeight: 700,
                            width: 'fit-content',
                          }}
                        />
                      ) : null}
                    </Stack>
                  </MediaOverlay>
                </MediaStage>

                {totalImages > 1 ? (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {activeStory.images.map((image, idx) => (
                      <ThumbButton
                        key={`${activeStory.id}-${idx}`}
                        type="button"
                        onClick={() => setActiveImageIndex(idx)}
                        active={activeImageIndex === idx}
                        accentColor={activeStory.themeColor}
                      >
                        <img src={image} alt={`${activeStory.title} thumbnail ${idx + 1}`} />
                      </ThumbButton>
                    ))}
                  </Stack>
                ) : null}
              </Stack>

              <DetailPanel>
                <Stack spacing={1.1}>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1}
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    justifyContent="space-between"
                  >
                    <Chip
                      icon={<ActiveIcon fontSize="small" />}
                      label={activeStory.label}
                      size="small"
                      variant="outlined"
                      sx={{
                        bgcolor: alpha(activeStory.themeColor, 0.08),
                        color: activeStory.themeColor,
                        borderColor: alpha(activeStory.themeColor, 0.2),
                      }}
                    />
                    <Chip
                      icon={<AutoAwesomeRoundedIcon sx={{ fontSize: 14 }} />}
                      label="Interactive story"
                      size="small"
                      variant="outlined"
                    />
                  </Stack>

                  <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1.08 }}>
                    {activeStory.title}
                  </Typography>

                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.78 }}>
                    {activeStory.summary}
                  </Typography>
                </Stack>

                <NarrativeCard>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                  >
                    What it shaped
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, lineHeight: 1.76 }}>
                    {activeStory.story}
                  </Typography>
                </NarrativeCard>

                <Stack spacing={1}>
                  {activeStory.highlights.map((item) => (
                    <HighlightRow key={`${activeStory.id}-${item}`}>
                      <AccentDot accentColor={activeStory.themeColor} />
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.72 }}>
                        {item}
                      </Typography>
                    </HighlightRow>
                  ))}
                </Stack>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                  >
                    Focus areas
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                    {activeStory.focusAreas.map((item) => (
                      <Chip
                        key={`${activeStory.id}-${item}`}
                        label={item}
                        size="small"
                        variant="outlined"
                        sx={{
                          bgcolor: alpha(activeStory.themeColor, 0.05),
                          borderColor: alpha(activeStory.themeColor, 0.14),
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary', letterSpacing: 0.7, textTransform: 'uppercase' }}
                  >
                    Collaborators
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 1 }}>
                    {activeStory.collaborators.map((item) => (
                      <Chip
                        key={`${activeStory.id}-${item}`}
                        label={item}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>

                <Button
                  variant="text"
                  endIcon={<ArrowOutwardRoundedIcon />}
                  sx={{ width: 'fit-content', px: 0 }}
                >
                  Community story
                </Button>
              </DetailPanel>
            </Box>
          </Stack>
        </CommunityCanvas>
      </Stack>
    </SectionFrame>
  );
});

export default InvolvementSection;
