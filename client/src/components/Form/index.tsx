import Button from 'components/Button'
import Input from 'components/Input'
import * as S from './styles'

type FormProps = {
  buttonText: string
}

const Form = ({ buttonText }: FormProps) => (
  <S.Wrapper>
    <Input label="Email" />
    <Input label="Password" />
    <Button size="medium">{buttonText}</Button>
  </S.Wrapper>
)

export default Form
