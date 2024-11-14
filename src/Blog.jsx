// src/Blog.jsx

import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AppAppBar from './Components/AppAppBar';
import Footer from './Components/Footer';
import getBlogTheme from './Theme/getBlogTheme';
import ToggleColorMode from './Components/ToggleColorMode';
import AboutSection from './components/About';
import EducationSection from './components/Education';
import SkillsSection from './components/Skill';
import ProjectSection from './components/Projects';
import ExperienceAccordion from './components/ExperienceAccordion';
import ExperienceDetail from './components/ExperienceDetail';
import AchievementsSection from './components/AchievementsSection';
import ContactForm from './components/ContactForm';

export default function Blog() {
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
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // Create refs for each section
  const aboutRef = React.useRef(null);
  const educationRef = React.useRef(null);
  const skillsRef = React.useRef(null);
  const experienceRef = React.useRef(null);
  const projectsRef = React.useRef(null);
  const achievementsRef = React.useRef(null);
  const contactRef = React.useRef(null);

  // Object containing all refs
  const sections = {
    about: aboutRef,
    education: educationRef,
    skills: skillsRef,
    experience: experienceRef,
    projects: projectsRef,
    achievements: achievementsRef,
    contact: contactRef,
  };

  return (
    <Router>
      <ThemeProvider theme={showCustomTheme ? blogTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <AppAppBar sections={sections} />
        <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
        <Container
          maxWidth="lg"
          component="main"
          sx={{ display: 'flex', flexDirection: 'column', my: 8, gap: 4 }}
        >
          <Routes>
            {/* Main Page with sections */}
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
                  <ContactForm ref={contactRef} />
                </>
              }
            />
            {/* Experience Detail Page */}
            <Route path="/experience/:id" element={<ExperienceDetail />} />
          </Routes>
        </Container>
        <Footer
       sections={sections}
      />
      </ThemeProvider>
    </Router>
  );
}
