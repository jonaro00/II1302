import Head from 'next/head'
import { Grid, Header, Segment, Dropdown } from 'semantic-ui-react'

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
        <Grid.Row color="black">
          <Grid.Column color='red' className='device-infobox'>
            
          </Grid.Column>
          <Grid.Column color='blue' className='device-infobox'>
            
          </Grid.Column>
        </Grid.Row>
        <Grid.Row color="black">
          <Grid.Column color='orange' className='device-infobox'>
            
          </Grid.Column>
          <Grid.Column color='yellow' className='device-infobox'>
            
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </div>
  )
}

export default DeviceView

//Note for later, add chart.js to the logic and design of these grids
