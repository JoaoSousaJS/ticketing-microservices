import axios from 'axios'
import Form from 'components/Form'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  email: string
  password: string
}

export default function Signup() {
  const { handleSubmit, register } = useForm<FormData>()
  const [errors, setErrors] = useState([])

  const handleSignUp = handleSubmit(async ({ email, password }) => {
    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password
      })
      console.log(response.data)
    } catch (error) {
      setErrors(error.response.data.errors)
    }
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
