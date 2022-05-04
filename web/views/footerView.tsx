import Head from 'next/head'
import Link from 'next/link'
import { Grid, Segment } from 'semantic-ui-react'

const FooterView = () => {
  return (
    <Segment className="main-footer" color="black">
      <Grid columns={8}>
        <Grid.Row color="black" style={{ color: 'white' }}>
          <Grid.Column>V: 0.3</Grid.Column>
          <Grid.Column>
            <Link href="https://github.com/jonaro00/II1302">
              <a className="link-footer" target="_blank">
                GitHub
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link href="/">
              <a target="_blank" className="link-footer">
                Documentation
              </a>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link href="/about">
              <a className="link-footer">Contact</a>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default FooterView
