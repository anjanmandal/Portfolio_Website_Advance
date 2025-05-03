// src/components/ContactForm.jsx

import React, { useState, Suspense,forwardRef } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useTheme, styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Import your 3D boy model (Ensure you have this component)
import { BoyModel } from './BoyModel'; // Replace with your actual model

// Styled components for modern design
const GlassCard = styled(Box)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(15px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ShinyText = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  backgroundSize: '200% auto',
  animation: 'shine 4s linear infinite',
  '@keyframes shine': {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '200% 50%' },
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.spacing(1),
    color: theme.palette.text.primary,
    boxSizing: 'border-box',
  },
  '& .MuiInputBase-input': {
    height: 'auto',
  },
  '& .MuiInputBase-inputMultiline': {
    padding: theme.spacing(1),
    lineHeight: '1.5',
    height: 'auto',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.5)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.text.primary,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.secondary.main,
      boxShadow: `0 0 0 2px ${theme.palette.secondary.main}`,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.primary,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.secondary.main,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: '#fff',
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(2),
  textTransform: 'none',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.main} 90%)`,
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.3)',
  },
}));

const Particle = styled(Box)(({ theme, size, top, left }) => ({
  position: 'absolute',
  width: size || '10px',
  height: size || '10px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  top: top || '50%',
  left: left || '50%',
  opacity: 0.7,
  animation: 'float 6s ease-in-out infinite',
  '@keyframes float': {
    '0%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
    '100%': { transform: 'translateY(0)' },
  },
}));

const MotionTextField = motion(StyledTextField);

const ContactForm = React.forwardRef((props, ref) => {
  const theme = useTheme();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Access environment variables using import.meta.env in Vite
  const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  // Validation schema using Yup
  const validationSchema = Yup.object({
    user_name: Yup.string().required('Name is required'),
    user_email: Yup.string().email('Invalid email format').required('Email is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required'),
  });

  // Formik form handling
  const formik = useFormik({
    initialValues: {
      user_name: '',
      user_email: '',
      subject: '',
      message: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      setIsSubmitting(true);
      emailjs
        .send(SERVICE_ID, TEMPLATE_ID, values, USER_ID)
        .then(
          (result) => {
            console.log(result.text);
            setSnackbarMessage('Message sent successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            setIsSubmitting(false);
            resetForm();
          },
          (error) => {
            console.log(error.text);
            setSnackbarMessage('An error occurred, please try again.');
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
            setIsSubmitting(false);
          }
        );
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
    ref={ref}
      sx={{
        overflow: 'hidden',
        minHeight: '100vh',
        color: theme.palette.text.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
      }}
    >
      {/* Floating Particles */}
      <Particle top="10%" left="15%" size="8px" />
      <Particle top="30%" left="80%" size="12px" />
      <Particle top="50%" left="40%" size="10px" />
      <Particle top="80%" left="20%" size="6px" />

      {/* Grid Layout */}
      <Grid container spacing={4} sx={{ width: '100%', height: '100%' }}>
        {/* Left Section - Contact Form */}
        <Grid item size={{xs:12, md:6}}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <GlassCard>
              {/* Shiny Heading */}
              <ShinyText variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center' }}>
                Contact Me
              </ShinyText>
              <Typography
                variant="body1"
                sx={{ textAlign: 'center', mb: 4, color: theme.palette.text.primary }}
              >
                I am always open to discussing new projects, creative ideas, or opportunities to be
                part of your visions. Feel free to reach out!
              </Typography>
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}
              >
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <MotionTextField
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                    id="user_name"
                    variant="outlined"
                    label="Name"
                    name="user_name"
                    required
                    fullWidth
                    value={formik.values.user_name}
                    onChange={formik.handleChange}
                    error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                    helperText={formik.touched.user_name && formik.errors.user_name}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon sx={{ color: theme.palette.text.primary }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <MotionTextField
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                    id="user_email"
                    variant="outlined"
                    label="Email"
                    name="user_email"
                    type="email"
                    required
                    fullWidth
                    value={formik.values.user_email}
                    onChange={formik.handleChange}
                    error={formik.touched.user_email && Boolean(formik.errors.user_email)}
                    helperText={formik.touched.user_email && formik.errors.user_email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: theme.palette.text.primary }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>

                {/* Subject Field */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <MotionTextField
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                    id="subject"
                    variant="outlined"
                    label="Subject"
                    name="subject"
                    required
                    fullWidth
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={formik.touched.subject && Boolean(formik.errors.subject)}
                    helperText={formik.touched.subject && formik.errors.subject}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SubjectIcon sx={{ color: theme.palette.text.primary }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <MotionTextField
                    whileHover={{ scale: 1.02 }}
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    variant="outlined"
                    label="Message"
                    name="message"
                    required
                    rows={4} // Set the number of rows here
                    fullWidth
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    error={formik.touched.message && Boolean(formik.errors.message)}
                    helperText={formik.touched.message && formik.errors.message}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <StyledButton
                    variant="contained"
                    type="submit"
                    endIcon={!isSubmitting ? <SendIcon /> : null}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <CircularProgress size={24} /> : 'Send Message'}
                  </StyledButton>
                </motion.div>
              </Box>
            </GlassCard>
          </motion.div>
        </Grid>

        {/* Right Section - 3D Model */}
        <Grid item size={{xs:12, md:6}} sx={{ display: { display: 'block' } }}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
            }}
          >
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.7} />
              <directionalLight position={[7, 5, 5]} intensity={2} />
              <OrbitControls enableZoom={false} enablePan={false} />
              <Suspense fallback={null}>
                <BoyModel scale={[2, 2, 2]} /> {/* Replace with your actual model */}
              </Suspense>
            </Canvas>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
});

export default ContactForm;
