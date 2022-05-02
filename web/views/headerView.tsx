import { Menu, Icon } from 'semantic-ui-react'

const HeaderView = () => {
  return (
    <Menu stackable secondary compact size="large" className="header">
      <Menu.Item className="header-logo" icon as="a" href="/">
        <Icon name="eye" size="large" circular inverted color="red" />
      </Menu.Item>
      <Menu.Item as="a" href="/devices">
        Devices
      </Menu.Item>
      <Menu.Item as="a" href="/api">
        API
      </Menu.Item>
      <Menu.Item as="a" href="/about">
        About
      </Menu.Item>
    </Menu>
  )
}

export default HeaderView
