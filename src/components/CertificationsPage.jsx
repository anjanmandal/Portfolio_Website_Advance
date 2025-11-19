import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import CertificationsSection from './Certifications';

export default function CertificationsPage() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: theme.palette.background.gradient,
        pt: { xs: 6, md: 8 },
        pb: { xs: 5, md: 7 },
      }}
    >
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => navigate(-1)}
          sx={{
            mb: 3,
            color: theme.palette.primary.main,
            borderColor: alpha(theme.palette.primary.main, 0.2),
          }}
        >
          Back
        </Button>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
          Certifications Library
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          A deeper look at the credentials and learning tracks guiding my work across system design,
          secure infrastructure, and AI/ML delivery.
        </Typography>
      </Container>
      <CertificationsSection />
    </Box>
  );
}
