import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import StudentCard from "./StudentCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/StudentCard",
  component: StudentCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof StudentCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof StudentCard> = (args) => (
  <StudentCard {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  imageUrl: "",
  userName: "Charlie",
  courseName: "COMP9323",
};
