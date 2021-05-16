import { render, screen } from '@testing-library/react'

import TicketList from './index'

describe('<TicketList />', () => {
  it('should render the heading', () => {
    const { container } = render(<TicketList />)

    expect(
      screen.getByRole('heading', { name: /TicketList/i })
    ).toBeInTheDocument()
  })
})
