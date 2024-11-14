// src/components/ExperienceAccordion.js

import React, { useState,forwardRef } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { styled,useTheme,keyframes } from '@mui/material/styles';
import experiences from './Experience';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: '#fff',
  borderRadius: '8px',
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',

}));
const ShinyText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  textFillColor: 'transparent',
  backgroundSize: '200% auto',
  display: 'inline-block',
  letterSpacing: '0.05em',
  animation: `shine 3s linear infinite`,
}));
const shine = keyframes`
  0% { background-position: 0% }
  100% { background-position: 200% }
`;


const ExperienceAccordion = forwardRef((props, ref) => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLearnMore = (experienceId) => {
    navigate(`/experience/${experienceId}`);
  };

  return (
    <Box ref={ref} sx={{ padding: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ShinyText variant="h3">Experience</ShinyText>
      </Box>

      {experiences.map((exp) => (
        <StyledAccordion
          key={exp.id}
          expanded={expanded === `panel${exp.id}`}
          onChange={handleChange(`panel${exp.id}`)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${exp.id}bh-content`}
            id={`panel${exp.id}bh-header`}
          >
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <Avatar src={exp.logo} alt={exp.company} sx={{ width: 50, height: 50, mr: 2 }} />
              <Box>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: theme.palette.text.secondary }}>{exp.title}</Typography>
                <Typography sx={{color:theme.palette.text.primary}}>{exp.company}</Typography>
              </Box>
            </Box>
            <Typography sx={{ color: theme.palette.text.primary, fontSize: '1rem' }}>{exp.year}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {exp.content.map((item, idx) => (
                <ListItem key={idx}>
                  <ListItemIcon>
                    <CheckCircleOutlineIcon sx={{color: theme.palette.text.primary}} />
                  </ListItemIcon>
                  <ListItemText primary={item} sx={{color: theme.palette.text.primary}} />
                </ListItem>
              ))}
            </List>
            <Box sx={{ textAlign: 'right', mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleLearnMore(exp.id)}
              >
                Learn More
              </Button>
            </Box>
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </Box>
  );
});

export default ExperienceAccordion;
