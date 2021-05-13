import { buildClient } from 'api/build-client'
import { GetServerSideProps } from 'next'

type HomeProps = {
  currentUser: {
    id: string
    email: string
    iat: string
  }
}

export default function Home(props: HomeProps) {
  return <h1>hi</h1>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser')

  return {
    props: data
  }
}
