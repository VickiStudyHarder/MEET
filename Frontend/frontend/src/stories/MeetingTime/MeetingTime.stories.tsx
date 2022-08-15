import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MeetingTime from './MeetingTime'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/MeetingTime',
  component: MeetingTime,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof MeetingTime>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MeetingTime> = (args) => (<MeetingTime {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label:'Schedule a meeting on 12/Jul?',
  desc:"Success! Meeting booked at 9:00~10:00 5/Jul with Kevin XX.",
};
