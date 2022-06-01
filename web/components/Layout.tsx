import Head from 'next/head'
import { ReactNode } from 'react'

export default function Layout({
  children,
  title,
  description = 'Temperature monitoring and more',
}: {
  children: ReactNode
  title?: string
  description?: string
}) {
  return (
    <>
      <Head>
        <title>{(title ? `${title} | ` : '') + 'Spafe Monitor'}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon-16x16.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </>
  )
}
