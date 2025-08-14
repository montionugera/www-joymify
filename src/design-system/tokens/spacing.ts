export const spacing = {
  // Base spacing unit (4px)
  base: 4,

  // Spacing scale (4px increments)
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
  36: '144px',
  40: '160px',
  44: '176px',
  48: '192px',
  52: '208px',
  56: '224px',
  60: '240px',
  64: '256px',
  72: '288px',
  80: '320px',
  96: '384px',

  // Semantic spacing
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',

  // Component-specific spacing
  component: {
    padding: {
      xs: '4px 8px',
      sm: '8px 12px',
      md: '12px 16px',
      lg: '16px 24px',
      xl: '20px 32px',
    },
    margin: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
    gap: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  },

  // Layout spacing
  layout: {
    container: {
      padding: '0 16px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    section: {
      padding: '64px 0',
    },
    page: {
      padding: '24px',
    },
  },

  // Border radius
  borderRadius: {
    none: '0px',
    sm: '2px',
    base: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
    '3xl': '24px',
    full: '9999px',
  },

  // Border width
  borderWidth: {
    none: '0px',
    thin: '1px',
    base: '2px',
    thick: '4px',
  },
} as const;

export type SpacingToken = typeof spacing;
