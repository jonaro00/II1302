import Head from 'next/head';
import { Grid, Icon, Segment, Dropdown, Image } from 'semantic-ui-react';
// import { deviceInfo } from '../localization/deviceInfo';

import image1 from '../images/placeholder1.png'
import image2 from '../images/placeholder2.png'
import image3 from '../images/placeholder3.png'
import image4 from '../images/placeholder4.png'

const DeviceView = () => {
  return(
    <Grid >
      <Grid 
      columns={2} 
      padded 
      inverted
      className='device-grid'
    >
      <Grid.Row color='black'>
        <Segment 
          color='black' 
          inverted
          classname='device-title'
        >
          Device 1
          <Dropdown icon='setting'>
            <Dropdown.Menu>
              <Dropdown.Item text='Setting 1'/>
              <Dropdown.Item text='Setting 2'/>
              <Dropdown.Item text='Setting 3'/>
            </Dropdown.Menu>
          </Dropdown>
        </Segment>
      </Grid.Row>
      <Grid.Row color='black'>
        <Grid.Column>
          <Image src={image1}/>
        </Grid.Column>
        <Grid.Column>
          <Image src={image2}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row color='black'>
        <Grid.Column>
          <Image src={image3}/>
        </Grid.Column>
        <Grid.Column>
          <Image src={image4}/>
        </Grid.Column>
      </Grid.Row>
      </Grid>
      <Grid 
      columns={2} 
      padded 
      inverted
      className='device-grid'
    >
      <Grid.Row color='black'>
        <Segment 
          color='black' 
          inverted
          classname='device-title'
        >
          Device 1
          <Dropdown icon='setting'>
            <Dropdown.Menu>
              <Dropdown.Item text='Setting 1'/>
              <Dropdown.Item text='Setting 2'/>
              <Dropdown.Item text='Setting 3'/>
            </Dropdown.Menu>
          </Dropdown>
        </Segment>
      </Grid.Row>
      <Grid.Row color='black'>
        <Grid.Column>
          <Image src={image1}/>
        </Grid.Column>
        <Grid.Column>
          <Image src={image2}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row color='black'>
        <Grid.Column>
          <Image src={image3}/>
        </Grid.Column>
        <Grid.Column>
          <Image src={image4}/>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    </Grid>
  )
}

export default DeviceView


//Note for later, add chart.js to the logic and design of these grids