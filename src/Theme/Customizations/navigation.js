
import { alpha } from '@mui/material/styles';

import { buttonBaseClasses } from '@mui/material/ButtonBase';
import { dividerClasses } from '@mui/material/Divider';
import { menuItemClasses } from '@mui/material/MenuItem';
import { selectClasses } from '@mui/material/Select';
import { tabClasses } from '@mui/material/Tab';

import { gray, brand } from '../themePrimitives';


export const navigationCustomizations = {
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        padding: '6px 8px',
        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: 'transparent',
        },
        [`&.${menuItemClasses.selected}`]: {
          [`&.${menuItemClasses.focusVisible}`]: {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        gap: '0px',
        [`&.${dividerClasses.root}`]: {
          margin: '0 -8px',
        },
      },
      paper: ({ theme }) => ({
        marginTop: '4px',
        borderRadius: 24,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: 'none',
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.9)
            : alpha(theme.palette.common.white, 0.92),
        boxShadow: theme.shadows[2],
        backdropFilter: 'blur(20px) saturate(135%)',
        [`& .${buttonBaseClasses.root}`]: {
          '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, 0.08),
          },
        },
      }),
    },
  },
  MuiSelect: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 999,
        border: '1px solid',
        borderColor: theme.palette.divider,
        backgroundColor:
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.background.paper, 0.84)
            : alpha(theme.palette.common.white, 0.82),
        boxShadow: 'none',
        backdropFilter: 'blur(16px)',
        '&:hover': {
          borderColor: alpha(theme.palette.primary.main, 0.18),
          backgroundColor:
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.background.paper, 0.92)
              : alpha(theme.palette.common.white, 0.94),
        },
        [`&.${selectClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: alpha(theme.palette.primary.main, 0.26),
          boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.08)}`,
        },
        '&:before, &:after': {
          display: 'none',
        },
      }),
      select: ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        '&:focus-visible': {
          backgroundColor: 'transparent',
        },
      }),
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
        fontWeight: 500,
        position: 'relative',
        textDecoration: 'none',
        width: 'fit-content',
        transition: 'color 180ms ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '1px',
          bottom: 0,
          left: 0,
          background: theme.palette.primary.main,
          opacity: 0.32,
          transition: 'width 0.3s ease, opacity 0.3s ease',
        },
        '&:hover': {
          color: theme.palette.primary.main,
        },
        '&:hover::before': {
          opacity: 1,
        },
        '&:focus-visible': {
          outline: `3px solid ${alpha(brand[500], 0.5)}`,
          outlineOffset: '4px',
          borderRadius: '2px',
        },
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        background: theme.palette.background.gradient,
      }),
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&.Mui-selected': {
          color: 'white',
          backgroundColor: theme.palette.grey[900],
        },
        ...theme.applyStyles('dark', {
          '&.Mui-selected': {
            color: 'black',
            backgroundColor: theme.palette.grey[50],
          },
        }),
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: 'fit-content' },
      indicator: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        height: 2,
        borderRadius: 999,
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: '6px 8px',
        marginBottom: '8px',
        textTransform: 'none',
        minWidth: 'fit-content',
        minHeight: 'fit-content',
        color: theme.palette.text.secondary,
        borderRadius: 999,
        border: '1px solid',
        borderColor: alpha(theme.palette.primary.main, 0.08),
        ':hover': {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          borderColor: alpha(theme.palette.primary.main, 0.2),
        },
        [`&.${tabClasses.selected}`]: {
          color: theme.palette.text.primary,
          backgroundColor: alpha(theme.palette.primary.main, 0.06),
          borderColor: alpha(theme.palette.primary.main, 0.16),
        },
      }),
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderTop: '1px solid',
        borderColor: theme.palette.divider,
        flex: 1,
        borderRadius: '99px',
      }),
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: 'transparent',
        border: `1px solid ${gray[400]}`,
        width: 12,
        height: 12,
        borderRadius: '50%',
        '& text': {
          display: 'none',
        },
        '&.Mui-active': {
          border: 'none',
          color: theme.palette.primary.main,
        },
        '&.Mui-completed': {
          border: 'none',
          color: theme.palette.success.main,
        },
        ...theme.applyStyles('dark', {
          border: `1px solid ${gray[700]}`,
          '&.Mui-active': {
            border: 'none',
            color: theme.palette.primary.light,
          },
          '&.Mui-completed': {
            border: 'none',
            color: theme.palette.success.light,
          },
        }),
        variants: [
          {
            props: { completed: true },
            style: {
              width: 12,
              height: 12,
            },
          },
        ],
      }),
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        '&.Mui-completed': {
          opacity: 0.6,
          ...theme.applyStyles('dark', { opacity: 0.5 }),
        },
      }),
    },
  },
};
