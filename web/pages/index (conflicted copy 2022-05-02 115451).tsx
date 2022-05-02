import type { NextPage } from 'next'
import Head from 'next/head'
import 'semantic-ui-css/semantic.min.css'

import HeaderPresenter from "../presenters/headerPresenter";
import HomePresenter from "../presenters/homePresenter";
import FooterPresenter from "../presenters/footerPresenter";

const Home: NextPage = () => {
  return (
    <div >
      <Head>
        <title>Spafe Monitor</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

<<<<<<< HEAD
      < HeaderPresenter />
      < HomePresenter />
      < FooterPresenter/>
=======
      <main className={styles.main}>
        <h1 className={styles.title}>
          Hit Maxes & Evade Taxes
        </h1>
      </main>
>>>>>>> b1ba3cd8ba47c9aeace045ff0b63954520c29cfc

    </div>
  )
}

export default Home
