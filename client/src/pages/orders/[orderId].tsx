import { Container } from '@chakra-ui/react'
import { buildClient } from 'api/build-client'
import { GetServerSideProps } from 'next'
import { TicketProps } from 'pages/tickets/[ticketId]'
import { useEffect, useState } from 'react'

type OrderProps = {
  expiresAt: string
  id: string
  status: string
  ticket: TicketProps
  userId: string
  version: number
}

const OrderShow = ({ expiresAt }: OrderProps) => {
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(expiresAt).valueOf() - new Date().valueOf()
      setTimeLeft(Math.round(msLeft / 1000))
    }
    findTimeLeft()
    const timerId = setInterval(findTimeLeft, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [expiresAt])

  return (
    <Container>
      {timeLeft < 0 ? (
        <div>Order expired</div>
      ) : (
        <div>Time left to pay: {timeLeft} seconds</div>
      )}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = buildClient(ctx)
  const { orderId } = ctx.query

  const { data } = await client.get(`/api/orders/${orderId}`)

  return {
    props: data
  }
}

export default OrderShow
