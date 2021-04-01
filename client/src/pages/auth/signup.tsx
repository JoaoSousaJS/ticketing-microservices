import Form from 'components/Form'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export default function Signup() {
  const { handleSubmit, register } = useForm<FormData>()
  const handleSignUp = handleSubmit(async ({ email, password }) => {
    console.log(email)
    console.log(password)
  })
  return (
    <Form buttonText="Sign Up" onSubmit={handleSignUp} reference={register} />
  )
}
