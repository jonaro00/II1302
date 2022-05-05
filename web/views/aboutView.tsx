import { Container, Header, Grid, Card, Image, Icon, Item, Segment } from 'semantic-ui-react'

export const groupInfo = [
  {
    name: 'Alex',
    tel: '+46708128516',
    telTxt: '+46 708-12 85 16',
    mail: 'Alexberg@kth.se',
    gitHub: 'https://github.com/calexanderberg ',
    linkedin: 'https://linkedin.com/in/calexanderberg',
    title: 'Projektledare/Hållbarhets- och arbetsmiljöansvarig',
    about:
      'I am a Swedish Computer Science student at KTH. Besides my beaurocatic responsibilities for this  project I was responsible for the Front-end programming for our software side.',
    Picture: '/images/alex.jpg',
  },
  {
    name: 'Johan',
    tel: 'Lorem ipsum',
    telTxt: 'Lorem ipsum',
    mail: 'jberg8@kth.se',
    gitHub: 'https://linkedin.com/in/jonaro00',
    linkedin: 'Lorem ipsum ',
    title: 'Lorem ipsum ',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus, felis pharetra fermentum commodo, tellus magna vehicula arcu, porta gravida est purus ut nisl. Morbi vel semper ante.',
    Picture: '',
  },
  {
    name: 'Bashar',
    tel: '+46 729 38 68 03',
    telTxt: 'Lorem ipsum',
    mail: 'Lorem ipsum',
    gitHub: 'Lorem ipsum ',
    linkedin: 'Lorem ipsum ',
    title: 'Lorem ipsum ',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus, felis pharetra fermentum commodo, tellus magna vehicula arcu, porta gravida est purus ut nisl. Morbi vel semper ante.',
    Picture: '',
  },
  {
    name: 'Amiran',
    tel: 'Lorem ipsum',
    telTxt: 'Lorem ipsum',
    mail: 'Lorem ipsum',
    gitHub: 'Lorem ipsum ',
    linkedin: 'Lorem ipsum ',
    title: 'Lorem ipsum ',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus, felis pharetra fermentum commodo, tellus magna vehicula arcu, porta gravida est purus ut nisl. Morbi vel semper ante.',
    Picture: '',
  },
  {
    name: 'Simon',
    tel: 'Lorem ipsum',
    telTxt: 'Lorem ipsum',
    mail: 'Lorem ipsum',
    gitHub: 'Lorem ipsum',
    linkedin: 'Lorem ipsum ',
    title: 'Lorem ipsum ',
    about:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempus, felis pharetra fermentum commodo, tellus magna vehicula arcu, porta gravida est purus ut nisl. Morbi vel semper ante.',
    Picture: '',
  },
]

const AboutView = () => {
  return (
    <Segment>
      <Container text textAlign="center">
        <p className="about-p about-p-top">
          Spafe Monitor believes in total survelance of all our customers, whether they are aware of it ot not.
        </p>
        <Icon name="eye" circular color="red" size="huge" inverted />
        <Header as="h2">Spafe Monitor</Header>
        <p className="about-p">
          Spafe Monitor started in 2022 with the explicit goal of creating the most advanced and high tech monitoring system of temperature and co2 levels. Started as a project for the Projects and Project methods course at KTH, Spafe was created to fill the need to fast, afforable, and easy to use monitoring of everything in our lives. 
          <br></br>Spafe is constructed into two departments each working towards reaching a specific goal. The first one being the hardware, with the explicit goal of creating small and accurate products so you don't need to even be aware that it even exists in your house. 
          <br></br>The second department is the software, split into front-end and back-end. For the front-end or gui it works with you to make sure you get the information you need and nothing else. On the other hand, the backend works to collect all the information we need and sending it to the appropriate channels.
          <br></br>Spafe is a company you can trust.
        </p>
      </Container>
      <Grid className="about-grid">
        <Grid.Row className="about-row">
          {groupInfo.map(p => {
            return (
              <Card className="about-card" key={p.name}>
                <Image
                  src={p.Picture}
                  alt={'Picture of ' + p.name}
                  wrapped
                  ui={false}
                  className="about-picture"
                />
                <Card.Content>
                  <Card.Header className="about-title" textAlign="center">
                    {p.name}
                  </Card.Header>
                  <Card.Meta textAlign="center">{p.title}</Card.Meta>
                  <Card.Description>{p.about}</Card.Description>
                  <Card.Content extra className="about-contact">
                    <Card.Meta href={'mailto:' + p.mail}>{p.mail}</Card.Meta>
                    <Card.Meta href={'tel:+' + p.tel}>{p.telTxt}</Card.Meta>
                  </Card.Content>
                  <Card.Content extra>
                    <Item href={p.gitHub} target="_blank">
                      <Icon name="github" color="black" />
                    </Item>
                    <Item href={p.linkedin} target="_blank">
                      <Icon name="linkedin" />
                    </Item>
                  </Card.Content>
                </Card.Content>
              </Card>
            )
          })}
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

export default AboutView
