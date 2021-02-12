import Head from 'next/head'
import Navigation from '../component/navigation'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <>
        <Head>
          <title>Anonymous Board</title>
          <link rel="icon" href="https://www.flaticon.com/svg/vstatic/svg/1534/1534072.svg?token=exp=1613133047~hmac=9db0b7f9328126594dd420eb19454c20" />
          <link rel="stylesheet" href="https://bootswatch.com/4/lumen/bootstrap.css" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://bootswatch.com/_assets/css/custom.min.css" crossOrigin="anonymous" />
        </Head>
        <Navigation />
        <Component {...pageProps} />
      </>
    )
}

export default MyApp
