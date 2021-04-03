import Form from 'components/Form'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { useRequest } from '../../hooks/use-request'

type FormData = {
  email: string
  password: string
}

export default function Signup() {
  const router = useRouter()
  const { handleSubmit, register } = useForm<FormData>()
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    onSuccess: () => router.push('/')
  })

  const handleSignUp = handleSubmit(async ({ email, password }) => {
    await doRequest({ email, password })
  })

  return (
    <Form
      buttonText="Sign Up"
      onSubmit={handleSignUp}
      reference={register}
      errors={errors}
    />
  )
}
