import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Meeting_Box from './Meeting_Box';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Meeting_Box',
  component: Meeting_Box,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Meeting_Box>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Meeting_Box> = (args) => (<Meeting_Box {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  Box_name: "Meeting Note",
  Meeting_name1:"Meeting 1",
  Meeting_name2:"Meeting 2"
};