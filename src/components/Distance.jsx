import React from 'react';
import { Card } from '@mui/material';
import { Grid } from '@mui/material';
import DisplayInfo from './DisplayInfo';


function Distance({ distanceInMiles }) {

  return (
    <div >
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
          <Card>
            <DisplayInfo distanceInMiles={distanceInMiles} />
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}
export default Distance