import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CalendarMentorConfirmedMeetings from "./CalendarMentorConfirmedMeetings";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/CalendarMentorConfirmedMeetings",
  component: CalendarMentorConfirmedMeetings,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CalendarMentorConfirmedMeetings>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CalendarMentorConfirmedMeetings> = (
  args
) => <CalendarMentorConfirmedMeetings {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  date: ["01", "DEC", "2022"],
  meetingName: "Meeting name",
  time: "12:00 - 13:00",
};
