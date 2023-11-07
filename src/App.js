import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { airportDataApi } from "./Api";
import Distance from "./components/Distance";
import Loader from "./components/Loader";
import { Button } from '@mui/material';
import FromAutocomplete from "./components/FromAutocomplete";
import ToAutocomplete from "./components/ToAutocomplete";

function App() {
  const [airports, setAirports] = useState([]);
  const [airportFromData, setAirportFromData] = useState({});
  const [airportToData, setAirportToData] = useState({});
  const [distanceInMiles, setDistanceInMiles] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const isSubmitDisabled = !(airportFromData?.latitude && airportFromData?.longitude && airportToData?.latitude && airportToData?.longitude);


  useEffect(() => {
    setIsLoading(true)
    getAirPortData();
  }, []);

  const getAirPortData = () => {
    axios
      .get(airportDataApi())
      .then((response) => {
        setAirports(response?.data?.data || [])
        setIsLoading(false)
      })
  }


  const handleAirportChange = (value, isFrom) => {
    if (isFrom) {
      setAirportFromData(value);
    } else {
      setAirportToData(value);
    }
  };

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    // Convert the distance to nautical miles
    const nauticalMiles = distance * 0.539957;
    return nauticalMiles;
  }

  const submit = () => {
    const distanceInNauticalMiles = haversine(airportFromData?.latitude, airportFromData?.longitude, airportToData?.latitude, airportToData?.longitude);
    setDistanceInMiles(distanceInNauticalMiles)
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="wrapper-container" >
          <div className="wrapper" >
            <div style={{ display: 'flex' }}>
              <FromAutocomplete change={handleAirportChange} airports={airports} />
              <ToAutocomplete change={handleAirportChange} airports={airports} />
            </div>
            <Button variant="contained" size="medium" color="primary" disabled={isSubmitDisabled} onClick={() => submit()} >
              Submit
            </Button>
          </div>
          {distanceInMiles && distanceInMiles !== 0 && <Distance distanceInMiles={distanceInMiles} />}
        </div>
      )}
    </>
  );
}

export default App;
