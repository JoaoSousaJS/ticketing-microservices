import { render, screen } from 'utils/test-utils'
import Form from './index'

describe('<Form />', () => {
  it('should render the form', () => {
    render(<Form buttonText="test" />)

    expect(screen.getByRole('button', { name: /test/i })).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
  })
})
