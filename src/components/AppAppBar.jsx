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
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import { useLocation, useNavigate } from 'react-router-dom';
import MyLogo from './MyLogo';

const NAV_ITEMS = [
  { label: 'About', key: 'about' },
  { label: 'Education', key: 'education' },
  { label: 'Skills', key: 'skills' },
  { label: 'Experience', key: 'experience' },
  { label: 'Projects', key: 'projects' },
  { label: 'Achievements', key: 'achievements' },
  { label: 'Involvements', key: 'involvements' },
  { label: 'Contact', key: 'contact' },
];

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  flexShrink: 0,
  minHeight: 72,
  width: '100%',
  borderRadius: 32,
  backdropFilter: 'blur(20px) saturate(120%)',
  border: '1px solid',
  borderColor: theme.palette.divider,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.88)
      : alpha(theme.palette.common.white, 0.82),
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 10px 30px rgba(0, 0, 0, 0.18)'
      : '0 10px 24px rgba(61, 28, 13, 0.06)',
  padding: theme.spacing(1, 1.35),
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 24,
    right: 24,
    top: 0,
    height: 1,
    backgroundColor: alpha(
      theme.palette.common.white,
      theme.palette.mode === 'dark' ? 0.06 : 0.72
    ),
  },
  [theme.breakpoints.up('lg')]: {
    minHeight: 78,
    gap: theme.spacing(2),
    paddingInline: theme.spacing(2.25),
  },
}));

const DesktopNavRail = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.35),
  padding: theme.spacing(0.4),
  borderRadius: 999,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.03)
      : alpha(theme.palette.common.white, 0.52),
}));

const NavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  minWidth: 'auto',
  borderRadius: 999,
  padding: theme.spacing(0.95, 1.35),
  fontWeight: 600,
  fontSize: '0.92rem',
  letterSpacing: 0.1,
  textTransform: 'none',
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  border: `1px solid ${
    active ? alpha(theme.palette.primary.main, 0.16) : 'transparent'
  }`,
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.06)
      : alpha(theme.palette.common.white, 0.92)
    : 'transparent',
  boxShadow: active ? theme.shadows[1] : 'none',
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: active
      ? theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.08)
        : alpha(theme.palette.common.white, 0.98)
      : alpha(theme.palette.primary.main, 0.06),
    borderColor: alpha(theme.palette.primary.main, active ? 0.2 : 0.14),
  },
}));

const MobileNavButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  justifyContent: 'space-between',
  width: '100%',
  padding: theme.spacing(1.5, 1.75),
  borderRadius: 18,
  textTransform: 'none',
  fontWeight: 600,
  color: active ? theme.palette.text.primary : theme.palette.text.secondary,
  border: `1px solid ${
    active ? alpha(theme.palette.primary.main, 0.18) : theme.palette.divider
  }`,
  backgroundColor: active
    ? theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.06)
      : alpha(theme.palette.common.white, 0.92)
    : theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.62)
      : alpha(theme.palette.common.white, 0.74),
}));

export default function AppAppBar({ sections }) {
  const [open, setOpen] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState('about');
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const visibleSections = NAV_ITEMS.filter((item) => sections[item.key]?.current);

      if (!visibleSections.length) {
        return;
      }

      let current = visibleSections[0].key;

      visibleSections.forEach((item) => {
        const top = sections[item.key].current.getBoundingClientRect().top;
        if (top <= 156) {
          current = item.key;
        }
      });

      setActiveKey((previous) => (previous === current ? previous : current));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sections]);

  const scrollToSection = React.useCallback((ref, key) => {
    if (!ref?.current) {
      return false;
    }

    const top = ref.current.getBoundingClientRect().top + window.scrollY - 112;
    window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
    setActiveKey(key);
    setOpen(false);
    return true;
  }, []);

  React.useEffect(() => {
    if (location.pathname !== '/' || !location.hash) {
      return;
    }

    const key = location.hash.replace('#', '');
    const targetRef = sections[key];

    const frame = window.requestAnimationFrame(() => {
      scrollToSection(targetRef, key);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname, scrollToSection, sections]);

  const handleSectionNavigation = (key) => {
    const targetRef = sections[key];
    const didScroll = scrollToSection(targetRef, key);

    if (!didScroll) {
      navigate(`/#${key}`);
      setOpen(false);
    }
  };

  const scrollToTop = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveKey('about');
      setOpen(false);
      return;
    }

    navigate('/');
    setOpen(false);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ boxShadow: 0, bgcolor: 'transparent', backgroundImage: 'none', mt: { xs: 1.25, md: 2 } }}
    >
      <Container maxWidth="xl">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{
              minWidth: 0,
              width: { xs: 82, lg: 112 },
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              '& img': {
                width: { xs: 82, lg: 96 },
                height: 'auto',
              },
            }}
            onClick={scrollToTop}
          >
            <MyLogo />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: { xs: 'none', lg: 'flex' },
              justifyContent: 'center',
              minWidth: 0,
              px: 1,
            }}
          >
            <DesktopNavRail>
              {NAV_ITEMS.filter((item) => item.key !== 'contact').map((item) => (
                <NavButton
                  key={item.key}
                  active={activeKey === item.key}
                  onClick={() => handleSectionNavigation(item.key)}
                >
                  {item.label}
                </NavButton>
              ))}
            </DesktopNavRail>
          </Box>

          <Box
            sx={{
              display: { xs: 'none', lg: 'block' },
              width: 112,
              flexShrink: 0,
            }}
          />

          <Stack direction="row" spacing={1} alignItems="center" sx={{ ml: { xs: 'auto', lg: 0 } }}>
            <IconButton
              aria-label="Open navigation"
              onClick={toggleDrawer(true)}
              sx={{
                display: { xs: 'inline-flex', lg: 'none' },
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.62)
                    : alpha(theme.palette.common.white, 0.76),
              }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: (theme) => ({
                  width: 'min(100vw, 360px)',
                  p: 2,
                  background:
                    theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.paper, 0.96)
                      : alpha(theme.palette.common.white, 0.96),
                  backdropFilter: 'blur(24px)',
                }),
              }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MyLogo />
                  </Box>
                  <IconButton onClick={toggleDrawer(false)} aria-label="Close navigation">
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 2.5 }} />

                <Stack spacing={1}>
                  {NAV_ITEMS.map((item) => (
                    <MobileNavButton
                      key={item.key}
                      active={activeKey === item.key}
                      onClick={() => handleSectionNavigation(item.key)}
                      endIcon={<ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />}
                    >
                      {item.label}
                    </MobileNavButton>
                  ))}
                </Stack>

                <Box sx={{ mt: 'auto', pt: 3 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    endIcon={<ArrowOutwardRoundedIcon />}
                    onClick={() => handleSectionNavigation('contact')}
                  >
                    Contact
                  </Button>
                </Box>
              </Box>
            </Drawer>
          </Stack>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
