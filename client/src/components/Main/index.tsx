import * as S from './styles'

export const Main = ({
  title = 'Advanced React',
  description = 'Typescript, React JS and Styled components'
}) => (
  <S.Wrapper>
    <S.Logo src="img/logo.svg" alt="Atom image and advanced react" />
    <S.Title>{title}</S.Title>
    <S.Description>{description}</S.Description>
    <S.Illustration
      src="img/hero-illustration.svg"
      alt="a developer in front of the code"
    />
  </S.Wrapper>
)
