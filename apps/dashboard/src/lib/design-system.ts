/**
 * Plokitch Design System Tokens
 * Shared constants for styling consistency
 */

export const COLORS = {
  navy: '#001a40',
  primary: '#d4af37', // Gold
  action: '#d4af37',
  actionHover: '#c5a028',
  gold: '#d4af37',
  beige: '#f4f3ea',
  white: '#ffffff',
  divider: 'rgba(0, 26, 64, 0.08)',
  subtle: '#66768c',
  placeholder: '#99a3b2',
} as const;

export const RADII = {
  card: '12px',
  button: '8px',
  input: '8px',
  lg: '12px',
  md: '8px',
  sm: '4px',
  pill: '9999px',
} as const;

export const SHADOWS = {
  card: '0 4px 24px rgba(0, 26, 64, 0.08)',
  glass: '0 2px 12px rgba(0, 26, 64, 0.14)',
} as const;

export const TRANSITIONS = {
  default: 'all 150ms ease-in-out',
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  },
} as const;
