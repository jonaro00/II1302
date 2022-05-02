import { groupInfo } from '../localization/aboutInfo';
import { Grid, Card, Image, Icon, Item } from 'semantic-ui-react';

const AboutView = () => {
  return (
    <Grid className='about-grid'>
      <Grid.Row className='about-row'>
        {groupInfo.map(p => {
          return (
            <Card className='about-card'>
              <Image src={p.Picture} wrapped ui={false} className='about-picture' />
              <Card.Content>
                <Card.Header>{p.name}</Card.Header>
                <Card.Meta>{p.title}</Card.Meta>
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
  );
};

export default AboutView;
