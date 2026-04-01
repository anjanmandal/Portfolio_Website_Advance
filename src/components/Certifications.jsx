// src/components/Certifications.jsx

import React, { forwardRef, useState } from 'react';
import {
  Box,
  Grid,
  Stack,
  Typography,
  Chip,
  Card,
  Button,
  Divider,
} from '@mui/material';
import { alpha, styled, useTheme } from '@mui/material/styles';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import SecurityIcon from '@mui/icons-material/Security';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LaunchIcon from '@mui/icons-material/Launch';
import SectionFrame from './SectionFrame';

export const certifications = [
  {
    title: 'AWS Certified AI Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    year: 'Issued Nov 2025 · Expires Nov 2028',
    track: 'AI & Cloud',
    focus: ['GenAI', 'Applied ML', 'AWS'],
    link: '#',
    icon: <AutoAwesomeIcon fontSize="small" />,
  },
  {
    title: 'ICPC NA South Division 1 Gold Medalist (LSU)',
    issuer: 'ICPC · International Collegiate Programming Contest',
    year: 'Issued Nov 2025',
    track: 'Competition',
    focus: ['Algorithms', 'Team strategy', 'Problem solving'],
    link: '#',
    icon: <WorkspacePremiumIcon fontSize="small" />,
  },
  {
    title: 'Leadership Development',
    issuer: 'University of Louisiana Monroe',
    year: 'Issued Aug 2025',
    track: 'Leadership',
    focus: ['Leadership', 'Communication', 'Mentorship'],
    link: '#',
    icon: <WorkspacePremiumIcon fontSize="small" />,
  },
  {
    title: 'Research, Scholarship, and Creative Work',
    issuer: 'University of Louisiana Monroe',
    year: 'Issued Aug 2025',
    track: 'Leadership',
    focus: ['Research', 'Scholarship', 'Creative projects'],
    link: '#',
    icon: <WorkspacePremiumIcon fontSize="small" />,
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    year: 'Issued Dec 2024 · Expires Dec 2027',
    track: 'AI & Cloud',
    focus: ['Cloud fundamentals', 'Security', 'Cost optimization'],
    link: '#',
    icon: <AutoAwesomeIcon fontSize="small" />,
  },
  {
    title: 'Ethical Hacking Essentials',
    issuer: 'EC-Council',
    year: 'Issued Dec 2024 · Expires Dec 2025',
    track: 'Security',
    focus: ['Network defense', 'Vulnerability basics', 'Security fundamentals'],
    link: '#',
    icon: <SecurityIcon fontSize="small" />,
  },
  {
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google',
    year: 'Credential ID 9HHS95E3L3U5',
    track: 'Security',
    focus: ['SOC practices', 'Threat detection', 'Incident response'],
    link: '#',
    icon: <SecurityIcon fontSize="small" />,
  },
];

const highlight = {
  headline: 'Credential highlights',
  description:
    'Recent certifications spanning cloud, security, AI/ML, and competitive programming—complementing experience elsewhere on the site without repeating it.',
  bullets: [
    'GenAI & cloud: AWS AI Practitioner, AWS Cloud Practitioner',
    'Security: Google Cybersecurity, EC-Council Ethical Hacking Essentials',
    'Achievement: ICPC NA South Division 1 Gold; ULM leadership & research honors',
  ],
};

const CardSurface = styled(Card)(({ theme }) => ({
  borderRadius: 28,
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.8),
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(18px)',
}));

const Pill = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  borderColor: alpha(theme.palette.primary.main, 0.2),
}));

const PageHero = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.6,
  padding: theme.spacing(3, 3.25),
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.88)
      : alpha(theme.palette.common.white, 0.84),
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(16px)',
}));

const PagePanel = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.6,
  padding: theme.spacing(2.5),
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.82),
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(16px)',
}));

const FilterChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  borderColor: active ? alpha(theme.palette.primary.main, 0.28) : theme.palette.divider,
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.16)
      : alpha(theme.palette.primary.main, 0.08)
    : theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.common.white, 0.72),
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  cursor: 'pointer',
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.22),
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, active ? 0.18 : 0.08)
        : alpha(theme.palette.primary.main, active ? 0.1 : 0.05),
  },
}));

const CredentialCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 1.6,
  padding: theme.spacing(2.4),
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.84),
  boxShadow: theme.shadows[1],
  transition: 'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    borderColor: alpha(theme.palette.primary.main, 0.18),
    boxShadow: theme.shadows[2],
  },
}));

const TrackBadge = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.8),
  padding: theme.spacing(0.5, 0.95),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.14)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.1)
      : alpha(theme.palette.primary.main, 0.06),
}));

const SummaryStat = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1.25, 1.4),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.common.white, 0.72),
}));

const CertificationsSection = forwardRef(({ variant = 'section' }, ref) => {
  const theme = useTheme();
  const [activeTrack, setActiveTrack] = useState('All');

  const trackOptions = ['All', 'AI & Cloud', 'Security', 'Leadership', 'Competition'];
  const filteredCertifications =
    activeTrack === 'All'
      ? certifications
      : certifications.filter((cert) => cert.track === activeTrack);

  if (variant === 'page') {
    const linkReadyCount = certifications.filter((cert) => cert.link && cert.link !== '#').length;

    return (
      <Stack ref={ref} spacing={3.25}>
        <PageHero>
          <Stack spacing={1.5}>
            <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
              Certifications
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 850, maxWidth: 980 }}>
              Credentials across AI, cloud, security, leadership, and competitive problem solving.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 860 }}>
              This page collects the certifications and academic recognitions that reinforce my
              work in secure backend systems, AI/ML delivery, and production engineering.
            </Typography>
          </Stack>
        </PageHero>

        <Grid container spacing={3} alignItems="start">
          <Grid size={{ xs: 12, lg: 4 }}>
            <PagePanel sx={{ position: { lg: 'sticky' }, top: { lg: 112 } }}>
              <Stack spacing={2}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Credential summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  A sharper view of the areas I keep investing in: AI/cloud foundations, security,
                  leadership, and competitive problem solving.
                </Typography>
                <Stack spacing={1.15}>
                  <SummaryStat>
                    <Typography variant="caption" color="text.secondary">
                      Total credentials
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {certifications.length}
                    </Typography>
                  </SummaryStat>
                  <SummaryStat>
                    <Typography variant="caption" color="text.secondary">
                      Tracks covered
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      4
                    </Typography>
                  </SummaryStat>
                  <SummaryStat>
                    <Typography variant="caption" color="text.secondary">
                      Public links ready
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {linkReadyCount}
                    </Typography>
                  </SummaryStat>
                </Stack>
                <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.08) }} />
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  {trackOptions.map((track) => (
                    <FilterChip
                      key={track}
                      label={track}
                      active={activeTrack === track}
                      onClick={() => setActiveTrack(track)}
                      variant="outlined"
                    />
                  ))}
                </Stack>
              </Stack>
            </PagePanel>
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={2}>
              {filteredCertifications.map((cert) => {
                const hasLink = cert.link && cert.link !== '#';

                return (
                  <CredentialCard key={cert.title} elevation={0}>
                    <Stack spacing={2}>
                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        justifyContent="space-between"
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                      >
                        <Stack direction="row" spacing={1.5} alignItems="center">
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: theme.shape.borderRadius,
                              display: 'grid',
                              placeItems: 'center',
                              background: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                              flexShrink: 0,
                            }}
                          >
                            {cert.icon}
                          </Box>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>
                              {cert.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {cert.issuer}
                            </Typography>
                          </Box>
                        </Stack>

                        <TrackBadge>
                          <Box
                            sx={{
                              width: 7,
                              height: 7,
                              borderRadius: '50%',
                              bgcolor: 'primary.main',
                            }}
                          />
                          <Typography variant="caption" color="text.secondary">
                            {cert.track}
                          </Typography>
                        </TrackBadge>
                      </Stack>

                      <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 0.6, sm: 1.6 }}
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {cert.year}
                        </Typography>
                      </Stack>

                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {cert.focus.map((pill) => (
                          <Pill key={pill} label={pill} variant="outlined" size="small" />
                        ))}
                      </Stack>

                      <Divider sx={{ borderColor: alpha(theme.palette.primary.main, 0.08) }} />

                      <Button
                        variant="outlined"
                        size="small"
                        endIcon={<LaunchIcon />}
                        sx={{
                          alignSelf: 'flex-start',
                          borderRadius: theme.shape.borderRadius,
                        }}
                        href={hasLink ? cert.link : undefined}
                        target={hasLink ? '_blank' : undefined}
                        rel={hasLink ? 'noreferrer' : undefined}
                        disabled={!hasLink}
                      >
                        {hasLink ? 'View credential' : 'Link coming soon'}
                      </Button>
                    </Stack>
                  </CredentialCard>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Stack>
    );
  }

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Credentials"
      title="Certifications"
      subtitle="Industry credentials that back my focus on secure, production-grade AI and full-stack systems."
      contentSpacing={4}
    >
      <CardSurface>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2}>
              <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
                {highlight.headline}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Cloud · Security · AI Credential Stack
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {highlight.description}
              </Typography>
              <Stack spacing={1}>
                {highlight.bullets.map((item) => (
                  <Stack direction="row" spacing={1} alignItems="center" key={item}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: theme.palette.primary.main,
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {item}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              {certifications.map((cert) => (
                <Box
                  key={cert.title}
                  sx={{
                    borderRadius: 20,
                    padding: theme.spacing(2.5),
                    border: `1px solid ${theme.palette.divider}`,
                    background:
                      theme.palette.mode === 'dark'
                        ? alpha(theme.palette.common.white, 0.04)
                        : alpha(theme.palette.common.white, 0.7),
                    boxShadow: 'none',
                  }}
                >
                  <Stack spacing={1.25}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Box
                        sx={{
                          width: 28,
                          height: 28,
                          borderRadius: '8%',
                          display: 'grid',
                          placeItems: 'center',
                          background: alpha(theme.palette.primary.main, 0.12),
                          color: theme.palette.primary.main,
                        }}
                      >
                        {cert.icon}
                      </Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>
                        {cert.title}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={{ xs: 0.4, sm: 1.5 }}
                      alignItems={{ xs: 'flex-start', sm: 'center' }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        {cert.issuer}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {cert.year}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={2}>
                    {cert.focus.map((pill) => (
                      <Pill key={pill} label={pill} variant="outlined" size="small" />
                    ))}
                  </Stack>
                  <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.08) }} />
                  <Button
                    variant="outlined"
                    size="small"
                    endIcon={<LaunchIcon />}
                    sx={{ alignSelf: 'flex-start' }}
                    href={cert.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View credential
                  </Button>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </CardSurface>
    </SectionFrame>
  );
});

CertificationsSection.displayName = 'CertificationsSection';

export default CertificationsSection;
