import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import New_StuGro_box from './New_StuGro_box';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/New_StuGro_box',
  component: New_StuGro_box,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof New_StuGro_box>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof New_StuGro_box> = (args) => (<New_StuGro_box {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  imageUrl: "",
  GroupName:"Human Resource",
  NumofMember: 10,
  GroupLink: ""
};