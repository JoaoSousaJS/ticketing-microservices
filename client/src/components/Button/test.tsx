import { render, screen } from 'utils/test-utils'
import Button from './index'

describe('<Button />', () => {
  it('should render the heading', () => {
    render(<Button>click here</Button>)

    expect(
      screen.getByRole('button', {
        name: 'click here'
      })
    ).toBeInTheDocument()
  })
})
