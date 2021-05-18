import { Box, Container, Text } from '@chakra-ui/react'
import { buildClient } from 'api/build-client'
import Button from 'components/Button'
import { useRequest } from 'hooks/use-request'
import { GetServerSideProps } from 'next'
import router from 'next/router'

export type TicketProps = {
  id: string
  price: number
  title: string
  userId: string
  version: number
}

const TicketShow = ({ price, title, id }: TicketProps) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post'
  })
  return (
    <Container centerContent>
      <Box>
        <Text fontSize="7xl">{title}</Text>
        <Text fontSize="2xl">Price: {price}</Text>
        <Button
          onClick={async () => {
            const response = await doRequest({
              ticketId: id
            })

            console.log(response)

            if (response?.id) {
              router.push('/orders/[orderId]', `/orders/${response.id}`)
            }
          }}
        >
          Purchase
        </Button>
        {errors && errors}
      </Box>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const client = buildClient(ctx)
  const { ticketId } = ctx.query

  const { data } = await client.get(`/api/tickets/${ticketId}`)

  return {
    props: {
      ...data
    }
  }
}

export default TicketShow
