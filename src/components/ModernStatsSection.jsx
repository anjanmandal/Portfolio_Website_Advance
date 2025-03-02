import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CodeIcon from '@mui/icons-material/Code'; // LeetCode icon placeholder
import { motion } from 'framer-motion';

/**
 * Glassmorphism Card styling with no background color
 */
const GlassCard = styled(motion(Card))(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  backgroundColor: 'transparent', // Removed background color
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px) scale(1.02)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.2)',
  },
}));

export default function ModernStatsSection() {
  const theme = useTheme();

  // ====== Example stats for the LeetCode card ======
  const totalQuestions = 3474;
  const easyCount = 36;
  const mediumCount = 20;
  const hardCount = 6;
  const attemptingCount = 2;

  // ====== Example stats for the GitHub card ======
  const githubRepos = 15;

  // ====== Helper functions for the segmented ring (LeetCode) ======
  function polarToCartesian(cx, cy, r, angleInDegrees) {
    const angleInRadians = (angleInDegrees - 90) * (Math.PI / 180);
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  }

  function describeArc(cx, cy, r, startAngle, endAngle) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', r, r, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  }

  // ====== Build the segmented ring arcs for LeetCode ======
  const solved = easyCount + mediumCount + hardCount;
  const easyFrac = solved === 0 ? 0 : easyCount / solved;
  const medFrac  = solved === 0 ? 0 : mediumCount / solved;
  const hardFrac = solved === 0 ? 0 : hardCount / solved;

  // Ring parameters
  const size = 200;         
  const radius = 80;        
  const strokeWidth = 10;   
  const cx = size / 2;      
  const cy = size / 2;      

  let startAngle = -90;
  const arcsData = [
    { fraction: easyFrac, color: '#00b8a3' },
    { fraction: medFrac,  color: '#ffb400' },
    { fraction: hardFrac, color: '#ef476f' },
  ];
  const arcs = arcsData.map(({ fraction, color }) => {
    const endAngle = startAngle + fraction * 360;
    const path = describeArc(cx, cy, radius, startAngle, endAngle);
    startAngle = endAngle;
    return { path, color };
  });

  // ====== Build a "GitHub-like" contribution grid ======
  // (Demo data: 20 columns x 5 rows, random color levels)
  const weeks = 20;
  const days = 6;
  const totalSquares = weeks * days;
  const contributionsData = Array.from({ length: totalSquares }, () => Math.floor(Math.random() * 5));

  function getColorForValue(value) {
    switch (value) {
      case 0: return '#ebedf0';  // light gray
      case 1: return '#c6e48b';  // light green
      case 2: return '#7bc96f';  // medium green
      case 3: return '#239a3b';  // dark green
      case 4: return '#196127';  // darkest green
      default: return '#ebedf0';
    }
  }

  return (
    <Box sx={{ marginTop: 6 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 3 }}
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Coding Stats
      </Typography>

      <Grid container spacing={4}>
        {/* ==================== LeetCode Card ==================== */}
        <Grid item xs={12} md={6}>
          <GlassCard>
            {/* LeetCode icon (clickable) + title */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <motion.a
                href="https://leetcode.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  marginRight: '8px'
                }}
              >
                <CodeIcon fontSize="large" />
              </motion.a>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                LeetCode Progress
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              {/* =========== The Segmented Ring =========== */}
              <Box sx={{ position: 'relative', width: size, height: size }}>
                <svg width={size} height={size}>
                  {/* Background circle (track) */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={strokeWidth}
                  />
                  {/* The arcs (easy/med/hard) */}
                  {arcs.map((arc, i) => (
                    <path
                      key={i}
                      d={arc.path}
                      fill="none"
                      stroke={arc.color}
                      strokeWidth={strokeWidth}
                      strokeLinecap="round"
                    />
                  ))}
                </svg>

                {/* Centered text overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0, bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: theme.palette.text.primary,
                  }}
                >
                  <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {solved}/{totalQuestions}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <CheckCircleIcon sx={{ color: 'success.main', fontSize: 18 }} />
                    <Typography variant="body2" component="div">
                      Solved
                    </Typography>
                  </Box>

                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {attemptingCount} Attempting
                  </Typography>
                </Box>
              </Box>

              {/* =========== Difficulty Legend =========== */}
              <Box sx={{ mt: { xs: 3, sm: 0 }, ml: { xs: 0, sm: 3 } }}>
                {/* Easy */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: '#00b8a3',
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Easy {easyCount}/863
                  </Typography>
                </Box>

                {/* Medium */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: '#ffb400',
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Med. {mediumCount}/1805
                  </Typography>
                </Box>

                {/* Hard */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      backgroundColor: '#ef476f',
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Hard {hardCount}/806
                  </Typography>
                </Box>
              </Box>
            </Box>
          </GlassCard>
        </Grid>

        {/* ==================== GitHub Card ==================== */}
        <Grid item xs={12} md={6}>
          <GlassCard>
            {/* Clickable GitHub icon */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <motion.a
                href="https://github.com/madalak"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  textDecoration: 'none', 
                  color: 'inherit',
                  marginRight: '8px'
                }}
              >
                <GitHubIcon fontSize="large" />
              </motion.a>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                GitHub Repositories
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ mb: 3 }}>
              <strong>{githubRepos}</strong> Public Repositories
            </Typography>

            {/* ==================== Contribution Grid ==================== */}
            <Box sx={{ overflowX: 'auto', paddingBottom: 2 }}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateRows: `repeat(${days}, 1fr)`,
                  gridTemplateColumns: `repeat(${weeks}, 1fr)`,
                  gap: '4px',
                }}
              >
                {contributionsData.map((value, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor: getColorForValue(value),
                      borderRadius: '2px',
                    }}
                  />
                ))}
              </Box>

              {/* Legend */}
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <Typography variant="caption" sx={{ mr: 1 }}>
                  Less
                </Typography>
                {[0, 1, 2, 3, 4].map((val) => (
                  <Box
                    key={val}
                    sx={{
                      width: 12,
                      height: 12,
                      backgroundColor: getColorForValue(val),
                      borderRadius: '2px',
                      mx: 0.5
                    }}
                  />
                ))}
                <Typography variant="caption" sx={{ ml: 1 }}>
                  More
                </Typography>
              </Box>
            </Box>
          </GlassCard>
        </Grid>
      </Grid>
    </Box>
  );
}
