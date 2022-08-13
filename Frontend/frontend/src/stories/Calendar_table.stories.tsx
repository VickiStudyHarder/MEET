import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Calendar_table from './Calendar_table';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Calendar_table',
  component: Calendar_table,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Calendar_table>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Calendar_table> = (args) => (<Calendar_table {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Calendar',
  events: [{
    title: "Meeting",
    color: "#6001D3",//事件块的颜色
    start: "2022-07-23T10:30:00+00:00",
    end: "2022-07-23T12:30:00+00:00"

  }]
};
