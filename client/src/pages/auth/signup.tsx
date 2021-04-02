import Form from 'components/Form'
import { useForm } from 'react-hook-form'
import useRequest from '../../hooks/use-request'

type FormData = {
  email: string
  password: string
}

export default function Signup() {
  const { handleSubmit, register } = useForm<FormData>()
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post'
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
