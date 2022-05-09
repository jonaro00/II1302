import { Container, Header } from 'semantic-ui-react'

const HomeView = () => {
  return (
    <Container className="home">
      <Header as="h2">Welcome to Spafe Monitor</Header>
      <p className="home-p">
        We are your all in one solution for monitoring, visualizing, and alerts for your
        temperature, humidity, and air quality levels. Our devices are state of the art, combining
        complex solutions in easy to read and understand interfaces.
      </p>
      <p className="home-p">
        If you need help setting up your device, you can follow our documentation, you can reach
        this by clicking devices or by scrollling down to our footer.
      </p>
      <p className="home-p">
        You can learn more about us as a firm and our mission on our about page.
      </p>
      <p className="home-p">
        We believe in open source and maximum safety of our product. Therefore if you want to
        contribute, please consider following our project on GitHub, shown below.
      </p>
      <p className="home-p">
        We hope you enjoy our products and services. We hope to see you again some day.
      </p>
    </Container>
  )
}

export default HomeView
