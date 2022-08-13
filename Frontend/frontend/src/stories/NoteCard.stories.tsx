import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import NoteCard from './NoteCard';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NoteCard',
  component: NoteCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   createdBy: 'Alan',
  //   meetingName: 'meeting 1',
  //   pic: "https://bkimg.cdn.bcebos.com/pic/7dd98d1001e93901e320023f7bec54e736d19695?x-bce-process=image/resize,m_lfit,w_440,limit_1/format,f_auto",
  // },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteCard>;

const Template: ComponentStory<typeof NoteCard> = (args) => (<NoteCard {...args} />);

export const Test = Template.bind({});
Test.args = {
  pic: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/List-Icon.svg/1200px-List-Icon.svg.png',
  title: 'Customer Support',
  numberOfNotes: '15', 
};