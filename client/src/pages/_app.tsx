import { ChakraProvider } from '@chakra-ui/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { buildClient } from 'api/build-client'
import Base from 'components/Base'
import { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from 'styles/global'
import theme from 'styles/theme'

const App = ({ Component, pageProps, currentUser }: AppProps) => {
  const stripePromise = loadStripe(
    'pk_test_51IorLAB0Pnttlxpw8XlnOpAlP3otqb47Hvtlm1OwjzpcYbfu4ub6KYK5jKkvr1Ib2Wr5Z4VJUBY8qayU1V0WeSf600OkTrPYPw'
  )
  return (
    <>
      <ChakraProvider>
        <ThemeProvider theme={theme}>
          <Elements stripe={stripePromise}>
            <Head>
              <title>Boiler Plate</title>
              <link rel="shortcut icon" href="/img/icon-512.png" />
              <link rel="apple-touch icon" href="/img/icon-512.png" />
              <link rel="manifest" href="/manifest.json" />
              <meta
                name="description"
                content="A simple project starter to work with TypeScript, React, NextJS and Styled Components"
              />
            </Head>
            <Base currentUser={currentUser} />
            <GlobalStyles />
            <Component currentUser={currentUser} {...pageProps} />
          </Elements>
        </ThemeProvider>
      </ChakraProvider>
    </>
  )
}

App.getInitialProps = async (appContext: AppContext) => {
  const client = buildClient(appContext.ctx)
  const { data } = await client.get('/api/users/currentuser')

  let pageProps = {}

  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }
  return {
    pageProps,
    currentUser: data.currentUser
  }
}

export default App
