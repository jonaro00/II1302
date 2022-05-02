import { Button, Grid, Segment } from 'semantic-ui-react';

const FooterView = () => {
  return (
    <Segment className='board-footer'>
      <Grid>
        V:0.8
      </Grid>
      <Grid href='https://github.com/jonaro00/II1302'>
        GitHub
      </Grid>
      <Grid >
        Documentation
      </Grid>
      <Grid>
        Contact
      </Grid>
    </Segment>
  );
};

export default FooterView;
