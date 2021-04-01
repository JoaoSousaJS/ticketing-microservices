import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    margin-bottom: ${theme.spacings.xsmall};
  `}
`

export const Label = styled.label`
  ${({ theme }) => css`
    align-items: center;
    justify-content: center;
    font-size: ${theme.font.sizes.large};
    color: ${theme.colors.black};
    padding: ${theme.spacings.xsmall};
  `}
`

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    height: ${theme.spacings.medium};
  `}
`

export const Input = styled.input`
  ${({ theme }) => css`
    height: ${theme.spacings.medium};
    width: 40rem;
  `}
`
