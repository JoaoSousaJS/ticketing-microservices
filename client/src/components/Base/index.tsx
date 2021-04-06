import Button from 'components/Button'
import * as S from './styles'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRequest } from 'hooks/use-request'
import { useEffect } from 'react'

export type BaseProps = {
  currentUser?: {
    id: string
    email: string
    iat: string
  }
  children?: React.ReactNode
}

const Base = ({ currentUser, children }: BaseProps) => {
  const router = useRouter()
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    onSuccess: () => router.push('/')
  })

  const handleLogout = () => {
    doRequest({})
  }

  return (
    <S.Wrapper>
      <S.HeaderContainer>
        <S.Title>
          <Link href="/">Ticketing</Link>
        </S.Title>
        {!currentUser ? (
          <>
            <S.ButtonContainer>
              <Link href="/auth/signup">
                <Button>Sign Up</Button>
              </Link>
              <span> </span>
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
            </S.ButtonContainer>
          </>
        ) : (
          <S.ButtonContainer>
            <Button onClick={handleLogout}>Logout</Button>
          </S.ButtonContainer>
        )}
      </S.HeaderContainer>
      {children}
    </S.Wrapper>
  )
}

export default Base
