import { alpha } from '@mui/material/styles';
import { gray } from '../themePrimitives';


export const surfacesCustomizations = {
  MuiAccordion: {
    defaultProps: {
      elevation: 0,
      disableGutters: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 4,
        overflow: 'clip',
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(145deg, ${theme.palette.background.glass}, ${alpha(theme.palette.background.paper, 0.78)})`
            : `linear-gradient(145deg, ${theme.palette.background.glass}, ${alpha(theme.palette.common.white, 0.76)})`,
        borderRadius: theme.shape.borderRadius * 3,
        border: '1px solid',
        borderColor: theme.palette.divider,
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: theme.shadows[1],
        backdropFilter: 'blur(18px)',
        ':before': {
          backgroundColor: 'transparent',
        },
        '&:not(:last-of-type)': {
          borderBottom: 'none',
          marginBottom: theme.spacing(2),
        },
        '&:first-of-type': {
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        },
        '&:last-of-type': {
          borderBottomLeftRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
        },
        '&:hover': {
          boxShadow: theme.shadows[2],
          borderColor: alpha(theme.palette.primary.main, 0.18),
        },
      }),
    },
  },
  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }) => ({
        border: 'none',
        borderRadius: theme.shape.borderRadius,
        transition: 'all 200ms ease',
        '&:hover': { 
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
        },
        '&:focus-visible': { 
          outline: `2px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: 2,
        },
      }),
    },
  },
  MuiAccordionDetails: {
    styleOverrides: {
      root: { mb: 20, border: 'none' },
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: 'none',
        backgroundColor: 'transparent',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          width: '100%',
          padding: theme.spacing(3),
          gap: theme.spacing(2),
          transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          background:
            theme.palette.mode === 'dark'
              ? `linear-gradient(145deg, ${theme.palette.background.glass}, ${alpha(theme.palette.background.paper, 0.82)})`
              : `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.92)}, ${alpha(theme.palette.background.paper, 0.8)})`,
          borderRadius: theme.shape.borderRadius * 3,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[2],
          backdropFilter: 'blur(18px)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[4],
            borderColor: alpha(theme.palette.primary.main, 0.18),
          },
          variants: [
            {
              props: {
                variant: 'outlined',
              },
              style: {
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                boxShadow: theme.shadows[1],
                background:
                  theme.palette.mode === 'dark'
                    ? alpha(theme.palette.background.paper, 0.62)
                    : alpha(theme.palette.common.white, 0.84),
              },
            },
          ],
        };
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 0,
        '&:last-child': { paddingBottom: 0 },
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
};
