import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import LogoImg from "./LogoImg";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "LogoImg",
  component: LogoImg,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   createdBy: 'Alan',
  //   meetingName: 'meeting 1',
  //   pic: "https://bkimg.cdn.bcebos.com/pic/7dd98d1001e93901e320023f7bec54e736d19695?x-bce-process=image/resize,m_lfit,w_440,limit_1/format,f_auto",
  // },
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LogoImg>;

const Template: ComponentStory<typeof LogoImg> = (args) => (
  <LogoImg {...args} />
);

export const Test = Template.bind({});
Test.args = {
  title: "MEET",
  content: "is all you need",
};
