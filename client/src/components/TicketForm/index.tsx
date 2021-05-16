import Button from 'components/Button'
import Input from 'components/Input'
import { FormEventHandler, RefObject } from 'react'
import * as S from './styles'

type TicketFormProps = {
  buttonText: string
  onSubmit?: FormEventHandler<HTMLFormElement> | undefined
  reference?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined
  errors: JSX.Element | undefined
}

const TicketForm = ({
  buttonText,
  reference,
  onSubmit,
  errors
}: TicketFormProps) => {
  return (
    <S.Wrapper onSubmit={onSubmit}>
      <Input label="Title" name="title" type="text" reference={reference} />
      <Input label="Price" name="price" type="number" reference={reference} />

      <Button size="medium">{buttonText}</Button>

      {errors && errors}
    </S.Wrapper>
  )
}

export default TicketForm
