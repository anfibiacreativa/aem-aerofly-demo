import type { Meta, StoryObj } from '@storybook/react';
import { SizeSelector } from './SizeSelector';

const onSelectAction = (size: string) => console.log('Selected size:', size);

const usSizes = ['6', '7', '8', '9', '10', '11', '12', '13', '14'].map((value) => ({
  value,
  available: true,
}));

const usSizesWithUnavailable = [
  { value: '6', available: true },
  { value: '7', available: false },
  { value: '8', available: true },
  { value: '9', available: true },
  { value: '10', available: false },
  { value: '11', available: true },
  { value: '12', available: true },
  { value: '13', available: false },
  { value: '14', available: true },
];

const euSizes = ['39', '40', '41', '42', '43', '44', '45', '46'].map((value) => ({
  value,
  available: true,
}));

const meta = {
  title: 'Components/SizeSelector',
  component: SizeSelector,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Grid of size buttons for product variants. Available sizes are clickable; unavailable sizes are grayed out with strikethrough. Selected size gets accent border. Optional Size Guide link.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'compact', 'minimal'] },
    unit: { control: 'select', options: ['US', 'EU', 'UK'] },
  },
} satisfies Meta<typeof SizeSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    sizes: usSizes,
    selectedSize: '9',
    onSelect: onSelectAction,
    unit: 'US',
    heading: 'Size',
    showGuide: true,
    variant: 'default',
  },
};

export const WithUnavailable: Story = {
  args: {
    sizes: usSizesWithUnavailable,
    selectedSize: '9',
    onSelect: onSelectAction,
    unit: 'US',
    heading: 'Size',
    showGuide: true,
    variant: 'default',
  },
};

export const EUSizes: Story = {
  args: {
    sizes: euSizes,
    selectedSize: '42',
    onSelect: onSelectAction,
    unit: 'EU',
    heading: 'Size',
    showGuide: true,
    variant: 'default',
  },
};

export const Compact: Story = {
  args: {
    sizes: usSizes,
    selectedSize: '10',
    onSelect: onSelectAction,
    unit: 'US',
    heading: 'Size',
    showGuide: false,
    variant: 'compact',
  },
};

export const Minimal: Story = {
  args: {
    sizes: usSizes,
    selectedSize: '8',
    onSelect: onSelectAction,
    unit: 'US',
    heading: 'Size',
    showGuide: true,
    variant: 'minimal',
  },
};
