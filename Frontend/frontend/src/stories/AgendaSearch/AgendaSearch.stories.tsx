import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AgendaSearch from './AgendaSearch'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/AgendaSearch',
  component: AgendaSearch,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AgendaSearch>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AgendaSearch> = (args) => (<AgendaSearch {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  avator:' ',
  name: 'Charlie Grimm'
};
