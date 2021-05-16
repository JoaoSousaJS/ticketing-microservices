import { Story, Meta } from '@storybook/react/types-6-0'
import TicketList from '.'

export default {
  title: 'TicketList',
  component: TicketList
} as Meta

export const Basic: Story = (args) => <TicketList {...args} />
