import { render, screen } from '@testing-library/react'

import TicketForm from './index'

describe('<TicketForm />', () => {
  it('should render the heading', () => {
    const { container } = render(<TicketForm />)

    expect(
      screen.getByRole('heading', { name: /TicketForm/i })
    ).toBeInTheDocument()
  })
})
