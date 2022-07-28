import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import StuGro_Create from './StuGro_Create';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/StuGro_Create',
  component: StuGro_Create,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof StuGro_Create>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StuGro_Create> = (args) => (<StuGro_Create {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  NewGroupLink: "https://www.google.com",
};