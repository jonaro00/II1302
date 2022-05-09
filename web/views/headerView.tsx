import Link from 'next/link'
import { Menu, Icon } from 'semantic-ui-react'
import styles from '../styles/header.module.css'

export default function HeaderView({
  username,
  signOut,
}: {
  username: string
  signOut(): Promise<void>
}) {
  return (
    <Menu stackable secondary compact size="large" className={styles.main}>
      <Menu.Item className={styles.logo} icon as="div">
        <Link href="/" passHref>
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
      {/* fix me */}
      {username ? (
        <>
          <Menu.Item>Current user: {username}</Menu.Item>
          <Menu.Item>
            <a href="#" onClick={signOut} className={styles.link}>
              Sign Out
            </a>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item >
          <Link href="/signin">
          <a className={styles.link}>Sign In</a>
            </Link>
        </Menu.Item>
      )}
    </Menu>
  )
}
