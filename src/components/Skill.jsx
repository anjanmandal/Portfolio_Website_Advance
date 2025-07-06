import React, { useState, forwardRef } from 'react';
import { Box, Tabs, Tab, Grid, Card, CardContent, Typography, Avatar } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// Icon imports (update paths as needed)
import CssIcon from '/images/css-icon.png';
import JavaScriptIcon from '/images/javaScript.png';
import ReactIcon from '/images/react-logo.png';
import NodeIcon from '/images/nodejs-logo.png';
import SQLIcon from '/images/sql.png';
import PythonIcon from '/images/python.png';
import PHPIcon from '/images/php.png';
import CSharpIcon from '/images/cSharp.png';
import JavaIcon from '/images/java-icon.png';
import VBNETIcon from '/images/vb_net.png';
import TypeScriptIcon from '/images/typescript.png';
import MUIcon from '/images/material_ui.png';
import TailwindIcon from '/images/tailwind-logo.png';
import AngularIcon from '/images/angular.png';
import PostgresqlIcon from '/images/postgresql.png';
import MysqlIcon from '/images/mysql.png';
import MongodbIcon from '/images/mongoDB.png';
import SqlServerIcon from '/images/sql_server.png';
import RedisIcon from '/images/redis.png';
import AspNETIcon from '/images/asp_net.png';
import NextjsIcon from '/images/nextjs.png';
import JestIcon from '/images/jest.png';
import FirebaseIcon from '/images/firebase.png';
import DjangoIcon from '/images/django.png';
import GraphQLIcon from '/images/graphql.png';
import PrismaIcon from '/images/prisma.png';
import ReactNativeIcon from '/images/reactNative.png';
import LaravelIcon from '/images/laravel-logo.png';
import GitIcon from '/images/git.png';
import AwsIcon from '/images/aws.png';
import TerraformIcon from '/images/terraform.png';
import NginxIcon from '/images/nginx.png';
import LinuxIcon from '/images/linux.png';
import DockerIcon from '/images/docker.png';
import KubernetesIcon from '/images/kubernetes.png';
import GitHubIcon from '/images/github.png';
import JenkinsIcon from '/images/jenkins.png';

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

// Shiny text style for heading
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

// Text shine keyframes
const shine = keyframes`
  0% { background-position: 0% }
  100% { background-position: 200% }
`;

// Styled Tab
const StyledTab = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
  },
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));

// Styled Card for skills
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

// TabPanel component
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SkillCategories = forwardRef((props, ref) => {
  const [value, setValue] = useState(0);
  const handleChange = (_, newVal) => setValue(newVal);

  // Skill definitions
  const skills = {
    Languages: [
      { name: 'CSS', icon: CssIcon },
      { name: 'JavaScript', icon: JavaScriptIcon },
      { name: 'TypeScript', icon: TypeScriptIcon },
      { name: 'Python', icon: PythonIcon },
      { name: 'PHP', icon: PHPIcon },
      { name: 'C#', icon: CSharpIcon },
      { name: 'Java', icon: JavaIcon },
      { name: 'VB.NET', icon: VBNETIcon },
      { name: 'SQL', icon: SQLIcon },
    ],
    Frameworks: [
      { name: 'React.js', icon: ReactIcon },
      { name: 'Next.js', icon: NextjsIcon },
      { name: 'Angular', icon: AngularIcon },
      { name: 'Node.js (Express)', icon: NodeIcon },
      { name: 'ASP.NET Core', icon: AspNETIcon },
      { name: 'Django', icon: DjangoIcon },
      { name: 'Laravel', icon: LaravelIcon },
      { name: 'Tailwind CSS', icon: TailwindIcon },
      { name: 'Material UI', icon: MUIcon },
      { name: 'GraphQL', icon: GraphQLIcon },
      { name: 'Prisma', icon: PrismaIcon },
      { name: 'Firebase', icon: FirebaseIcon },
      { name: 'Jest', icon: JestIcon },
      { name: 'React Native', icon: ReactNativeIcon },
    ],
    DevOps: [
      { name: 'Git', icon: GitIcon },
      { name: 'GitHub Actions', icon: GitHubIcon },
      { name: 'Jenkins', icon: JenkinsIcon },
      { name: 'Docker', icon: DockerIcon },
      { name: 'Kubernetes', icon: KubernetesIcon },
      { name: 'Terraform', icon: TerraformIcon },
      { name: 'AWS (EKS, Lambda, S3)', icon: AwsIcon },
      { name: 'Nginx', icon: NginxIcon },
      { name: 'Linux', icon: LinuxIcon },
    ],
      Databases: [
      { name: 'PostgreSQL', icon: PostgresqlIcon },
      { name: 'MySQL', icon: MysqlIcon },
      { name: 'MongoDB', icon: MongodbIcon },
      { name: 'Microsoft SQL Server', icon: SqlServerIcon },
      { name: 'Redis', icon: RedisIcon },
    ]
  };

  // Convert to array of [category, items]
  const categories = Object.entries(skills);

  return (
    <Box ref={ref} sx={{ width: '100%', p: 3, position: 'relative', overflow: 'hidden' }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <ShinyText variant="h3">Skills</ShinyText>
      </Box>

      <Tabs value={value} onChange={handleChange} centered>
        {categories.map(([catName], idx) => (
          <StyledTab key={catName} label={catName} />
        ))}
      </Tabs>

      {categories.map(([catName, items], idx) => (
        <TabPanel key={catName} value={value} index={idx}>
          <Grid container spacing={3}>
            {items.map((skill, i) => (
              <Grid item size={{xs:12, sm:6, md:4}} key={i}>
                <StyledCard>
                  <Avatar alt={skill.name} src={skill.icon} sx={{ width: 56, height: 56, mr: 2 }} />
                  <CardContent>
                    <Typography variant="h6">{skill.name}</Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      ))}
    </Box>
  );
});

export default SkillCategories;
