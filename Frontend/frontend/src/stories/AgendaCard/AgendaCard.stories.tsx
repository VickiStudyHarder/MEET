import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AgendaCard from './AgendaCard'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/AgendaCard',
  component: AgendaCard,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: { 
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AgendaCard>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AgendaCard> = (args) => (<AgendaCard {...args} />);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  number:'2',
  name: 'Ui Design',
  description: "When, while the lovely valley teem with vapour around me, and the meridian."
};
