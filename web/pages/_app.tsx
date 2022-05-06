import Head from 'next/head'
import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Model } from '../model/Model'
import { SessionProvider, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const model = new Model()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      ;(window as any).model = model
    }
  }, [])
  return (
    <>
      <Head>
        <title>Spafe Monitor</title>
        <link rel="icon" href="/favicon-16x16.png" />
      </Head>
      <SessionProvider session={session}>
        {(Component as any)?.auth ? (
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
  useSession({ required: true })
  return children
}
