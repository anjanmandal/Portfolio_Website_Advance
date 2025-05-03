// src/Components/AppAppBar.jsx

import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MyLogo from './MyLogo';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function AppAppBar({ sections }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // Function to handle smooth scrolling
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
      // Optionally, close the drawer after clicking
      setOpen(false);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: 2 }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          {/* Navigation Buttons for Desktop */}
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button variant="text" color="info" size="small" onClick={() => scrollToSection(sections.about)}>
                About
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => scrollToSection(sections.education)}>
                Education
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => scrollToSection(sections.skills)}>
                Skills
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => scrollToSection(sections.experience)}>
                Experience
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => scrollToSection(sections.projects)}>
                Projects
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => scrollToSection(sections.achievements)}>
                Achievements
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => scrollToSection(sections.involvements)}>
                Involvements
              </Button>
              <Button variant="text" color="info" size="small" onClick={() => scrollToSection(sections.contact)}>
                Contact
              </Button>
            </Box>
          </Box>

          {/* Logo */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <MyLogo />
          </Box>

          {/* Hamburger Menu for Mobile */}
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                {Object.keys(sections).map((key) => (
                  <MenuItem key={key} onClick={() => scrollToSection(sections[key])}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </MenuItem>
                ))}
                <MenuItem>
                  <MyLogo />
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
