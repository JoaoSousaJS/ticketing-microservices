import React, { InputHTMLAttributes, useState } from 'react'
import * as S from './styles'

export type InputFieldProps = {
  onInput?: (value: string) => void
  label?: string
  initialValue?: string
} & InputHTMLAttributes<HTMLInputElement>

const Input = ({
  label,
  onInput,
  name,
  placeholder,
  initialValue = '',
  ...props
}: InputFieldProps) => {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value
    setValue(newValue)

    !!onInput && onInput(newValue)
  }

  return (
    <S.Wrapper>
      <S.Form>
        {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
        <S.InputWrapper>
          <S.Input
            placeholder={placeholder}
            type="text"
            value={value}
            name={name}
            onChange={onChange}
            {...(label ? { id: name } : {})}
            {...props}
          />
        </S.InputWrapper>
      </S.Form>
    </S.Wrapper>
  )
}

export default Input
