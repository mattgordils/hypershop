module.exports = {
  content: [
    "./layout/*.liquid",
    "./templates/*.liquid",
    "./sections/*.liquid",
    "./snippets/*.liquid",
    "./blocks/*.liquid",
  ],
  safelist: [],
  darkMode: "class",
  theme: {
    colors: {
      'current': 'currentColor',
      'transparent': 'transparent',
      'true-black': '#000000',
      'bg': 'var(--bg-color)',
      'main': 'var(--main-color)',
      'text-color': 'var(--text-color)',
      'light-text-color': 'var(--light-text-color)',
      'hr-color': 'var(--hr-color)',
      'light-grey': 'var(--light-grey)',
      'error': 'var(--error)',
      'success': 'var(--success)',
      'alert': 'var(--alert)'
    },
    borderRadius: {
      'none': '0',
      'sm': '4px',
      DEFAULT: 'var(--base-border-radius)',
      'button': 'var(--button-border-radius)',
      'md': '12px',
      'lg': '20px',
      'full': '9999px',
      'large': '30px',
    },
    extend: {
      spacing: {
        'gutter': 'var(--site-gutters)',
        'margin': 'var(--site-margins)',
        'half-gutter': 'calc(var(--site-gutters) / 2)',
        'half-margin': 'calc(var(--site-margins) / 2)',
        'v-space': 'var(--vertical-spacing)',
        'half-v-space': 'calc(var(--vertical-spacing) / 2)',
        'v-space-sm': 'var(--vertical-spacing-small)',
        'v-space-lg': 'var(--vertical-spacing-large)',
        'header-banner-height': 'var(--header-banner-height)',
        'header-height': 'var(--header-height)',
        'sticky-top': 'var(--sticky-top)',
        'full-header-height': 'var(--full-header-height)',
        'screen-height': 'calc(100 * var(--vh))',
        'screen-small': '50vh',
        'screen-medium': '75vh',
      },
      maxWidth: {
        'site-max-w': 'var(--site-max-width)',
        'narrow': 'var(--narrow-width)',
        '1/2': '50%',
        '1/3': '33.333%',
        '1/4': '25%'
      },
      transitionDuration: {
        DEFAULT: 'var(--md-speed)',
        'slow': 'var(--slow-speed)',
        'fast': 'var(--fast-speed)'
      },
      transitionProperty: {
        'width': 'width, min-width',
        'height': 'height, min-height',
        'top': 'top'
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
      },
      aspectRatio: {
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '3/4': '3 / 4',
        '4/3': '4 / 3'
      },
      transitionDelay: {
        'stagger-time': 'var(--stagger-time)',
      }
    }
  },
  plugins: [],
};
