import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { DAO } from '../../integration/DAO'

export async function getServerSideProps(context: any) {
  return {
    props: { dao: await DAO.createDAO() }
  }
}

export default function SandBox({ dao }: { dao: DAO }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Spafe Monitor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hit Maxes And Evade Taxes
        </h1>
      </main>

    </div>
  )
}
