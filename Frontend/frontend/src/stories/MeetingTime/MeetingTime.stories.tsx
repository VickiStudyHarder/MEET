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
  timeArr:[
    {
      time:"5:00 - 6:00",
      checked:true,
      disabled:false
    },
    {
      time:"6:00 - 7:00",
      checked:true,
      disabled:true
    },
    {
      time:"7:00 - 8:00",
      checked:false,
      disabled:false
    },
    {
      time:"8:00 - 9:00",
      checked:false,
      disabled:false
    },
    {
      time:"9:00 - 10:00",
      checked:false,
      disabled:false
    },
    {
      time:"10:00 - 11:00",
      checked:false,
      disabled:false
    },
    {
      time:"11:00 - 12:00",
      checked:false,
      disabled:false
    },
    {
      time:"12:00 - 13:00",
      checked:false,
      disabled:false
    },
    {
      time:"13:00 - 14:00",
      checked:false,
      disabled:false
    },
    {
      time:"14:00 - 15:00",
      checked:false,
      disabled:false
    },
    {
      time:"15:00 - 16:00",
      checked:false,
      disabled:false
    },
    {
      time:"16:00 - 17:00",
      checked:false,
      disabled:false
    },
    {
      time:"17:00 - 18:00",
      checked:false,
      disabled:false
    },
    {
      time:"18:00 - 19:00",
      checked:false,
      disabled:false
    },
    {
      time:"19:00 - 20:00",
      checked:false,
      disabled:false
    },
    {
      time:"20:00 - 21:00",
      checked:false,
      disabled:false
    }
  ]
};
