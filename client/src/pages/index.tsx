import { buildClient } from 'api/build-client'
import TicketList from 'components/TicketList'
import { GetServerSideProps } from 'next'

type HomeProps = {
  currentUser: {
    id: string
    email: string
    iat: string
  }
  data: {
    title: string
    price: number
    userId: string
    version: number
    id: string
  }[]
}

export default function Home(props: HomeProps) {
  console.log(props.data)
  return <TicketList data={props.data} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient(context)
  const { data } = await client.get('/api/tickets')

  console.log(data)

  return {
    props: {
      data
    }
  }
}
