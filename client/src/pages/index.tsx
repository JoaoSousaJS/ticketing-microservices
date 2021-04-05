import { buildClient } from 'api/build-client'
import { Main } from 'components/Main'
import { GetServerSideProps } from 'next'

type HomeProps = {
  currentUser: {
    id: string
    email: string
    iat: string
  }
}

export default function Home(props: HomeProps) {
  console.log(props)
  return <Main />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const client = buildClient(context)
  const { data } = await client.get('/api/users/currentuser')

  return {
    props: data
  }
}
