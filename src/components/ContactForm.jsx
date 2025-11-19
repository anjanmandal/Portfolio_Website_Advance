// src/components/ContactForm.jsx

import React, { useState } from 'react';
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
  Stack,
} from '@mui/material';
import { useTheme, styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SectionFrame from './SectionFrame';

// Import your 3D boy model (Ensure you have this component)
// Styled components for modern design
const GlassCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.glass
    ? theme.palette.background.glass
    : alpha(theme.palette.background.paper, 0.7),
  backdropFilter: 'blur(20px)',
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
  boxShadow: theme.shadows[1],
  color: theme.palette.text.primary,
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
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

const MotionTextField = motion(StyledTextField);

const InsightCard = styled(Box)(({ theme }) => ({
  borderRadius: theme.spacing(3),
  padding: theme.spacing(4),
  height: '100%',
  background:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(59,130,246,0.2))'
      : 'linear-gradient(135deg, rgba(238,244,255,0.95), rgba(186,230,253,0.8))',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
  boxShadow: theme.shadows[2],
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

const Highlight = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.primary.main, 0.08)
      : alpha(theme.palette.primary.main, 0.05),
}));

const highlightItems = [
  { label: 'Availability', value: 'Open for internships & freelance projects' },
  { label: 'Response time', value: 'Typically replies within 24 hours' },
  { label: 'Location', value: 'Monroe, LA • Remote-friendly' },
];

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
    <SectionFrame
      ref={ref}
      eyebrow="Let's collaborate"
      title="Contact"
      subtitle="Share a challenge, spark an idea, or just say hi. I typically respond within 24 hours."
      contentSpacing={4}
    >
      <Grid container spacing={4} alignItems="stretch">
        {/* Left Section - Contact Form */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <GlassCard>
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

        {/* Right Section - Highlights */}
        <Grid item xs={12} md={6}>
          <InsightCard>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                Let’s build something meaningful.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                I’m always excited to partner on bold ideas—from rapid MVPs to research-heavy
                initiatives. Here’s what to expect when you reach out.
              </Typography>
            </Box>
            <Stack spacing={2}>
              {highlightItems.map((item) => (
                <Highlight key={item.label}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.label}
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {item.value}
                  </Typography>
                </Highlight>
              ))}
            </Stack>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                Prefer email?
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                endIcon={<SendIcon />}
                href="mailto:anjanmandalwork@gmail.com"
              >
                anjanmandalwork@gmail.com
              </Button>
            </Box>
          </InsightCard>
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
    </SectionFrame>
  );
});

export default ContactForm;
