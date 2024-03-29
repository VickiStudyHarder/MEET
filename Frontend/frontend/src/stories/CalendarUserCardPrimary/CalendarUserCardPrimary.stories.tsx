import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CalendarUserCardPrimary from "./CalendarUserCardPrimary";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/CalendarUserCardPrimary",
  component: CalendarUserCardPrimary,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CalendarUserCardPrimary>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CalendarUserCardPrimary> = (args) => (
  <CalendarUserCardPrimary {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  name: "Hilaria Abernathy",
  job: "Executive",
  rating: 3,
  avatar: " ",
};
