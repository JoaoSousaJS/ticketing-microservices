import Button from 'components/Button'
import * as S from './styles'
import Link from 'next/link'

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
      <S.Title>Ticketing</S.Title>
      {!currentUser ? (
        <>
          <S.ButtonContainer>
            <Link href="signup">
              <Button as="a">Sign Up</Button>
            </Link>
            <span> </span>
            <Link href="signin">
              <Button as="a">Sign In</Button>
            </Link>
          </S.ButtonContainer>
        </>
      ) : (
        <S.ButtonContainer>
          <Link href="/">
            <Button as="a">Logout</Button>
          </Link>
        </S.ButtonContainer>
      )}
    </S.HeaderContainer>
    {children}
  </S.Wrapper>
)

export default Base
