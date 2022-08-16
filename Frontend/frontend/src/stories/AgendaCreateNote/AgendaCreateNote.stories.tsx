import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AgendaCreateNote from "./AgendaCreateNote";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/AgendaCreateNote",
  component: AgendaCreateNote,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AgendaCreateNote>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AgendaCreateNote> = (args) => (
  <AgendaCreateNote {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  title: "Note Title",
  desc: "taken possession of my entire soul, like ",
};
