import Link from 'next/link'
import { Menu, Icon } from 'semantic-ui-react'

export default function HeaderView({
  username,
  signOut,
}: {
  username: string
  signOut(): Promise<void>
}) {
  return (
    <Menu stackable secondary compact size="large" className="header">
      <Menu.Item className="header-logo" icon as="div">
        <Link href="/" passHref>
          <a>
            <Icon name="eye" size="large" circular inverted color="red" />
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/devices">Devices</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/api_docs">API</Link>
      </Menu.Item>
      <Menu.Item>
        <Link href="/about">About</Link>
      </Menu.Item>
      {/* fix me */}
      {username ? (
        <>
          <Menu.Item>Current user: {username}</Menu.Item>
          <Menu.Item>
            <a href="#" onClick={signOut}>
              Sign Out
            </a>
          </Menu.Item>
        </>
      ) : (
        <Menu.Item>
          <Link href="/signin">Sign In</Link>
        </Menu.Item>
      )}
    </Menu>
  )
}
