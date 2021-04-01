import axios from 'axios'
import Form from 'components/Form'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export default function Signup() {
  const { handleSubmit, register } = useForm<FormData>()

  const handleSignUp = handleSubmit(async ({ email, password }) => {
    const response = await axios.post('/api/users/signup', {
      email,
      password
    })

    console.log(response.data)
  })

  return (
    <Form buttonText="Sign Up" onSubmit={handleSignUp} reference={register} />
  )
}
