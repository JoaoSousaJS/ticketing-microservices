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
      <S.Title>
        <Link href="/">Ticketing</Link>
      </S.Title>
      {!currentUser ? (
        <>
          <S.ButtonContainer>
            <Link href="/auth/signup">
              <Button as="a">Sign Up</Button>
            </Link>
            <span> </span>
            <Link href="/auth/signin">
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
