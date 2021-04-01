import Button from 'components/Button'
import Input from 'components/Input'
import { FormEventHandler, RefObject } from 'react'
import * as S from './styles'

type FormProps = {
  buttonText: string
  onSubmit?: FormEventHandler<HTMLFormElement> | undefined
  reference?:
    | ((instance: HTMLInputElement | null) => void)
    | RefObject<HTMLInputElement>
    | null
    | undefined
  errors: {
    message: string
  }[]
}

const Form = ({ buttonText, onSubmit, reference, errors }: FormProps) => (
  <S.Wrapper onSubmit={onSubmit}>
    <Input label="Email" reference={reference} name="email" type="text" />
    <Input
      label="Password"
      reference={reference}
      name="password"
      type="password"
    />
    {errors && errors.map((err) => err.message)}
    <Button size="medium">{buttonText}</Button>
  </S.Wrapper>
)

export default Form
