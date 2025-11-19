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
  borderRadius: theme.shape.borderRadius * 1.25,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.08 : 0.12),
  backgroundColor: alpha(
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.background.default,
    theme.palette.mode === 'dark' ? 0.75 : 0.85
  ),
  boxShadow: theme.shadows[1],
  padding: theme.spacing(1.25, 2),
}));

export default function AppAppBar({ sections }) {
  const [open, setOpen] = React.useState(false);
  const navItems = [
    { label: 'About', key: 'about' },
    { label: 'Education', key: 'education' },
    { label: 'Skills', key: 'skills' },
    { label: 'Experience', key: 'experience' },
    { label: 'Projects', key: 'projects' },
    { label: 'Achievements', key: 'achievements' },
    { label: 'Involvements', key: 'involvements' },
    { label: 'Contact', key: 'contact' },
  ];

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
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.key}
                  variant="text"
                  size="small"
                  onClick={() => scrollToSection(sections[item.key])}
                  sx={{
                    fontWeight: 600,
                    textTransform: 'none',
                    color: 'text.primary',
                    letterSpacing: 0.3,
                    opacity: 0.85,
                    '&:hover': {
                      opacity: 1,
                      color: 'primary.light',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
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
              <Box sx={{ p: 2, backgroundColor: 'background.paper', minHeight: '100vh' }}>
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
                {navItems.map((item) => (
                  <MenuItem
                    key={item.key}
                    onClick={() => scrollToSection(sections[item.key])}
                    sx={{ fontWeight: 600, letterSpacing: 0.3 }}
                  >
                    {item.label}
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
