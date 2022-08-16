import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import NormalTip from "./NormalTip";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/NormalTip",
  component: NormalTip,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NormalTip>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NormalTip> = (args) => (
  <NormalTip {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  desc: "Success! Meeting cancelled at 9:00~10:00 5/Jul with Kevin XX.",
};
