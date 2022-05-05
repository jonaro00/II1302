import Head from 'next/head'
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Model } from '../model/Model'

const model = new Model()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Spafe Monitor</title>
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <Component {...pageProps} model={model} />
    </>
  )
}
