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
        <p className="px-4 py-2 bg-light container text-small text-muted">파트너스 활동으로 일정량의 수수료를 받고 있습니다.</p>
      </>
    )
}

export default MyApp
