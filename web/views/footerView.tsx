import Head from 'next/head'
import Link from 'next/link'
import { Grid, Segment } from 'semantic-ui-react'

const FooterView = () => {
  return (
    <Segment className="footer-main" color="black">
      <Grid columns={8}>
        <Grid.Row color="black" style={{ color: 'white' }}>
          <Grid.Column>V: 0.5</Grid.Column>
          <Grid.Column>
            <Link href="https://github.com/jonaro00/II1302">
              <a className="footer-link" target="_blank">
                GitHub
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link href="https://github.com/jonaro00/II1302/wiki">
              <a target="_blank" className="footer-link">
                Documentation
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link href="/about">
              <a className="footer-link">Contact</a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default FooterView
