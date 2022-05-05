import Head from 'next/head'
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Model } from '../model/Model'
import { SessionProvider, useSession } from 'next-auth/react'

const model = new Model()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <title>Spafe Monitor</title>
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <SessionProvider session={session}>
        {(Component as any).auth ? (
          <Auth>
            <Component {...pageProps} model={model} />
          </Auth>
        ) : (
          <Component {...pageProps} model={model} />
        )}
      </SessionProvider>
    </>
  )
}

function Auth({ children }: { children: any }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === 'loading') {
    return <div>Loading...</div>
  }
  return children
}
