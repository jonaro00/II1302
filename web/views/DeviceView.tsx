import Head from 'next/head'
import { Grid, Header, Segment, Dropdown } from 'semantic-ui-react'


const liveReading = (isTemp: boolean) => {
  var annotation = isTemp ? '°C' : 'ppm'
   return(
     <Grid>
        <Grid.Row centered>
          <div className='device-live-header'>Temperature Live Reading</div>
        </Grid.Row>
        <Grid.Row centered>
          <div className='device-live-read'>
            <div className='device-live-number'>
              886 
            </div>
            <div className='device-live-annotation'>
              {annotation}
            </div>
          </div>
        </Grid.Row>
        <Grid.Row></Grid.Row>
     </Grid>
   )
}

/* Future constant using chart.js

const liveGraphing = () => {

}
*/

const DeviceView = () => {
  return (
    <div className='device'>
      <Grid columns={2} padded inverted className="device-grid">
        <Grid.Row color="black">
          <Segment color="black" inverted className="device-header">
            <div></div>
            <Header as='h3' className='device-title'>Device 1</Header>
            <Dropdown icon="setting" pointing='left'>
              <Dropdown.Menu>
                <Dropdown.Item text="Focus mode" />
                <Dropdown.Item>
                  <Dropdown text='Add' pointing='left'>
                  <Dropdown.Menu>
                    <Dropdown.Item>
                      <Dropdown text='Temperature'>
                        <Dropdown.Menu>
                          <Dropdown.Item text='Live reading'/>
                          <Dropdown.Item text='Live graphing'/>
                          <Dropdown.Item text='Historical graphing'/>
                        </Dropdown.Menu>
                      </Dropdown>
                  </Dropdown.Item>
                  <Dropdown.Item>
                      <Dropdown text='CO2 levels'>
                        <Dropdown.Menu>
                          <Dropdown.Item text='Live reading'/>
                          <Dropdown.Item text='Live graphing'/>
                          <Dropdown.Item text='Historical graphing'/>
                        </Dropdown.Menu>
                      </Dropdown>
                  </Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown>
                </Dropdown.Item>
                <Dropdown.Item text="Remove device" />
              </Dropdown.Menu>
            </Dropdown>
          </Segment>
        </Grid.Row>
        <Grid.Row className='device-info-row'>
          <Grid.Column className='device-info-box'>
            {liveReading(true)}
          </Grid.Column>
          <Grid.Column className='device-info-box'>
            
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className='device-info-row'>
          <Grid.Column className='device-info-box'>
            
          </Grid.Column>
          <Grid.Column className='device-info-box'>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
  )
}

export default DeviceView
