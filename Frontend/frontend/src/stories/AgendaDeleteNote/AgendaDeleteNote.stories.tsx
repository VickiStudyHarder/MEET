import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AgendaDeleteNote from "./AgendaDeleteNote";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/AgendaDeleteNote",
  component: AgendaDeleteNote,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AgendaDeleteNote>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AgendaDeleteNote> = (args) => (
  <AgendaDeleteNote {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "Note Title",
  desc: "taken possession of my entire soul, like ",
  author: "Tomas Nikelson",
  time: "5 Hours Ago",
};
