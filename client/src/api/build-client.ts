import axios from 'axios'
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils'
import { IncomingMessage } from 'node:http'

type AxiosRequestProps = {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies
  }
}

export const buildClient = ({ req }: AxiosRequestProps) => {
  if (typeof window === 'undefined') {
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    })
  } else {
    return axios.create({
      baseURL: '/'
    })
  }
}
