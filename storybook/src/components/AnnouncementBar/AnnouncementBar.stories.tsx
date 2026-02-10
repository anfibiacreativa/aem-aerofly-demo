import type { Meta, StoryObj } from '@storybook/react';
import { AnnouncementBar } from './AnnouncementBar';

const meta = {
  title: 'Components/AnnouncementBar',
  component: AnnouncementBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Thin announcement bar at the top of the page for promos, alerts, and announcements. Supports brand primary, accent (coral), and warning (amber) variants.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'accent', 'warning'] },
  },
} satisfies Meta<typeof AnnouncementBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Free Shipping on Orders Over $150',
    linkText: undefined,
    linkHref: '#',
    dismissible: false,
    variant: 'default',
    icon: undefined,
  },
};

export const Accent: Story = {
  args: {
    message: 'AirPulse Max — Now Available',
    linkText: undefined,
    linkHref: '#',
    dismissible: false,
    variant: 'accent',
    icon: '🔥',
  },
};

export const WithLink: Story = {
  args: {
    message: 'Free Shipping on Orders Over $150',
    linkText: 'Shop Now',
    linkHref: '#',
    dismissible: false,
    variant: 'default',
    icon: undefined,
  },
};

export const Dismissible: Story = {
  args: {
    message: 'Sale: Extra 20% Off All Running Shoes',
    linkText: 'Shop Sale',
    linkHref: '#',
    dismissible: true,
    variant: 'accent',
    icon: undefined,
  },
};

export const Warning: Story = {
  args: {
    message: 'Limited stock — Some sizes selling fast',
    linkText: 'Check Availability',
    linkHref: '#',
    dismissible: true,
    variant: 'warning',
    icon: '⚡',
  },
};
