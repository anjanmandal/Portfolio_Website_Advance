// src/components/ExperienceTimeline.js

import React, { forwardRef, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Card
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled, useTheme, keyframes } from '@mui/material/styles';
import experiences from './Experience';

const shine = keyframes`
  0% { background-position: 0% }
  100% { background-position: 200% }
`;

const ShinyText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  backgroundSize: '200% auto',
  display: 'inline-block',
  letterSpacing: '0.05em',
  animation: `${shine} 3s linear infinite`,
}));

const ExperienceTimeline = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLearnMore = (id) => {
    navigate(`/experience/${id}`);
  };

  return (
    <Box ref={ref} sx={{ p: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ShinyText variant="h3">Experience</ShinyText>
      </Box>

      <Timeline position="alternate">
        {experiences.map((exp, idx) => (
          <TimelineItem key={exp.id}>
            {/* Left side: year */}
            <TimelineOppositeContent sx={{ m: 'auto 0' }}>
              <Typography variant="body2" color="textSecondary">
                {exp.year}
              </Typography>
            </TimelineOppositeContent>

            {/* Connector + Dot with Avatar */}
            <TimelineSeparator>
              <TimelineDot sx={{ bgcolor: theme.palette.background.paper }}>
                <Avatar
                  src={exp.logo}
                  alt={exp.company}
                  sx={{ width: 40, height: 40 }}
                />
              </TimelineDot>
              {idx < experiences.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            {/* Right side: content */}
            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Card
                elevation={3}
                variant="outlined"
                sx={{
                  p: 2,
                  color: theme.palette.text.primary,
                }}
              >
                <Typography variant="h6" component="h1">
                  {exp.title}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {exp.company}
                </Typography>

                <List dense>
                  {exp.content.map((bullet, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={bullet} />
                    </ListItem>
                  ))}
                </List>

                <Box sx={{ textAlign: 'right', mt: 1 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleLearnMore(exp.id)}
                  >
                    Learn More
                  </Button>
                </Box>
              </Card>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
});

export default ExperienceTimeline;
