import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StudentGroupNameCard from './StudentGroupNameCard';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/StuGro_NameCard',
  component: StudentGroupNameCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof StudentGroupNameCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StudentGroupNameCard> = (args) => (<StudentGroupNameCard {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  imageUrl: "https://live.staticflickr.com/65535/52235219796_6d0b0362ab_q.jpg",
  GroupSpaceLink: "https://www.google.com",
  MyGroupLink: "/",
  userName:"Charlie",
  courseName:"COMP9323"
};
