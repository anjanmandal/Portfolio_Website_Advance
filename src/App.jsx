// src/Blog.jsx

import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, alpha } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppAppBar from './components/AppAppBar';
import Footer from './components/Footer';
import getBlogTheme from './Theme/getBlogTheme';
import ToggleColorMode from './components/ToggleColorMode';
import AboutSection from './components/About';
import EducationSection from './components/Education';
import CertificationsSection from './components/Certifications';
import CertificationsPage from './components/CertificationsPage';
import SkillsSection from './components/Skill';
import ProjectSection from './components/Projects';
import ExperienceAccordion from './components/ExperienceAccordion';
import ExperienceDetail from './components/ExperienceDetail';
import AchievementsSection from './components/AchievementsSection';
import ContactForm from './components/ContactForm';
import InvolvementSection from './components/Involvement';
import AchievementsDetail from './components/AchievementsDetail';
import ProjectDetail from './components/ProjectDetail';


export default function App() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const blogTheme = createTheme(getBlogTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  // Determine dark mode flag
  const isDark = mode === 'dark';

  // On mount, check system or localStorage preference
  React.useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark =
        window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  React.useEffect(() => {
    document.body.dataset.colorScheme = mode;
  }, [mode]);

  const aboutRef = React.useRef(null);
  const educationRef = React.useRef(null);
  const certificationsRef = React.useRef(null);
  const skillsRef = React.useRef(null);
  const experienceRef = React.useRef(null);
  const projectsRef = React.useRef(null);
  const achievementsRef = React.useRef(null);
  const involvementRef = React.useRef(null);
  const contactRef = React.useRef(null);

  const sections = {
    about: aboutRef,
    education: educationRef,
    skills: skillsRef,
    experience: experienceRef,
    projects: projectsRef,
    achievements: achievementsRef,
    involvements: involvementRef,
    contact: contactRef,
  };

  return (
    <Router>
      <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <Box
          sx={(theme) => ({
            minHeight: '100vh',
            background: theme.palette.background.gradient,
            transition: 'background 600ms ease',
            position: 'relative',
            overflowX: 'hidden',
            pt: { xs: 8, md: 10 },
            pb: { xs: 6, md: 8 },
          })}
        >
          <Box
            sx={(theme) => {
              const glowPrimary = alpha(
                theme.palette.primary.main,
                theme.palette.mode === 'dark' ? 0.45 : 0.22
              );
              const glowSecondary = alpha(
                theme.palette.secondary.main,
                theme.palette.mode === 'dark' ? 0.4 : 0.18
              );

              return {
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  width: 400,
                  height: 400,
                  top: '-10%',
                  right: '5%',
                  background: `radial-gradient(circle, ${glowPrimary} 0%, transparent 70%)`,
                  filter: 'blur(80px)',
                  opacity: theme.palette.mode === 'dark' ? 0.65 : 0.35,
                  animation: 'float 20s ease-in-out infinite',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: 450,
                  height: 450,
                  bottom: '-15%',
                  left: '-5%',
                  background: `radial-gradient(circle, ${glowSecondary} 0%, transparent 65%)`,
                  filter: 'blur(100px)',
                  opacity: theme.palette.mode === 'dark' ? 0.55 : 0.28,
                  animation: 'float 25s ease-in-out infinite reverse',
                },
                '@keyframes float': {
                  '0%, 100%': {
                    transform: 'translate(0, 0) scale(1)',
                  },
                  '50%': {
                    transform: 'translate(30px, -30px) scale(1.1)',
                  },
                },
              };
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <AppAppBar sections={sections} />
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            <Container
              maxWidth="lg"
              component="main"
              sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(6),
                py: { xs: 10, md: 14 },
              })}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <AboutSection ref={aboutRef} />
                      <EducationSection ref={educationRef} />
                      <SkillsSection ref={skillsRef} />
                      <ExperienceAccordion ref={experienceRef} />
                      <ProjectSection ref={projectsRef} />
                      <AchievementsSection ref={achievementsRef} />
                      <InvolvementSection ref={involvementRef} />
                      <ContactForm ref={contactRef} />
                    </>
                  }
                />
                <Route path="/experience/:id" element={<ExperienceDetail />} />
                <Route path="/achievements/:slug" element={<AchievementsDetail />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/certifications" element={<CertificationsPage />} />
              </Routes>
            </Container>
            <Footer sections={sections} />
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}
