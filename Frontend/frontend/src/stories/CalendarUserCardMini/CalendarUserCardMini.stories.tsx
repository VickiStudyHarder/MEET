import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CalendarUserCardMini from "./CalendarUserCardMini";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/CalendarUserCardMini",
  component: CalendarUserCardMini,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CalendarUserCardMini>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CalendarUserCardMini> = (args) => (
  <CalendarUserCardMini {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  avator: " ",
  name: "Charlie Grimm",
};
