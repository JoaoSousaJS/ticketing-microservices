import { Button, Container, FormControl } from '@chakra-ui/react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { buildClient } from 'api/build-client'
import { useRequest } from 'hooks/use-request'
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

const OrderShow = ({ expiresAt, id }: OrderProps) => {
  const [timeLeft, setTimeLeft] = useState(0)
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post'
  })
  const stripe = useStripe()
  const elements = useElements()

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

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      return
    }

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      return
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
    }

    const response = await doRequest({
      token: paymentMethod?.id,
      orderId: id
    })

    console.log(response)
  }

  return (
    <Container>
      {timeLeft < 0 ? (
        <div>Order expired</div>
      ) : (
        <FormControl>
          <div>Time left to pay: {timeLeft} seconds</div>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4'
                  }
                },
                invalid: {
                  color: '#9e2146'
                }
              }
            }}
          />
          <Button
            colorScheme="blue"
            variant="outline"
            type="submit"
            onClick={handleSubmit}
          >
            Pay
          </Button>
        </FormControl>
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
