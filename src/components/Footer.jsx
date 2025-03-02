import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import DownloadIcon from '@mui/icons-material/Download';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
        Anjan Mandal
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}



export default function Footer({sections}) {

 const scrollToSection = (ref) => {
  if (ref && ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
    // Optionally, close the drawer after clicking
    setOpen(false);
  }
};
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ fontWeight: 600, mt: 2 }}
              >
                Contact Me
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Open to work. Please contact me!
              </Typography>
              <Link color="text.secondary" variant="body2" onClick={() => scrollToSection(sections.contact)}>
                Contact Me
              </Link>
              <Box sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  href="./files/Anjan_Mandal_Resume_2025_ULM.pdf"
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 'bold',
                    boxShadow: 3,
                    '&:hover': {
                      boxShadow: 6,
                    },
                  }}
                >
                  Download Resume
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            About Me
            </Typography>
            <Link color="text.secondary" variant="body2" onClick={() => scrollToSection(sections.about)}>
            About
            </Link>
            <Link color="text.secondary" variant="body2" onClick={() => scrollToSection(sections.education)}>
            Education
            </Link>
            <Link color="text.secondary" variant="body2" onClick={() => scrollToSection(sections.experience)}>
            Experience
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
            Impact Initiative
            </Typography>
            <Link color="text.secondary" variant="body2" onClick={() => scrollToSection(sections.skills)}>
              Skills
            </Link>
            <Link color="text.secondary" variant="body2" onClick={() => scrollToSection(sections.achievements)}>
              Achievements
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Projects
            </Typography>
            <Link color="text.secondary" variant="body2" onClick={() => scrollToSection(sections.projects)}>
              Project
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Link color="text.secondary" variant="body2" href="#">
              Privacy Policy
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Terms of Service
            </Link>
            <Copyright />
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'text.secondary' }}
          >
            <IconButton
              color="inherit"
              size="small"
              href="https://github.com/anjanmandal"
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              size="small"
              href="https://www.linkedin.com/in/madalak/"
              aria-label="LinkedIn"
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </React.Fragment>
  );
}
