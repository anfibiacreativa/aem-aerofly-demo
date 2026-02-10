import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const defaultColumns = [
  {
    title: 'Shop',
    links: [
      { label: "Men's", href: '#' },
      { label: "Women's", href: '#' },
      { label: 'Running', href: '#' },
      { label: 'Training', href: '#' },
      { label: 'Sale', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Shipping & Returns', href: '#' },
      { label: 'Size Guide', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
    ],
  },
];

const socialLinks = [
  { platform: 'Instagram', href: '#' },
  { platform: 'Twitter', href: '#' },
  { platform: 'Facebook', href: '#' },
];

const meta = {
  title: 'Components/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Multi-column footer with optional newsletter signup, social links, and bottom copyright. Dark navy theme by default.',
      },
    },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'minimal', 'centered'] },
    theme: { control: 'select', options: ['dark', 'light'] },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: defaultColumns,
    showNewsletter: false,
    socialLinks,
    bottomText: '© 2026 Aerofly. All rights reserved.',
    variant: 'default',
    theme: 'dark',
  },
};

export const WithNewsletter: Story = {
  args: {
    columns: defaultColumns,
    showNewsletter: true,
    newsletterHeading: 'Stay in the loop',
    newsletterSubheading: 'Get the latest on new releases, exclusive offers, and more.',
    socialLinks,
    bottomText: '© 2026 Aerofly. All rights reserved.',
    variant: 'default',
    theme: 'dark',
  },
};

export const Minimal: Story = {
  args: {
    columns: defaultColumns,
    showNewsletter: false,
    socialLinks: [],
    bottomText: '© 2026 Aerofly. All rights reserved.',
    variant: 'minimal',
    theme: 'dark',
  },
};

export const LightTheme: Story = {
  args: {
    columns: defaultColumns,
    showNewsletter: true,
    newsletterHeading: 'Stay in the loop',
    newsletterSubheading: 'Get the latest on new releases, exclusive offers, and more.',
    socialLinks,
    bottomText: '© 2026 Aerofly. All rights reserved.',
    variant: 'default',
    theme: 'light',
  },
};
