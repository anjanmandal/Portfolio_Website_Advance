// src/components/Certifications.jsx

import React, { forwardRef } from 'react';
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

const certifications = [
  {
    title: 'AWS Certified Solutions Architect – Associate',
    issuer: 'Amazon Web Services',
    year: '2024',
    focus: ['VPC design', 'Serverless', 'Cost optimization'],
    link: '#',
    icon: <WorkspacePremiumIcon fontSize="small" />,
  },
  {
    title: 'Google Cybersecurity Professional Certificate',
    issuer: 'Google / Coursera',
    year: '2024',
    focus: ['Threat modeling', 'SIEM', 'Incident response'],
    link: '#',
    icon: <SecurityIcon fontSize="small" />,
  },
  {
    title: 'Microsoft Azure AI Engineer Associate',
    issuer: 'Microsoft',
    year: '2023',
    focus: ['Applied ML', 'Responsible AI', 'LLM orchestration'],
    link: '#',
    icon: <AutoAwesomeIcon fontSize="small" />,
  },
];

const highlight = {
  headline: 'Most recent',
  description:
    '“Autism Speaks AI” co-founder track blends human-centered ML with security-first DevOps across multi-cloud.',
  bullets: [
    'Project management & SDLC leadership',
    'Secure infrastructure & policy',
    'AI/ML experimentation with guardrails',
  ],
};

const CardSurface = styled(Card)(({ theme }) => ({
  borderRadius: 28,
  padding: theme.spacing(3),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(5,12,32,0.95), rgba(9,16,38,0.85))'
      : 'linear-gradient(135deg, rgba(249,251,255,0.95), rgba(231,237,255,0.9))',
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 30px 80px rgba(2,6,23,0.65)'
      : '0 25px 65px rgba(15,23,42,0.12)',
}));

const Pill = styled(Chip)(({ theme }) => ({
  borderRadius: 999,
  borderColor: alpha(theme.palette.primary.main, 0.2),
}));

const CertificationsSection = forwardRef((_, ref) => {
  const theme = useTheme();

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
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <Typography variant="overline" sx={{ letterSpacing: 2, color: 'text.secondary' }}>
                {highlight.headline}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Lead Software Engineering Intern & Co-founder, Autism Speaks AI
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
                        boxShadow: `0 0 12px ${alpha(theme.palette.primary.main, 0.6)}`,
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
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              {certifications.map((cert) => (
                <Box
                  key={cert.title}
                  sx={{
                    borderRadius: 24,
                    padding: theme.spacing(2.5),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    background:
                      theme.palette.mode === 'dark'
                        ? alpha(theme.palette.background.paper, 0.6)
                        : alpha(theme.palette.background.paper, 0.9),
                  }}
                >
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="space-between"
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                  >
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {cert.icon}
                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                          {cert.title}
                        </Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        {cert.issuer}
                      </Typography>
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {cert.year}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={2}>
                    {cert.focus.map((pill) => (
                      <Pill key={pill} label={pill} variant="outlined" size="small" />
                    ))}
                  </Stack>
                  <Divider sx={{ my: 2, borderColor: alpha(theme.palette.primary.main, 0.1) }} />
                  <Button
                    variant="text"
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
