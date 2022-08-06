import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import NoteListIndex from './NoteListIndex';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'NoteListIndex',
  component: NoteListIndex,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   createdBy: 'Alan',
  //   meetingName: 'meeting 1',
  //   pic: "https://bkimg.cdn.bcebos.com/pic/7dd98d1001e93901e320023f7bec54e736d19695?x-bce-process=image/resize,m_lfit,w_440,limit_1/format,f_auto",
  // },
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NoteListIndex>;

const Template: ComponentStory<typeof NoteListIndex> = (args) => (<NoteListIndex {...args} />);

export const Test = Template.bind({});
Test.args = {
  createdBy: 'Jack Wolf',
  meetingName: 'meeting 1',
  pic: 'https://cdn.britannica.com/41/9641-004-A8DD825D/Yorkshire-boar.jpg',
  description: 'this is a test description this is a test description this is a test description this is a test description',
  // role: student/mentor
  role: 'student', 
  numberOfNotes: '10',
};