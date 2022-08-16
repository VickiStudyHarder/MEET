import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import SuccessTip from "./SuccessTip";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/SuccessTip",
  component: SuccessTip,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof SuccessTip>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SuccessTip> = (args) => (
  <SuccessTip {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  desc: "Success! Meeting booked at 9:00~10:00 5/Jul with Kevin XX.",
};
