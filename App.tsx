import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import Search from './containers/Search';
import Stations from './containers/Stations';
import Arrivals from './containers/Arrivals';

const App = () => {
  const [stations, setStations] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const iRef = useRef<any>();

  const getStations = (stationName: string) => {
    const fetchStations = async () => {
      try {
        const res = await fetch(
          `https://api.tfl.gov.uk/StopPoint/Search/${stationName}`
        );
        const data = await res.json();
        setStations(data.matches.filter((stn: any) => stn.zone));
      } catch (error) {
        console.error(error);
      }
    };
    fetchStations();
    setArrivals([]);
  };

  const getArrivals = (stationId: string) => {
    clearInterval(iRef.current);
    const fetchArrivals = async () => {
      try {
        const res = await fetch(
          `https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals`
        );
        const data = await res.json();
        setArrivals(
          data.sort((a: any, b: any) => a.timeToStation - b.timeToStation)
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchArrivals();
    iRef.current = setInterval(() => fetchArrivals(), 30000);
  };

  return (
    <View style={styles.container}>
      <Search handleStations={getStations} />
      {arrivals.length > 0 ? (
        <Arrivals arrivals={arrivals} />
      ) : (
        <Stations stations={stations} handleArrivals={getArrivals} />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
