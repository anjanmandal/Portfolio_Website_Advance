import React, { useState, forwardRef } from 'react';
import { Box, Tabs, Tab, Grid, Card, Typography, Avatar, Stack, Chip } from '@mui/material';
import { styled, alpha, useTheme } from '@mui/material/styles';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import SectionFrame from './SectionFrame';

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
import MongodbIcon from '/images/mongodb.png';

const categoryMeta = {
  Languages: {
    eyebrow: 'Core language',
    tag: 'Daily use',
    accent: 'primary',
    detailLabel: 'Best for',
    detailText: 'Core application logic, typed systems thinking, and reliable day-to-day engineering work.',
  },
  Frameworks: {
    eyebrow: 'Product framework',
    tag: 'Feature delivery',
    accent: 'secondary',
    detailLabel: 'Best for',
    detailText:
      'Shipping user-facing features quickly while keeping product structure and maintainability intact.',
  },
  DevOps: {
    eyebrow: 'Infra & delivery',
    tag: 'Operations',
    accent: 'success',
    detailLabel: 'Best for',
    detailText: 'Deployment, automation, observability, and production reliability.',
  },
  Databases: {
    eyebrow: 'Data layer',
    tag: 'Storage',
    accent: 'info',
    detailLabel: 'Best for',
    detailText: 'Modeling data cleanly, querying efficiently, and supporting performance at scale.',
  },
};

const skills = {
  Languages: [
    { name: 'CSS', icon: CssIcon, summary: 'Responsive styling, layout systems, and polished UI detail.' },
    { name: 'JavaScript', icon: JavaScriptIcon, summary: 'Core application logic across modern frontend and backend work.' },
    { name: 'TypeScript', icon: TypeScriptIcon, summary: 'Typed development for safer product code and maintainable systems.' },
    { name: 'Python', icon: PythonIcon, summary: 'AI workflows, automation, scripting, and backend problem solving.' },
    { name: 'PHP', icon: PHPIcon, summary: 'Web backends and production features in legacy and modern stacks.' },
    { name: 'C#', icon: CSharpIcon, summary: 'Structured backend and application development in .NET ecosystems.' },
    { name: 'Java', icon: JavaIcon, summary: 'Object-oriented systems work and algorithm-heavy problem solving.' },
    { name: 'VB.NET', icon: VBNETIcon, summary: 'Business application logic and .NET-based workflow support.' },
    { name: 'SQL', icon: SQLIcon, summary: 'Query design, relational data modeling, and reporting workflows.' },
  ],
  Frameworks: [
    { name: 'React.js', icon: ReactIcon, summary: 'Component-driven product interfaces and interactive frontend systems.' },
    { name: 'Next.js', icon: NextjsIcon, summary: 'Full-stack React delivery with routing, data loading, and performance in mind.' },
    { name: 'Angular', icon: AngularIcon, summary: 'Structured frontend architecture for larger application surfaces.' },
    { name: 'Node.js (Express)', icon: NodeIcon, summary: 'APIs, services, and backend routes for fast product delivery.' },
    { name: 'ASP.NET Core', icon: AspNETIcon, summary: 'Robust backend development inside the Microsoft ecosystem.' },
    { name: 'Django', icon: DjangoIcon, summary: 'Rapid backend development with strong admin and data tooling.' },
    { name: 'Laravel', icon: LaravelIcon, summary: 'Modern PHP application development with clean backend patterns.' },
    { name: 'Tailwind CSS', icon: TailwindIcon, summary: 'Utility-first styling for fast interface implementation and iteration.' },
    { name: 'Material UI', icon: MUIcon, summary: 'Design-system-friendly component work and polished interface delivery.' },
    { name: 'GraphQL', icon: GraphQLIcon, summary: 'Flexible data access patterns for modern product experiences.' },
    { name: 'Prisma', icon: PrismaIcon, summary: 'Typed database access and schema-driven backend workflows.' },
    { name: 'Firebase', icon: FirebaseIcon, summary: 'Rapid auth, hosting, and realtime features for MVPs and product prototypes.' },
    { name: 'Jest', icon: JestIcon, summary: 'Testing workflows for stable frontend and backend codebases.' },
    { name: 'React Native', icon: ReactNativeIcon, summary: 'Cross-platform mobile interface development with React patterns.' },
  ],
  DevOps: [
    { name: 'Git', icon: GitIcon, summary: 'Version control discipline for shipping clean collaborative changes.' },
    { name: 'GitHub Actions', icon: GitHubIcon, summary: 'Automated CI/CD flows and repeatable delivery pipelines.' },
    { name: 'Jenkins', icon: JenkinsIcon, summary: 'Pipeline orchestration and deployment automation in production environments.' },
    { name: 'Docker', icon: DockerIcon, summary: 'Containerized development and deployment consistency across environments.' },
    { name: 'Kubernetes', icon: KubernetesIcon, summary: 'Scalable orchestration for service deployment and runtime management.' },
    { name: 'Terraform', icon: TerraformIcon, summary: 'Infrastructure as code for repeatable cloud provisioning.' },
    { name: 'AWS (EKS, Lambda, S3)', icon: AwsIcon, summary: 'Cloud infrastructure and managed services for production systems.' },
    { name: 'Nginx', icon: NginxIcon, summary: 'Routing, proxying, and edge-layer configuration for deployed apps.' },
    { name: 'Linux', icon: LinuxIcon, summary: 'Server-side workflows, shell tooling, and deployment operations.' },
  ],
  Databases: [
    { name: 'PostgreSQL', icon: PostgresqlIcon, summary: 'Reliable relational modeling and query design for production apps.' },
    { name: 'MySQL', icon: MysqlIcon, summary: 'Structured relational storage and classic web application data work.' },
    { name: 'MongoDB', icon: MongodbIcon, summary: 'Flexible document storage for product features and prototype speed.' },
    { name: 'Microsoft SQL Server', icon: SqlServerIcon, summary: 'Enterprise relational data management and reporting workflows.' },
    { name: 'Redis', icon: RedisIcon, summary: 'Caching, session storage, and fast in-memory access patterns.' },
  ],
};

const getAccentColor = (theme, categoryName) => {
  const accentKey = categoryMeta[categoryName]?.accent || 'primary';
  return theme.palette[accentKey]?.main || theme.palette.primary.main;
};

const StyledTab = styled(Tab)(({ theme }) => ({
  minHeight: 42,
  padding: theme.spacing(1, 1.75),
  color: theme.palette.text.secondary,
  borderRadius: 999,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.64)
      : alpha(theme.palette.common.white, 0.78),
  transition: 'all 180ms ease',
  '&.Mui-selected': {
    color: theme.palette.text.primary,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.07)
        : alpha(theme.palette.common.white, 0.96),
    borderColor: alpha(theme.palette.primary.main, 0.18),
  },
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: alpha(theme.palette.primary.main, 0.06),
    borderColor: alpha(theme.palette.primary.main, 0.16),
  },
}));

const StyledCard = styled(Card, {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  position: 'relative',
  overflow: 'hidden',
  isolation: 'isolate',
  width: '100%',
  minHeight: 284,
  padding: theme.spacing(2.2),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  textAlign: 'left',
  borderRadius: 22,
  border: `1px solid ${active ? alpha(accentColor, 0.24) : theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? active
        ? `linear-gradient(180deg, ${alpha(accentColor, 0.12)} 0%, ${alpha(
            theme.palette.background.paper,
            0.84
          )} 58%, ${alpha(theme.palette.background.paper, 0.9)} 100%)`
        : alpha(theme.palette.background.paper, 0.84)
      : active
        ? `linear-gradient(180deg, ${alpha(accentColor, 0.07)} 0%, ${alpha(
            theme.palette.common.white,
            0.95
          )} 56%, ${alpha(theme.palette.common.white, 0.88)} 100%)`
        : alpha(theme.palette.common.white, 0.82),
  boxShadow: active ? theme.shadows[4] : theme.shadows[1],
  backdropFilter: 'blur(14px)',
  transition: 'transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease, background 220ms ease',
  cursor: 'pointer',
  appearance: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${alpha(accentColor, active ? 0.9 : 0.45)} 0%, ${alpha(
      accentColor,
      0.08
    )} 54%, transparent 100%)`,
    zIndex: -2,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -20,
    right: -8,
    width: 120,
    height: 120,
    borderRadius: '50%',
    background: alpha(accentColor, active ? 0.16 : 0.07),
    filter: 'blur(20px)',
    zIndex: -1,
    transition: 'opacity 220ms ease',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
    borderColor: alpha(accentColor, 0.22),
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha(accentColor, 0.4)}`,
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

const SkillAvatar = styled(Avatar, {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  width: 64,
  height: 64,
  padding: theme.spacing(1),
  borderRadius: 20,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, active ? 0.08 : 0.05)
      : alpha(theme.palette.common.white, active ? 0.94 : 0.84),
  border: `1px solid ${alpha(accentColor, active ? 0.18 : 0.1)}`,
  boxShadow: active ? theme.shadows[1] : 'none',
}));

const SkillState = styled(Box, {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: theme.spacing(0.7),
  padding: theme.spacing(0.5, 0.9),
  borderRadius: 999,
  border: `1px solid ${active ? alpha(accentColor, 0.18) : alpha(accentColor, 0.1)}`,
  background:
    active
      ? theme.palette.mode === 'dark'
        ? alpha(accentColor, 0.12)
        : alpha(accentColor, 0.08)
      : theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.03)
        : alpha(theme.palette.common.white, 0.7),
}));

const SkillDot = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'accentColor',
})(({ accentColor }) => ({
  width: 7,
  height: 7,
  borderRadius: '50%',
  backgroundColor: accentColor,
}));

const DetailStrip = styled(Box, {
  shouldForwardProp: (prop) => !['active', 'accentColor'].includes(prop),
})(({ theme, active, accentColor }) => ({
  marginTop: 'auto',
  padding: theme.spacing(active ? 1.5 : 1.15, 1.3),
  borderRadius: 18,
  border: `1px solid ${alpha(accentColor, active ? 0.16 : 0.08)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(accentColor, active ? 0.12 : 0.04)
      : alpha(accentColor, active ? 0.08 : 0.03),
  transition: 'opacity 220ms ease, transform 220ms ease, background 220ms ease, border-color 220ms ease',
  opacity: active ? 1 : 0.92,
  transform: active ? 'translateY(0)' : 'translateY(2px)',
}));

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const SkillCategories = forwardRef((props, ref) => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [activeSkills, setActiveSkills] = useState(() =>
    Object.fromEntries(Object.entries(skills).map(([catName, items]) => [catName, items[0]?.name || '']))
  );
  const [previewSkills, setPreviewSkills] = useState({});

  const handleChange = (_, newVal) => setValue(newVal);
  const handleSkillSelect = (categoryName, skillName) => {
    setActiveSkills((prev) => ({ ...prev, [categoryName]: skillName }));
  };
  const handleSkillPreview = (categoryName, skillName) => {
    setPreviewSkills((prev) => ({ ...prev, [categoryName]: skillName }));
  };
  const clearSkillPreview = (categoryName) => {
    setPreviewSkills((prev) => {
      const next = { ...prev };
      delete next[categoryName];
      return next;
    });
  };

  const categories = Object.entries(skills);

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Stack"
      title="Skills arsenal"
      subtitle="Tooling, languages, and platforms I rely on to ship production-grade software."
      contentSpacing={3}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{
          gap: 1.25,
          '& .MuiTabs-indicator': {
            height: 2,
            borderRadius: 999,
            backgroundColor: 'primary.main',
          },
          mb: 2,
        }}
      >
        {categories.map(([catName]) => (
          <StyledTab key={catName} label={catName} />
        ))}
      </Tabs>

      {categories.map(([catName, items], idx) => (
        <TabPanel key={catName} value={value} index={idx}>
          <Grid container spacing={3}>
            {items.map((skill) => {
              const displayedSkill = previewSkills[catName] || activeSkills[catName];
              const isActive = displayedSkill === skill.name;
              const isPinned = activeSkills[catName] === skill.name;
              const accentColor = getAccentColor(theme, catName);

              return (
                <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={skill.name}>
                  <StyledCard
                    active={isActive}
                    accentColor={accentColor}
                    component="button"
                    type="button"
                    onClick={() => handleSkillSelect(catName, skill.name)}
                    onMouseEnter={() => handleSkillPreview(catName, skill.name)}
                    onMouseLeave={() => clearSkillPreview(catName)}
                    onFocus={() => handleSkillPreview(catName, skill.name)}
                    onBlur={() => clearSkillPreview(catName)}
                    aria-pressed={isPinned}
                  >
                    <Stack spacing={2.25} sx={{ height: '100%' }}>
                      <Stack direction="row" spacing={1.5} justifyContent="space-between" alignItems="center">
                        <SkillState active={isActive} accentColor={accentColor}>
                          <SkillDot accentColor={accentColor} />
                          <Typography variant="caption" sx={{ color: isActive ? 'text.primary' : 'text.secondary' }}>
                            {isPinned ? 'Pinned' : isActive ? 'Preview' : 'Explore'}
                          </Typography>
                        </SkillState>

                        <Box
                          sx={{
                            width: 34,
                            height: 34,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 999,
                            border: `1px solid ${alpha(accentColor, isActive ? 0.2 : 0.1)}`,
                            bgcolor: alpha(accentColor, isActive ? 0.1 : 0.04),
                            color: accentColor,
                            transform: isActive ? 'translate(1px, -1px)' : 'none',
                            transition: 'transform 220ms ease, background-color 220ms ease',
                          }}
                        >
                          <ArrowOutwardRoundedIcon sx={{ fontSize: 18 }} />
                        </Box>
                      </Stack>

                      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
                        <SkillAvatar active={isActive} accentColor={accentColor} alt={skill.name} src={skill.icon} />
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              mb: 0.5,
                              color: alpha(accentColor, 0.88),
                              letterSpacing: 0.5,
                            }}
                          >
                            {categoryMeta[catName].eyebrow}
                          </Typography>
                          <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.3 }}>
                            {skill.name}
                          </Typography>
                        </Box>
                      </Stack>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          lineHeight: 1.74,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: isActive ? 4 : 2,
                          overflow: 'hidden',
                          minHeight: isActive ? 92 : 48,
                          transition: 'min-height 220ms ease',
                        }}
                      >
                        {skill.summary}
                      </Typography>

                      <DetailStrip active={isActive} accentColor={accentColor}>
                        <Stack spacing={1.1}>
                          {isActive ? (
                            <Typography
                              variant="body2"
                              sx={{
                                color: 'text.secondary',
                                lineHeight: 1.65,
                              }}
                            >
                              <Box component="span" sx={{ color: 'text.primary', fontWeight: 700 }}>
                                {categoryMeta[catName].detailLabel}:{' '}
                              </Box>
                              {categoryMeta[catName].detailText}
                            </Typography>
                          ) : (
                            <Typography variant="caption" sx={{ color: alpha(accentColor, 0.88) }}>
                              Hover to preview, click to pin
                            </Typography>
                          )}

                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            <Chip
                              label={catName}
                              size="small"
                              sx={{
                                borderColor: alpha(accentColor, 0.16),
                                bgcolor: alpha(accentColor, isActive ? 0.12 : 0.06),
                                color: isActive ? 'text.primary' : 'text.secondary',
                              }}
                            />
                            <Chip
                              label={categoryMeta[catName].tag}
                              size="small"
                              sx={{
                                borderColor: alpha(accentColor, 0.12),
                                bgcolor: alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.03 : 0.6),
                                color: 'text.secondary',
                              }}
                            />
                            {isPinned && (
                              <Chip
                                label="Selected"
                                size="small"
                                sx={{
                                  borderColor: alpha(accentColor, 0.14),
                                  bgcolor: alpha(accentColor, 0.08),
                                  color: 'text.primary',
                                }}
                              />
                            )}
                          </Stack>
                        </Stack>
                      </DetailStrip>
                    </Stack>
                  </StyledCard>
                </Grid>
              );
            })}
          </Grid>
        </TabPanel>
      ))}
    </SectionFrame>
  );
});

export default SkillCategories;
