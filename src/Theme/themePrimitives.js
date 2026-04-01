import { createTheme, alpha } from '@mui/material/styles';

const defaultTheme = createTheme();
const customShadows = [...defaultTheme.shadows];

const fontPrimary = '"Space Grotesk", "Inter", "system-ui", sans-serif';

export const brand = {
  50: '#FFF7F1',
  100: '#FDE9DA',
  200: '#F8D1B3',
  300: '#F0B182',
  400: '#E38D57',
  500: '#D46F3A',
  600: '#B85A2E',
  700: '#8F4524',
  800: '#64311A',
  900: '#3D1C0D',
};

export const gray = {
  50: '#FBF8F4',
  100: '#F3EEE7',
  200: '#E3DBD1',
  300: '#CDC1B2',
  400: '#9F9284',
  500: '#74695E',
  600: '#564D46',
  700: '#3B342F',
  800: '#221D1A',
  900: '#14110F',
};

export const green = {
  50: '#ECF7F1',
  100: '#D2ECDD',
  200: '#A7D8BD',
  300: '#79BF99',
  400: '#4FA977',
  500: '#36895D',
  600: '#2A6B49',
  700: '#1F5138',
  800: '#153629',
  900: '#0C1D16',
};

export const orange = {
  50: '#FFF6ED',
  100: '#FEE7D3',
  200: '#FBCDAB',
  300: '#F3AF7A',
  400: '#EA8B4F',
  500: '#DA6D2C',
  600: '#B85822',
  700: '#8C421A',
  800: '#5E2C12',
  900: '#341708',
};

export const red = {
  50: '#FFF1F3',
  100: '#FFD5DA',
  200: '#FFADB8',
  300: '#FF7A90',
  400: '#FF4D6D',
  500: '#E03157',
  600: '#B21C3F',
  700: '#7F102A',
  800: '#4D0818',
  900: '#24030B',
};

export const getDesignTokens = (mode) => {
  customShadows[1] =
    mode === 'dark'
      ? '0 18px 48px rgba(8, 6, 4, 0.34)'
      : '0 18px 40px rgba(74, 56, 35, 0.08)';
  customShadows[2] =
    mode === 'dark'
      ? '0 14px 34px rgba(8, 6, 4, 0.28)'
      : '0 12px 28px rgba(74, 56, 35, 0.07)';
  customShadows[4] =
    mode === 'dark'
      ? '0 18px 42px rgba(8, 6, 4, 0.32)'
      : '0 18px 36px rgba(74, 56, 35, 0.08)';
  customShadows[8] =
    mode === 'dark'
      ? '0 22px 56px rgba(8, 6, 4, 0.4)'
      : '0 22px 48px rgba(74, 56, 35, 0.1)';

  const gradientBackground =
    mode === 'dark'
      ? `radial-gradient(circle at 18% 12%, ${alpha(brand[400], 0.16)} 0%, transparent 30%),
         radial-gradient(circle at 82% 0%, ${alpha(gray[50], 0.06)} 0%, transparent 26%),
         linear-gradient(180deg, #151210 0%, #171411 46%, #1a1713 100%)`
      : `radial-gradient(circle at 14% 10%, ${alpha(brand[300], 0.14)} 0%, transparent 28%),
         radial-gradient(circle at 84% 6%, ${alpha(gray[300], 0.18)} 0%, transparent 24%),
         linear-gradient(180deg, #fcfaf7 0%, #f7f3ed 46%, #f2ede6 100%)`;

  const bodyColor = mode === 'dark' ? alpha(gray[50], 0.9) : gray[600];
  const mutedColor = mode === 'dark' ? alpha(gray[200], 0.76) : gray[500];

  return {
    palette: {
      mode,
      primary: {
        light: mode === 'dark' ? brand[300] : brand[400],
        main: mode === 'dark' ? brand[400] : brand[600],
        dark: mode === 'dark' ? brand[500] : brand[700],
        contrastText: '#fffaf5',
      },
      secondary: {
        light: mode === 'dark' ? orange[200] : orange[200],
        main: mode === 'dark' ? orange[300] : orange[400],
        dark: mode === 'dark' ? orange[400] : orange[600],
        contrastText: '#fffaf5',
      },
      info: {
        light: brand[200],
        main: brand[500],
        dark: brand[700],
        contrastText: '#fffaf5',
      },
      warning: {
        light: orange[200],
        main: orange[400],
        dark: orange[600],
      },
      error: {
        light: red[200],
        main: red[500],
        dark: red[700],
      },
      success: {
        light: green[200],
        main: green[400],
        dark: green[700],
      },
      grey: {
        ...gray,
      },
      divider: mode === 'dark' ? alpha(gray[100], 0.08) : alpha(gray[500], 0.14),
      background: {
        default: mode === 'dark' ? '#151210' : '#fcfaf7',
        paper: mode === 'dark' ? 'rgba(26, 23, 19, 0.9)' : 'rgba(255, 250, 243, 0.9)',
        glass: mode === 'dark' ? 'rgba(28, 24, 21, 0.72)' : 'rgba(255, 251, 246, 0.7)',
        gradient: gradientBackground,
      },
      text: {
        primary: mode === 'dark' ? '#F8F3ED' : '#1D1712',
        secondary: mode === 'dark' ? alpha(gray[200], 0.8) : '#6D6258',
      },
      action: {
        hover: alpha(mode === 'dark' ? gray[50] : gray[700], 0.05),
        selected: alpha(mode === 'dark' ? brand[300] : brand[600], 0.12),
        active: alpha(mode === 'dark' ? gray[100] : gray[700], 0.32),
      },
    },
    typography: {
      fontFamily: fontPrimary,
      h1: {
        fontSize: defaultTheme.typography.pxToRem(56),
        fontWeight: 700,
        lineHeight: 1.08,
        letterSpacing: '-1.3px',
      },
      h2: {
        fontSize: defaultTheme.typography.pxToRem(42),
        fontWeight: 650,
        lineHeight: 1.16,
        letterSpacing: '-0.5px',
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(32),
        fontWeight: 650,
        lineHeight: 1.22,
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(26),
        fontWeight: 650,
        lineHeight: 1.32,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(22),
        fontWeight: 650,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 650,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 500,
        color: mutedColor,
      },
      subtitle2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 600,
        letterSpacing: 0.24,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(16),
        lineHeight: 1.7,
        color: bodyColor,
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 500,
        lineHeight: 1.62,
        color: bodyColor,
      },
      caption: {
        fontSize: defaultTheme.typography.pxToRem(12),
        fontWeight: 600,
        letterSpacing: 0.42,
        color: mutedColor,
      },
      button: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: 0.18,
      },
    },
    shape: {
      borderRadius: 5,
    },
    shadows: customShadows,
  };
};
