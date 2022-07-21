import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import FullCalendar from './FullCalendar';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/FullCalendar',
  component: FullCalendar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof FullCalendar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FullCalendar> = (args) => (<FullCalendar {...args}/>);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'FullCalendar',
};
