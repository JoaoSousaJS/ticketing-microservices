import TicketForm from 'components/TicketForm'
import { useRequest } from 'hooks/use-request'
import router from 'next/router'
import { useForm } from 'react-hook-form'

type FormDataProps = {
  title: string
  price: number
}

const NewTicket = () => {
  const { handleSubmit, register } = useForm<FormDataProps>()
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    onSuccess: () => router.push('/')
  })

  const handleTicketSubmit = handleSubmit(async ({ title, price }) => {
    await doRequest({
      title,
      price
    })
  })

  return (
    <TicketForm
      onSubmit={handleTicketSubmit}
      buttonText="Submit"
      reference={register}
      errors={errors}
    />
  )
}

export default NewTicket
