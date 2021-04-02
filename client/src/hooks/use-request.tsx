import axios from 'axios'
import { useState } from 'react'
import * as S from '../components/Form/styles'

type ErrorsProps = {
  message: string
  field: string
}

type AxiosProps = {
  method: 'get' | 'post' | 'patch'
  url: string
}

export default ({ url, method }: AxiosProps) => {
  const [errors, setErrors] = useState<JSX.Element>()

  const doRequest = async (body: any) => {
    try {
      setErrors(undefined)
      const response = await axios[method](url, body)
      return response.data
    } catch (error) {
      setErrors(
        <S.MessageContainer>
          <S.MessageHeading>Ooooops...</S.MessageHeading>
          <S.MessageList>
            {error.response.data.errors.map((err: ErrorsProps) => (
              <S.MessageItem key={err.field}>{err.message}</S.MessageItem>
            ))}
          </S.MessageList>
        </S.MessageContainer>
      )
    }
  }

  return { doRequest, errors }
}
