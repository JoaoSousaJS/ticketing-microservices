import Button from 'components/Button'
import * as S from './styles'

export type BaseProps = {
  currentUser?: {
    id: string
    email: string
    iat: string
  }
  children?: React.ReactNode
}

const Base = ({ currentUser, children }: BaseProps) => (
  <S.Wrapper>
    <S.HeaderContainer>
      {!currentUser ? (
        <>
          <Button>Sign Up</Button>
          <Button>Sign in</Button>
        </>
      ) : (
        <Button>Logout</Button>
      )}
    </S.HeaderContainer>
    {children}
  </S.Wrapper>
)

export default Base
