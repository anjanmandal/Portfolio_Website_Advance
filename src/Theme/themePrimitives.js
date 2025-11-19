import { createTheme, alpha } from '@mui/material/styles';

const defaultTheme = createTheme();
const customShadows = [...defaultTheme.shadows];

const fontPrimary = '"Space Grotesk", "Inter", "system-ui", sans-serif';

export const brand = {
  50: '#EEF2FF',
  100: '#D6DEFF',
  200: '#B3C2FF',
  300: '#8C9DFE',
  400: '#6A79FA',
  500: '#5057F5',
  600: '#3A3CD5',
  700: '#2929AA',
  800: '#1B1F7A',
  900: '#11124A',
};

export const gray = {
  50: '#F8FAFD',
  100: '#EEF1F8',
  200: '#DBE0ED',
  300: '#C2C8D9',
  400: '#949BB3',
  500: '#6B738A',
  600: '#4C5266',
  700: '#34384A',
  800: '#1F2332',
  900: '#0C0F1A',
};

export const green = {
  50: '#E8FBF4',
  100: '#C4F5E3',
  200: '#95E9CF',
  300: '#63DDB8',
  400: '#33C8A1',
  500: '#16A185',
  600: '#0F7F6A',
  700: '#0C5F50',
  800: '#083F36',
  900: '#04231E',
};

export const orange = {
  50: '#FFF4ED',
  100: '#FFE3D3',
  200: '#FFC2A3',
  300: '#FF9B6D',
  400: '#FF7A45',
  500: '#E85A28',
  600: '#B7421C',
  700: '#8A2F14',
  800: '#5C1D0C',
  900: '#2F0D05',
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
      ? '0 30px 80px rgba(2, 6, 23, 0.65)'
      : '0 25px 60px rgba(15, 23, 42, 0.12)';
  customShadows[8] =
    mode === 'dark'
      ? '0 20px 60px rgba(6, 13, 34, 0.6)'
      : '0 18px 40px rgba(15, 23, 42, 0.08)';

  const gradientBackground =
    mode === 'dark'
      ? 'radial-gradient(circle at 25% -15%, rgba(37, 99, 235, 0.22), transparent 50%), radial-gradient(circle at 80% 10%, rgba(14, 165, 233, 0.2), transparent 45%), radial-gradient(circle at 10% 120%, rgba(16, 185, 129, 0.15), transparent 45%), linear-gradient(135deg, #04070f 0%, #0a1424 55%, #050b16 100%)'
      : 'radial-gradient(circle at 25% -15%, rgba(59,130,246,0.18), transparent 45%), radial-gradient(circle at 80% 5%, rgba(168,85,247,0.12), transparent 40%), linear-gradient(135deg, #f8fbff 0%, #eef2ff 55%, #f1f5ff 100%)';
  const bodyColor = mode === 'dark' ? alpha(gray[50], 0.9) : gray[600];
  const mutedColor = mode === 'dark' ? alpha(gray[200], 0.8) : gray[500];

  return {
    palette: {
      mode,
      primary: {
        light: mode === 'dark' ? '#7dd3fc' : '#60a5fa',
        main: mode === 'dark' ? '#38bdf8' : '#2563eb',
        dark: mode === 'dark' ? '#0ea5e9' : '#1d4ed8',
        contrastText: '#f8fbff',
      },
      secondary: {
        light: mode === 'dark' ? '#c084fc' : '#d8b4fe',
        main: mode === 'dark' ? '#a855f7' : '#9333ea',
        dark: mode === 'dark' ? '#7c3aed' : '#6b21a8',
        contrastText: '#fdfbff',
      },
      info: {
        light: '#a5b4fc',
        main: '#6366f1',
        dark: '#4338ca',
        contrastText: '#fdfbff',
      },
      warning: {
        light: '#fde68a',
        main: '#f97316',
        dark: '#c2410c',
      },
      error: {
        light: '#fecdd3',
        main: '#fb7185',
        dark: '#be123c',
      },
      success: {
        light: '#bbf7d0',
        main: '#34d399',
        dark: '#059669',
      },
      grey: {
        ...gray,
      },
      divider: mode === 'dark' ? alpha(gray[700], 0.6) : alpha(gray[300], 0.35),
      background: {
        default: mode === 'dark' ? '#03070f' : '#f8fbff',
        paper: mode === 'dark' ? 'rgba(9, 16, 34, 0.95)' : '#ffffff',
        glass: mode === 'dark' ? 'rgba(9, 14, 32, 0.75)' : 'rgba(255,255,255,0.75)',
        gradient: gradientBackground,
      },
      text: {
        primary: mode === 'dark' ? '#F8FAFF' : '#0f172a',
        secondary: mode === 'dark' ? alpha(gray[200], 0.85) : '#475569',
      },
      action: {
        hover: alpha(mode === 'dark' ? gray[500] : gray[300], 0.18),
        selected: alpha(mode === 'dark' ? gray[500] : gray[300], 0.3),
        active: alpha(mode === 'dark' ? gray[200] : gray[500], 0.4),
      },
    },
    typography: {
      fontFamily: fontPrimary,
      h1: {
        fontSize: defaultTheme.typography.pxToRem(56),
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-1.4px',
      },
      h2: {
        fontSize: defaultTheme.typography.pxToRem(42),
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.4px',
      },
      h3: {
        fontSize: defaultTheme.typography.pxToRem(32),
        fontWeight: 600,
        lineHeight: 1.25,
      },
      h4: {
        fontSize: defaultTheme.typography.pxToRem(26),
        fontWeight: 600,
        lineHeight: 1.35,
      },
      h5: {
        fontSize: defaultTheme.typography.pxToRem(22),
        fontWeight: 600,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 500,
        color: mutedColor,
      },
      subtitle2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 600,
        letterSpacing: 0.3,
      },
      body1: {
        fontSize: defaultTheme.typography.pxToRem(16),
        lineHeight: 1.7,
        color: bodyColor,
      },
      body2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 500,
        lineHeight: 1.6,
        color: bodyColor,
      },
      caption: {
        fontSize: defaultTheme.typography.pxToRem(12),
        fontWeight: 500,
        letterSpacing: 0.5,
        color: mutedColor,
      },
      button: {
        fontSize: defaultTheme.typography.pxToRem(14),
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: 0.2,
      },
    },
    shape: {
      borderRadius: 16,
    },
    shadows: customShadows,
  };
};







