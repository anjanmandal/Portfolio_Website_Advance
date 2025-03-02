import { useState,forwardRef } from 'react';
import { Box, Tabs, Tab, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import CssIcon from '/images/css-icon.png'; // Update with actual paths
import JavaScriptIcon from '/images/javaScript.png';
import ReactIcon from '/images/react-logo.png';
import NodeIcon from '/images/nodejs-logo.png';
import DevOpsIcon from '/images/php-logo.png';
import SQLIcon from '/images/sql.png';
import PythonIcon from '/images/python.png';
import VBNETIcon from '/images/vb_net.png';
import PHPIcon from '/images/php.png'
import CSharpIcon from '/images/cSharp.png';
import JavaIcon from '/images/java-icon.png';
import MUIcon from '/images/material_ui.png';
import TailWindCssIcon from '/images/tailwind-logo.png';
import AngularIcon from '/images/angular.png';
import ExpressIcon from '/images/express.png';
import AspNETIcon from '/images/asp_net.png';
import LaravelIcon from '/images/laravel-logo.png';
import GitIcon from '/images/git.png';
import AwsIcon from '/images/aws.png';





// Animation for floating particles
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

// Styled component for floating particles
const Particle = styled(Box)(({ theme, size, top, left }) => ({
  position: 'absolute',
  width: size || '10px',
  height: size || '10px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  top: top || '50%',
  left: left || '50%',
  opacity: 0.7,
  animation: `${float} 4s ease-in-out infinite`,
}));

// Shiny text style for headings
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

// Animation for text shining effect
const shine = keyframes`
  0% { background-position: 0% }
  100% { background-position: 200% }
`;

// Styled Tab for matching the theme
const StyledTab = styled(Tab)(({ theme }) => ({
  color: 'theme.palette.text.primary',
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

// Styled Card with hover effect and gradient borders
const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: 12,
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: `0 0 20px ${theme.palette.primary.main}`,
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.main}`,
  },
}));

// TabPanel component to display content for each tab
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SkillCategories = forwardRef((props, ref) => {

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const skills = {
    languages: [
      { name: 'CSS', icon: CssIcon },
      { name: 'JavaScript', icon: JavaScriptIcon },
      { name: 'SQL', icon: SQLIcon },
      { name: 'Python', icon: PythonIcon },
      { name: 'PHP', icon:PHPIcon },
      { name: 'C#', icon: CSharpIcon },
      { name: 'Java', icon: JavaIcon },
      { name: 'VB.NET', icon: VBNETIcon }
    ],
    frameworks: [
      { name: 'Node.js', icon: NodeIcon },
      { name: 'React.js', icon: ReactIcon },
      { name: 'Tailwind CSS', icon: TailWindCssIcon },
      { name: 'Material UI', icon: MUIcon },
      { name: 'Angular', icon: AngularIcon},
      { name: 'Express.js', icon: ExpressIcon },
      { name: 'ASP.NET', icon: AspNETIcon },
      { name: 'Laravel', icon: LaravelIcon },

    ],
    devops: [
      { name: 'Git', icon: GitIcon },
      { name: 'AWS', icon: AwsIcon }
    ],
  };

  return (
    <Box ref={ref} sx={{ width: '100%', color: '#fff', p: 3, position: 'relative', overflow: 'hidden' }}>
      {/* Floating Particles */}
      {/* <Particle top="10%" left="20%" size="8px" />
      <Particle top="40%" left="70%" size="12px" />
      <Particle top="75%" left="35%" size="10px" />
      <Particle top="90%" left="15%" size="6px" /> */}

      {/* Shiny Text Heading */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ShinyText variant="h3">Skill</ShinyText>
      </Box>

      {/* Tabs for switching categories */}
      <Tabs value={value} onChange={handleChange} centered>
        <StyledTab label="Languages" />
        <StyledTab label="Frameworks" />
        <StyledTab label="DevOps" />
      </Tabs>

      {/* Tab Panels */}
      <TabPanel value={value} index={0}>
        <Grid container spacing={3}>
          {skills.languages.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <Avatar alt={skill.name} src={skill.icon} sx={{ width: 56, height: 56, mr: 2 }} />
                <CardContent>
                  <Typography variant="h6" color="theme.palette.text.primary">
                    {skill.name}
                  </Typography>
                
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid container spacing={3}>
          {skills.frameworks.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <Avatar alt={skill.name} src={skill.icon} sx={{ width: 56, height: 56, mr: 2 }} />
                <CardContent>
                  <Typography variant="h6" color="theme.palette.text.primary">
                    {skill.name}
                  </Typography>
                
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Grid container spacing={3}>
          {skills.devops.map((skill, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <StyledCard>
                <Avatar alt={skill.name} src={skill.icon} sx={{ width: 56, height: 56, mr: 2 }} />
                <CardContent>
                  <Typography variant="h6" color="theme.palette.text.primary">
                    {skill.name}
                  </Typography>
              
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
});

export default SkillCategories;
