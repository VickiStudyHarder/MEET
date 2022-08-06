import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AgendaList from './AgendaList'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/AgendaList',
  component: AgendaList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AgendaList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AgendaList> = (args) => (<AgendaList {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  agendaList:[{
    name: 'General Concept',
    description: 'grow familiar indescribablegrow familiar indescribable'
  },{
    name: 'General Concept2',
    description: 'grow familiar indescribablegrow familiar indescribable'
  }],
};
