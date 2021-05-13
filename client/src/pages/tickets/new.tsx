import TicketForm from 'components/TicketForm'
import { useForm } from 'react-hook-form'

type FormDataProps = {
  title: string
  price: number
}

const NewTicket = () => {
  const { handleSubmit, register } = useForm<FormDataProps>()

  const handleTicketSubmit = handleSubmit(async ({ title, price }) => {
    console.log(title, price)
  })

  return (
    <TicketForm
      onSubmit={handleTicketSubmit}
      buttonText="Submit"
      reference={register}
    />
  )
}

export default NewTicket
