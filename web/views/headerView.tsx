import Link from 'next/link'
import { Menu, Icon } from 'semantic-ui-react'

export default function HeaderView({ username }: { username: string }) {
  return (
    <Menu stackable secondary compact size="large" className="header">
      <Menu.Item className="header-logo" icon as="a" href="/">
        <Icon name="eye" size="large" circular inverted color="red" />
      </Menu.Item>
      <Menu.Item as="a" href="/devices">
        Devices
      </Menu.Item>
      <Menu.Item as="a" href="/api_docs">
        API
      </Menu.Item>
      <Menu.Item as="a" href="/about">
        About
      </Menu.Item>
      <Menu.Item>
        {/* fix me */}
        {username ? (
          <p>
            Current user: {username} <a href="#">Sign Out</a>
          </p>
        ) : (
          <Link href="/signin">
            <a>Sign In</a>
          </Link>
        )}
      </Menu.Item>
    </Menu>
  )
}
