import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RatingCard from './RatingCard';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/RatingCard',
  component: RatingCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RatingCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RatingCard> = (args) => (<RatingCard {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  imageUrl: "",
  userName:"Charlie",
  Rating: 3,
  UserType: "Student",
  Part_rate: 60
};
