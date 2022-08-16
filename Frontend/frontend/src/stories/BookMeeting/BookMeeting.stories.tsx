import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import BookMeeting from "./BookMeeting";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/BookMeeting",
  component: BookMeeting,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof BookMeeting>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BookMeeting> = (args) => (
  <BookMeeting {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  time: "2022,23,may",
  name: "Rob Gresham",
  desc: "You want to book the meeting on 5/Jul 9:00~10:00 with Alex Regelman? （Video Required）？",
};
