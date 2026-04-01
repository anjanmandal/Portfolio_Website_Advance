// src/Blog.jsx

import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
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
            pt: { xs: 7, md: 8 },
            pb: { xs: 6, md: 8 },
          })}
        >
          <Box
            sx={(theme) => {
              return {
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 18% 10%, ${alpha(
                    theme.palette.primary.main,
                    theme.palette.mode === 'dark' ? 0.14 : 0.08
                  )} 0%, transparent 24%), radial-gradient(circle at 84% 4%, ${alpha(
                    theme.palette.common.white,
                    theme.palette.mode === 'dark' ? 0.08 : 0.42
                  )} 0%, transparent 18%), linear-gradient(180deg, ${alpha(
                    theme.palette.common.white,
                    theme.palette.mode === 'dark' ? 0.02 : 0.56
                  )} 0%, transparent 32%)`,
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  height: '36%',
                  backgroundImage: `linear-gradient(${alpha(
                    theme.palette.common.white,
                    theme.palette.mode === 'dark' ? 0.05 : 0.18
                  )} 1px, transparent 1px), linear-gradient(90deg, ${alpha(
                    theme.palette.common.white,
                    theme.palette.mode === 'dark' ? 0.04 : 0.12
                  )} 1px, transparent 1px)`,
                  backgroundSize: '88px 88px',
                  maskImage:
                    'linear-gradient(180deg, rgba(0,0,0,0.7), rgba(0,0,0,0.22) 68%, transparent 100%)',
                  opacity: theme.palette.mode === 'dark' ? 0.14 : 0.18,
                },
              };
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <AppAppBar sections={sections} />
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            <Box
              component="main"
              sx={(theme) => ({
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: theme.spacing(6),
                py: { xs: 3, md: 4 },
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
            </Box>
            <Footer sections={sections} />
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}
