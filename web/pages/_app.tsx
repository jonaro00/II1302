import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Model } from '../model/Model'
import { SessionProvider, useSession } from 'next-auth/react'
import React, { useEffect } from 'react'

const model = new Model()

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  // For debugging
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      ;(window as any).model = model
    }
  }, [])
  return (
    <SessionProvider session={session}>
      <SessionListener model={model}>
        {(Component as any)?.auth ? (
          <Auth>
            <Component {...pageProps} model={model} />
          </Auth>
        ) : (
          <Component {...pageProps} model={model} />
        )}
      </SessionListener>
    </SessionProvider>
  )
}

function SessionListener({ model, children }: { model: Model; children: any }) {
  const { data } = useSession()
  useEffect(() => {
    model.setUsername(data?.user?.name || null)
  })
  return children
}

function Auth({ children }: { children: any }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  useSession({ required: true })
  return children
}
