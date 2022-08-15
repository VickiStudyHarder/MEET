import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


import AvatarMenu from './AvatarMenu'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'AvatarMenu',
  component: AvatarMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   createdBy: 'Alan',
  //   meetingName: 'meeting 1',
  //   pic: "https://bkimg.cdn.bcebos.com/pic/7dd98d1001e93901e320023f7bec54e736d19695?x-bce-process=image/resize,m_lfit,w_440,limit_1/format,f_auto",
  // },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AvatarMenu>;

const Template: ComponentStory<typeof AvatarMenu> = (args) => (<AvatarMenu {...args} />);

export const Test = Template.bind({});
Test.args = {
  pic:'https://uploads.codesandbox.io/uploads/user/3e41a372-fc65-4387-bca0-70a050914db8/VIR9-logo.jpg',
  content: 'is all you need'
};