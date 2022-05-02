import Head from 'next/head';
import { Grid, Segment } from 'semantic-ui-react';

const FooterView = () => {
  return (
    <Segment className='main-footer' color='black'>
      <Grid columns={8}>
        <Grid.Row color ='black' style={{color: 'white'}}>
        <Grid.Column>
          V: 0.3
        </Grid.Column>
        <Grid.Column >
          <a className='link-footer' href='https://github.com/jonaro00/II1302' target='_blank'>
          GitHub
          </a>
        </Grid.Column>
        <Grid.Column>
          <a href="" target='_blank' className='link-footer'>
          Documentation
          </a>
        </Grid.Column>
        <Grid.Column>
        <a href="/about" className='link-footer'>
          Contact
        </a>
        </Grid.Column>
        </Grid.Row>
        </Grid>
        
    </Segment>
  );
};

export default FooterView;
