import axios from 'axios'
import { Main } from 'components/Main'
import { GetServerSideProps } from 'next'

type HomeProps = {
  data: {
    currentUser: {
      id: string
      email: string
      iat: string
    }
  }
}

export default function Home(props: HomeProps) {
  return <Main />
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (typeof window === 'undefined') {
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers
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
