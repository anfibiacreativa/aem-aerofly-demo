import type { Meta, StoryObj } from '@storybook/react';
import { TestimonialSlider } from './TestimonialSlider';

const meta = {
  title: 'Components/TestimonialSlider',
  component: TestimonialSlider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Display testimonials as cards in a horizontal flex row. Shows quote, author, role, avatar, and star rating with decorative quotation mark.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'card', 'minimal'],
    },
    theme: {
      control: 'select',
      options: ['light', 'dark'],
    },
  },
} satisfies Meta<typeof TestimonialSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

const aeroflyTestimonials = [
  {
    quote:
      "These are the lightest racing flats I've ever worn. The AeroWeave upper disappeared on my feet during my last marathon. PR by 4 minutes!",
    author: 'Marcus Chen',
    role: 'Marathon Runner, Boston',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    rating: 5,
  },
  {
    quote:
      "Finally, a shoe that doesn't sacrifice cushioning for weight. The ReactFoam midsole absorbed every impact on my 20-miler. Zero knee pain.",
    author: 'Sarah Mitchell',
    role: 'Ultra Runner',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    rating: 5,
  },
  {
    quote:
      "I was skeptical about recycled materials, but these perform just as well as my old racing shoes. Plus, I feel good about the footprint.",
    author: 'James Okonkwo',
    role: 'Track Coach, Lagos',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    rating: 4,
  },
];

const singleTestimonial = [
  {
    quote:
      "After 500 miles, my Aerofly Velocity 2s still feel like new. The outsole shows minimal wear and the cushioning hasn't bottomed out. Best investment I've made in running gear.",
    author: 'Elena Rodriguez',
    role: 'Triathlete & Running Club Founder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    rating: 5,
  },
];

export const Default: Story = {
  args: {
    heading: 'What Runners Are Saying',
    testimonials: aeroflyTestimonials,
    variant: 'default',
    theme: 'light',
  },
};

export const CardVariant: Story = {
  args: {
    heading: 'Trusted by Athletes Worldwide',
    testimonials: aeroflyTestimonials,
    variant: 'card',
    theme: 'light',
  },
};

export const DarkTheme: Story = {
  args: {
    heading: 'Stories from the Run',
    testimonials: aeroflyTestimonials,
    variant: 'default',
    theme: 'dark',
  },
};

export const SingleTestimonial: Story = {
  args: {
    heading: 'Featured Review',
    testimonials: singleTestimonial,
    variant: 'card',
    theme: 'light',
  },
};
