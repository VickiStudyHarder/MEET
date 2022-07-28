import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import RequestCard from './RequestCard';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/RequestCard',
  component: RequestCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof RequestCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RequestCard> = (args) => (<RequestCard {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  imageUrl: "",
  userName:"Charlie",
  MeetingName: "Meeting 1",
  MeetingTime:"2022, 23 May",
  Part_rate: 60,
  Rating: 4
};