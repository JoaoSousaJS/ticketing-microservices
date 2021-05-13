import { Story, Meta } from '@storybook/react/types-6-0'
import TicketForm from '.'

export default {
  title: 'TicketForm',
  component: TicketForm
} as Meta

export const Basic: Story = (args) => <TicketForm {...args} />
