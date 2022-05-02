import { groupInfo } from '../localization/aboutInfo';
<<<<<<< HEAD
import { Container, Header, Grid, Card, Image, Icon, Item, Segment } from 'semantic-ui-react';

const AboutView = () => {
  return (
    <Segment>
        <Container text textAlign='center'>
          <p className='about-p about-p-top'>
            Spafe Monitor believes in total survelance of all our customers, whether they are aware of it ot not.
          </p>
          <Icon
            name='eye' 
            circular 
            color='red'
            size='huge'
            inverted
          />
        <Header as='h2'>
          Spafe Monitor
        </Header>
        <p className='about-p' >
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
      ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
      quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
      arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
      Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
      dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
      Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
      Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
      viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
      Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
        </p>

  </Container>
=======
import { Grid, Card, Image, Icon, Item } from 'semantic-ui-react';

const AboutView = () => {
  return (
>>>>>>> b1ba3cd8ba47c9aeace045ff0b63954520c29cfc
    <Grid className='about-grid'>
      <Grid.Row className='about-row'>
        {groupInfo.map(p => {
          return (
            <Card className='about-card'>
              <Image src={p.Picture} wrapped ui={false} className='about-picture' />
              <Card.Content>
<<<<<<< HEAD
                <Card.Header className='about-title' textAlign='center'>{p.name}</Card.Header>
                <Card.Meta textAlign='center'>{p.title}</Card.Meta>
=======
                <Card.Header>{p.name}</Card.Header>
                <Card.Meta>{p.title}</Card.Meta>
>>>>>>> b1ba3cd8ba47c9aeace045ff0b63954520c29cfc
                <Card.Description>{p.about}</Card.Description>
                <Card.Content extra className='about-contact'>
                  <Card.Meta href={'mailto:' + p.mail}>{p.mail}</Card.Meta>
                  <Card.Meta href={'tel:+' + p.tel}>{p.telTxt}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Item href={p.gitHub} target='_blank'>
                    <Icon name='github' color='black' />
                  </Item>
                  <Item href={p.linkedin} target='_blank'>
                    <Icon name='linkedin' />
                  </Item>
                </Card.Content>
              </Card.Content>
            </Card>
          );
        })}
      </Grid.Row>
    </Grid>
<<<<<<< HEAD
    </Segment>
=======
>>>>>>> b1ba3cd8ba47c9aeace045ff0b63954520c29cfc
  );
};

export default AboutView;
