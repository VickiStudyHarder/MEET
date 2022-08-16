import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import UserCard from "./UserCard";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/UserCard",
  component: UserCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof UserCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof UserCard> = (args) => (
  <UserCard {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  time: "2022,23,may",
  name: "Rob Gresham",
  star: [1, 2, 3],
  desc: "Whether to agree to the student's request to participate in the meeting？",
};
