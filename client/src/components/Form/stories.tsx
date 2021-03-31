import { Story, Meta } from '@storybook/react/types-6-0'
import Form from '.'

export default {
  title: 'Form',
  component: Form
} as Meta

export const Basic: Story = (args) => <Form buttonText="click here" {...args} />
