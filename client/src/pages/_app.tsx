import { buildClient } from 'api/build-client'
import Base from 'components/Base'
import { AppContext, AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from 'styles/global'
import theme from 'styles/theme'

const App = ({ Component, pageProps, currentUser }: AppProps) => {
  return (
    <>
      <ThemeProvider theme={theme}>
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
        <Component {...pageProps} />
      </ThemeProvider>
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
