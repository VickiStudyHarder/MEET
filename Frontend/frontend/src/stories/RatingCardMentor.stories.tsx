import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RatingCardMentor from './RatingCardMentor';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'RatingCardMentor',
  component: RatingCardMentor,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RatingCardMentor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RatingCardMentor> = (args) => (<RatingCardMentor {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  imageUrl: "https://cdn.britannica.com/41/9641-004-A8DD825D/Yorkshire-boar.jpg",
  userName:"Charlie",
  UserType: "Student",
  Part_rate: 60
};