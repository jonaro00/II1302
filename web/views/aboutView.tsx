import { Container, Header, Grid, Card, Image, Icon, Item, Segment } from 'semantic-ui-react'
import styles from '../styles/about.module.css'

type Profile = {
  name: string
  mail: string
  gitHub: string
  linkedin: string
  title: string
  about: string
  picture: string
}

export const groupInfo: Array<Profile> = [
  {
    name: 'Alex',
    mail: 'Alexberg@kth.se',
    gitHub: 'https://github.com/calexanderberg ',
    linkedin: 'https://linkedin.com/in/calexanderberg',
    title: 'Projektledare/Hållbarhets- och arbetsmiljöansvarig 🌳',
    about:
      'I am a Swedish Computer Science student at KTH. Besides my beaurocatic responsibilities for this  project I was responsible for the Front-end programming for our software side.',
    picture: '/images/alex.jpg',
  },
  {
    name: 'Johan',
    mail: 'jberg8@kth.se',
    gitHub: 'https://github.com/jonaro00',
    linkedin: '',
    title: 'Architect 🛠',
    about:
      'I study Computer Science at KTH. As the architect in this project, I was involved in choosing most of the systems and code frameworks involved, and connecting them.',
    picture:
      'https://cdn.discordapp.com/attachments/224236452513447936/975801436430557184/unknown.png',
  },
  {
    name: 'Bashar',
    mail: 'bjpati@kth.se',
    gitHub: 'https://github.com/bjpati',
    linkedin: 'https://www.linkedin.com/in/bashar-pati-89735b124/',
    title: 'Test ansvarig 🧪',
    about:
      'I am a student at KTH and studying Electronics and Computer Engineering. I am responsible for tests in the group during the course II1302. I also have responsibility for hardware selection and programming.',
    picture: 'https://raw.githubusercontent.com/bjpati/bjpati/main/Icon/IMG_3796%202.jpeg',
  },
  {
    name: 'Amir',
    mail: 'dugiev123@gmail.com',
    gitHub: 'https://github.com/Bansheebomb ',
    linkedin: '',
    title: 'Developer 👾',
    about:
      'I am a computer science and engineering student at KTH. As a developer I am responsible for cataloging component descriptions and making sure the systems integrate together.',
    picture:
      'https://cdn.discordapp.com/attachments/976120737914040340/976120754410229760/unknown.png',
  },
  {
    name: 'Simon',
    mail: 'sstromba@kth.se',
    gitHub: 'https://github.com/Strumpann',
    linkedin: 'https://www.linkedin.com/in/simon-str%C3%B6mb%C3%A4ck-28ab761aa/',
    title: 'Kund/krav ansvarig 🤷‍♂️',
    about:
      'I am studying computerengineering at KTH Kista. My project role was to put up requirements, usecases and hardware development and programming.',
    picture:
      'https://cdn.discordapp.com/attachments/888562787280904222/973557767115792424/51730250404_6e7b52dc7a_o_2.jpg',
  },
]

const AboutView = () => {
  return (
    <Segment>
      <Container text textAlign="center">
        <p className={styles.top}>
          Spafe Monitor believes in total survelance of all our customers :)
        </p>
        <Icon name="eye" circular color="red" size="huge" inverted />
        <Header as="h2">Spafe Monitor</Header>
        <p className={styles.p}>
          Spafe Monitor started in 2022 with the explicit goal of creating the most advanced and
          high tech monitoring system of temperature and gas levels. Started as a project for the
          Projects and Project methods course at KTH, Spafe was created to fill the need to fast,
          afforable, and easy to use monitoring of everything in our lives.
          <br></br>Spafe is constructed into two departments each working towards reaching a
          specific goal. The first one being the hardware, with the explicit goal of creating small
          and accurate products so you don{"'"}t need to even be aware that it even exists in your
          house.
          <br></br>The second department is the software, split into front-end and back-end. The
          front-end or GUI works with you to make sure you get the information you need and nothing
          else. On the other hand, the backend works to collect all the information we need and
          sending it to the appropriate channels.
          <br></br>Spafe is a company you can trust.
        </p>
      </Container>
      <Grid className={styles.grid}>
        <Grid.Row className={styles.row}>
          {groupInfo.map(p => {
            return (
              <Card className={styles.card} key={p.name}>
                <Image
                  src={p.picture}
                  alt={'Picture of ' + p.name}
                  wrapped
                  ui={false}
                  className={styles.picture}
                />
                <Card.Content>
                  <Card.Header className={styles.title} textAlign="center">
                    {p.name}
                  </Card.Header>
                  <Card.Meta textAlign="center">{p.title}</Card.Meta>
                  <Card.Description>{p.about}</Card.Description>
                  <Card.Content extra className={styles.contact}>
                    {p.mail ? <Card.Meta href={'mailto:' + p.mail}>{p.mail}</Card.Meta> : false}
                  </Card.Content>
                  <Card.Content extra>
                    {p.gitHub ? (
                      <Item href={p.gitHub} target="_blank">
                        <Icon name="github" color="black" />
                      </Item>
                    ) : (
                      false
                    )}
                    {p.linkedin ? (
                      <Item href={p.linkedin} target="_blank">
                        <Icon name="linkedin" />
                      </Item>
                    ) : (
                      false
                    )}
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
