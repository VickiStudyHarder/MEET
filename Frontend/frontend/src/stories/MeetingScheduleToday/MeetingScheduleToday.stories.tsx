import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MeetingScheduleToday from './MeetingScheduleToday'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/MeetingScheduleToday',
  component: MeetingScheduleToday,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof MeetingScheduleToday>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MeetingScheduleToday> = (args) => (<MeetingScheduleToday {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  date: ['01','DEC','2022'],
  meetingName:'Meeting name',
  time:'12:00 - 13:00',
};
