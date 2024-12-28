// Color palette for the application
export const colors = {
  primary: '#2563eb',     // Bright Blue
  secondary: '#64748b',   // Slate Gray
  background: '#f8fafc',  // Very Light Gray-Blue
  surface: '#ffffff',     // White
  surfaceVariant: '#f1f5f9', // Light Gray-Blue
  border: '#e2e8f0',      // Light Gray
  text: '#334155',        // Dark Slate
  error: '#ef4444',       // Red
  warning: '#f59e0b',     // Amber
  success: '#10b981',     // Emerald
  interactive: '#3b82f6'  // Blue
};

// Get a specific color from the palette
export function getColor(colorName) {
  return colors[colorName] || colors.text;
}

// Get a specific color with opacity
export function getColorWithOpacity(colorName, opacity = 1) {
  const color = colors[colorName] || colors.text;
  
  // Convert hex to rgb
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

// Category colors mapping
export const categoryColors = {
  housing: 'primary',
  utilities: 'interactive',
  food: 'success',
  transportation: 'warning',
  healthcare: 'error',
  entertainment: 'secondary',
  other: 'text'
};

// Mantine theme configuration
export const createThemeConfig = () => ({
  colors: {
    // Custom color swatches for Mantine
    brand: [
      '#c7d2fe',  // Lightest
      '#87a5ff',  
      '#5c7dff',  
      '#3b6eff',  
      '#2563eb',  // Original color
      '#1d4cf7',  
      '#1a53f0',  
      '#1456e4',  
      '#0f4cd9'   // Darkest
    ],
    success: [
      '#ccffec',  // Lightest
      '#b2ffd9',  
      '#8bf7b3',  
      '#6ee7a7',  
      '#10b981',  // Original color
      '#059669',  
      '#047857',  
      '#03694e',  
      '#025d4e'   // Darkest
    ],
    error: [
      '#fee2e2',  // Lightest
      '#ffd7d5',  
      '#ffc5c5',  
      '#ffa8a8',  
      '#ef4444',  // Original color
      '#e53e3e',  
      '#c53030',  
      '#a12626',  
      '#75191f'   // Darkest
    ],
    warning: [
      '#fef9c3',  // Lightest
      '#fef3c5',  
      '#fde68a',  
      '#fcd34d',  
      '#f59e0b',  // Original color
      '#d97706',  
      '#b45309',  
      '#a16207',  
      '#78350f'   // Darkest
    ],
    interactive: [
      '#c7d2fe',  // Lightest
      '#87a5ff',  
      '#5c7dff',  
      '#3b6eff',  
      '#3b82f6',  // Original color
      '#1d4cf7',  
      '#1a53f0',  
      '#1456e4',  
      '#0f4cd9'   // Darkest
    ],
  },
  primaryColor: 'brand',
  primaryShade: 4,

  defaultRadius: 'sm',
  fontFamily: 'Inter, sans-serif',
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem'
  },

  components: {
    AppShell: {
      defaultProps: {
        style: {
          backgroundColor: colors.background
        }
      }
    },
    Container: {
      defaultProps: {
        style: {
          backgroundColor: colors.background
        }
      }
    },
    Paper: {
      defaultProps: {
        shadow: 'sm',
        p: 'md',
        withBorder: true,
        style: {
          backgroundColor: colors.surface,
          borderColor: colors.border
        }
      }
    },
    Button: {
      defaultProps: {
        color: 'brand'
      }
    },
    ActionIcon: {
      defaultProps: {
        color: 'brand'
      }
    },
    Text: {
      defaultProps: {
        style: {
          color: colors.text
        }
      }
    },
    Modal: {
      defaultProps: {
        overlayProps: {
          color: colors.background,
          opacity: 0.55,
          blur: 3
        },
        styles: {
          title: {
            color: colors.text
          },
          header: {
            backgroundColor: colors.surfaceVariant
          },
          body: {
            backgroundColor: colors.surface
          }
        }
      }
    },
    Alert: {
      defaultProps: {
        radius: 'md',
        styles: {
          root: {
            border: `1px solid ${colors.border}`
          }
        }
      }
    }
  },

  other: {
    colors: colors
  }
});
