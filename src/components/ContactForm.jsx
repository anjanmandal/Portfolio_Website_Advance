// src/components/ContactForm.jsx

import React, { forwardRef, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Snackbar,
  Alert,
  CircularProgress,
  Stack,
  Chip,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import SendIcon from '@mui/icons-material/Send';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SectionFrame from './SectionFrame';

const topicOptions = [
  { label: 'AI product', subject: 'AI product collaboration' },
  { label: 'Full-stack MVP', subject: 'Full-stack MVP build' },
  { label: 'Research prototype', subject: 'Research prototype collaboration' },
  { label: 'Internship / freelance', subject: 'Internship or freelance opportunity' },
];

const ContactShell = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 980,
  marginInline: 'auto',
}));

const FormPanel = styled(Box)(({ theme }) => ({
  borderRadius: 28,
  border: `1px solid ${theme.palette.divider}`,
  background:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.84)
      : alpha(theme.palette.common.white, 0.82),
  boxShadow: theme.shadows[1],
  backdropFilter: 'blur(18px)',
  padding: theme.spacing(2.4),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const TopicGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(1),
  gridTemplateColumns: '1fr',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  },
}));

const TopicButton = styled('button', {
  shouldForwardProp: (prop) => !['active'].includes(prop),
})(({ theme, active }) => ({
  width: '100%',
  textAlign: 'left',
  borderRadius: 18,
  border: `1px solid ${
    active ? alpha(theme.palette.primary.main, 0.22) : theme.palette.divider
  }`,
  background:
    active
      ? theme.palette.mode === 'dark'
        ? alpha(theme.palette.primary.main, 0.12)
        : alpha(theme.palette.primary.main, 0.08)
      : theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.74)
        : alpha(theme.palette.common.white, 0.72),
  padding: theme.spacing(1.25, 1.35),
  cursor: 'pointer',
  appearance: 'none',
  transition: 'transform 160ms ease, border-color 160ms ease, background 160ms ease',
  '&:hover': {
    transform: 'translateY(-1px)',
    borderColor: alpha(theme.palette.primary.main, 0.18),
  },
  '&:focus-visible': {
    outline: `3px solid ${alpha(theme.palette.primary.main, 0.22)}`,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? alpha(theme.palette.common.white, 0.04)
        : alpha(theme.palette.common.white, 0.82),
    borderRadius: 16,
    color: theme.palette.text.primary,
    boxSizing: 'border-box',
  },
  '& .MuiInputBase-input': {
    height: 'auto',
  },
  '& .MuiInputBase-inputMultiline': {
    padding: 0,
    lineHeight: 1.55,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: alpha(theme.palette.primary.main, 0.22),
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.12)}`,
    },
  },
  '& .MuiOutlinedInput-root.MuiInputBase-multiline': {
    alignItems: 'flex-start',
    padding: theme.spacing(1.35, 1.5),
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main,
  },
}));

const MotionField = motion(StyledTextField);

const MessageFieldShell = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.75),
}));

const MessageLabel = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  lineHeight: 1.2,
  color: theme.palette.text.secondary,
}));

const MessageTextarea = styled('textarea')(({ theme }) => ({
  width: '100%',
  minHeight: 170,
  borderRadius: 16,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? alpha(theme.palette.common.white, 0.04)
      : alpha(theme.palette.common.white, 0.82),
  color: theme.palette.text.primary,
  padding: theme.spacing(1.5),
  font: 'inherit',
  lineHeight: 1.6,
  resize: 'vertical',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 160ms ease, box-shadow 160ms ease',
  '&::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.85,
  },
  '&:hover': {
    borderColor: alpha(theme.palette.primary.main, 0.22),
  },
  '&:focus': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.12)}`,
  },
}));

const SubmitRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.2),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const validationSchema = Yup.object({
  user_name: Yup.string().required('Name is required'),
  user_email: Yup.string().email('Invalid email format').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

const ContactForm = forwardRef((props, ref) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('');

  const USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

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
      emailjs.send(SERVICE_ID, TEMPLATE_ID, values, USER_ID).then(
        () => {
          setSnackbarMessage('Message sent successfully!');
          setSnackbarSeverity('success');
          setOpenSnackbar(true);
          setIsSubmitting(false);
          setSelectedTopic('');
          resetForm();
        },
        () => {
          setSnackbarMessage('An error occurred, please try again.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
          setIsSubmitting(false);
        }
      );
    },
  });

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic.label);
    formik.setFieldValue('subject', topic.subject);
  };

  return (
    <SectionFrame
      ref={ref}
      eyebrow="Open channel"
      title="Contact"
      subtitle="A simple way to start a conversation about the next build."
      contentSpacing={4}
    >
      <ContactShell>
        <FormPanel
          component={motion.div}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.08 }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1.2}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Send a message
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.6 }}>
                Short context is enough. I usually reply within 24 hours.
              </Typography>
            </Box>

            <Button
              variant="outlined"
              color="secondary"
              startIcon={<EmailIcon />}
              href="mailto:anjanmandalwork@gmail.com"
              sx={{ width: { xs: '100%', sm: 'fit-content' } }}
            >
              Email directly
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="AI products" size="small" variant="outlined" />
            <Chip label="Remote-friendly" size="small" variant="outlined" />
          </Stack>

          <TopicGrid>
            {topicOptions.map((topic) => (
              <TopicButton
                key={topic.label}
                type="button"
                active={selectedTopic === topic.label}
                onClick={() => handleTopicSelect(topic)}
              >
                <Stack spacing={0.45}>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {topic.label}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {topic.subject}
                  </Typography>
                </Stack>
              </TopicButton>
            ))}
          </TopicGrid>

          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              display: 'grid',
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gap: 2,
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
              }}
            >
              <MotionField
                id="user_name"
                variant="outlined"
                label="Name"
                name="user_name"
                required
                fullWidth
                value={formik.values.user_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                helperText={formik.touched.user_name && formik.errors.user_name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.28 }}
              />

              <MotionField
                id="user_email"
                variant="outlined"
                label="Email"
                name="user_email"
                type="email"
                required
                fullWidth
                value={formik.values.user_email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.user_email && Boolean(formik.errors.user_email)}
                helperText={formik.touched.user_email && formik.errors.user_email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.28, delay: 0.04 }}
              />
            </Box>

            <MotionField
              id="subject"
              variant="outlined"
              label="Subject"
              name="subject"
              required
              fullWidth
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SubjectIcon color="action" />
                  </InputAdornment>
                ),
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.28, delay: 0.08 }}
            />

            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.28, delay: 0.12 }}
            >
              <MessageFieldShell>
                <MessageLabel>
                  Message *
                </MessageLabel>
                <MessageTextarea
                  id="message"
                  name="message"
                  placeholder="Tell me what you're building, your timeline, or how I can help."
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.message && formik.errors.message ? (
                  <Typography variant="caption" color="error">
                    {formik.errors.message}
                  </Typography>
                ) : null}
              </MessageFieldShell>
            </Box>

            <SubmitRow>
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 420 }}>
                A few lines of context is enough.
              </Typography>

              <Button
                variant="contained"
                type="submit"
                endIcon={!isSubmitting ? <SendIcon /> : null}
                disabled={isSubmitting}
                sx={{ minWidth: 180 }}
              >
                {isSubmitting ? <CircularProgress size={22} color="inherit" /> : 'Send message'}
              </Button>
            </SubmitRow>
          </Box>
        </FormPanel>
      </ContactShell>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SectionFrame>
  );
});

export default ContactForm;
