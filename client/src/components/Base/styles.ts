import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.lightBg};
  `}
  height: 8rem;
`

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 8rem;
  align-items: center;
  justify-content: space-between;
  margin-left: 1rem;
  margin-right: 1rem;
`
export const Title = styled.h1``

export const ButtonContainer = styled.div``
