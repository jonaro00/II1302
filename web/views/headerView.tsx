import Link from 'next/link'
import { Menu, Icon, Button, Container, Grid } from 'semantic-ui-react'
import styles from '../styles/header.module.css'

export default function HeaderView({
  username,
  signOut,
}: {
  username: string
  signOut(): Promise<void>
}) {
  return (
    <Menu stackable size="large">
      <Container>
        <Menu.Item className={styles.logo}>
          <Link href="/">
            <a>
              <Icon name="eye" size="large" circular inverted color="red" />
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/devices">
            <a className={styles.link}>Devices</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/api_docs">
            <a className={styles.link}>API</a>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link href="/about">
            <a className={styles.link}>About</a>
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          {username ? (
            <Grid columns={2} relaxed="very">
              <Grid.Column verticalAlign="middle">
                <Icon name="user outline" /> {username}
              </Grid.Column>
              <Grid.Column>
                <Button onClick={signOut}>Sign Out</Button>
              </Grid.Column>
            </Grid>
          ) : (
            <Link href="/signin">
              <a>
                <Button>Sign In</Button>
              </a>
            </Link>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  )
}
