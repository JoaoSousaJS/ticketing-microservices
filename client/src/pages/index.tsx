import axios from 'axios'
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

export const getServerSideProps: GetServerSideProps = async () => {
  if (typeof window === 'undefined') {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          Host: 'ticketing.dev'
        }
      }
    )

    return {
      props: {
        data
      }
    }
  } else {
    const { data } = await axios.get('/api/users/currentuser')
    return {
      props: {
        data
      }
    }
  }
}
