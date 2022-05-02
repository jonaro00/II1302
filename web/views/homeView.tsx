import Head from 'next/head'
import { Container, Icon, Header } from 'semantic-ui-react'

const HomeView = () => {
  return (
    <Container className="home">
      <Header as="h2">Welcome to Spafe Monitor</Header>
      <p className="home-p">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
        Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
        consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
        pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
        Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
        ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
        nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
        augue. Curabitur ullamcorper ultricies nisi.
      </p>
      <p className="home-p">
        If ypu need help setting up your device, you can follow our documentation, you can reach
        this by clicking devices or by scrollling down to our footer.
      </p>
      <p className="home-p">
        If you want to learn more about us as a firm and our mission, you can learn more abotu us in
        our about page.
      </p>
      <p className="home-p">
        We believe in open source and maximum safety of our product. Therefore if you want to
        contribute, please consider following our project on github, shown below.
      </p>
      <p className="home-p">
        We hope you enjoy our products and services. We hope to see you again some day.
      </p>
    </Container>
  )
}

export default HomeView
