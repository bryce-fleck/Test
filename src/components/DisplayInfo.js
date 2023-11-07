import React from 'react'
import { Typography } from '@mui/material';
import { CardMedia } from '@mui/material';

function DisplayInfo({ distanceInMiles }) {
    return (
        <CardMedia style={{ textAlign: 'center', marginTop: '7%', marginBottom: '7%' }}>
            <Typography variant="h3" gutterBottom>
                Distance nautical miles
            </Typography>
            <Typography variant="h5" gutterBottom>
                {distanceInMiles.toFixed(2)}
            </Typography>
        </CardMedia>
    )
}

export default DisplayInfo
