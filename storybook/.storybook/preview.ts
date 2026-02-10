import type { Preview } from '@storybook/react';
import '../src/tokens/generated/variables.css';
import '../src/styles/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#FFFFFF' },
        { name: 'warm', value: '#FDF8F3' },
        { name: 'navy', value: '#0A1628' },
        { name: 'sand', value: '#F5E6D3' },
      ],
    },
    layout: 'fullscreen',
  },
};

export default preview;
