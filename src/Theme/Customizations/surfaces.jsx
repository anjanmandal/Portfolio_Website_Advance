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
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        border: '1px solid',
        borderColor: theme.palette.divider,
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: theme.shadows[1],
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
          boxShadow: theme.shadows[4],
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
          backgroundColor: theme.palette.background.paper,
          borderRadius: theme.shape.borderRadius,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
          boxShadow: theme.shadows[2],
          backdropFilter: 'blur(20px)',
          ...theme.applyStyles('dark', {
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
          }),
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: theme.shadows[8],
            borderColor: alpha(theme.palette.primary.main, 0.3),
          },
          variants: [
            {
              props: {
                variant: 'outlined',
              },
              style: {
                border: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                boxShadow: theme.shadows[1],
                background: theme.palette.background.paper,
                ...theme.applyStyles('dark', {
                  background: alpha(theme.palette.background.paper, 0.6),
                }),
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