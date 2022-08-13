import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import PageTitle from './PageTiltle';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'PageTitle',
  component: PageTitle,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   createdBy: 'Alan',
  //   meetingName: 'meeting 1',
  //   pic: "https://bkimg.cdn.bcebos.com/pic/7dd98d1001e93901e320023f7bec54e736d19695?x-bce-process=image/resize,m_lfit,w_440,limit_1/format,f_auto",
  // },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof PageTitle>;

const Template: ComponentStory<typeof PageTitle> = (args) => (<PageTitle {...args} />);

export const Test = Template.bind({});
Test.args = {
  content: 'Recording',
  // 1/2/3/4
  icon: '1',
};