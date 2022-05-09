import Link from 'next/link'
import { Grid, Segment } from 'semantic-ui-react'
import styles from '../styles/footer.module.css'

const FooterView = () => {
  return (
    <Segment className={styles.main} color="black">
      <Grid columns={8}>
        <Grid.Row color="black" style={{ color: 'white' }}>
          <Grid.Column>V: 0.7</Grid.Column>
          <Grid.Column>
            <Link href="https://github.com/jonaro00/II1302">
              <a className={styles.link} target="_blank">
                GitHub
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link href="https://github.com/jonaro00/II1302/wiki">
              <a className={styles.link} target="_blank">
                Documentation
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link href="/about">
              <a className={styles.link}>Contact</a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default FooterView
