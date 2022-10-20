import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import Search from './containers/Search';
import Stations from './containers/Stations';
import Arrivals from './containers/Arrivals';

const App = () => {
  const [stations, setStations] = useState([]);
  const [arrivals, setArrivals] = useState([]);

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
    const fetchArrivals = async () => {
      try {
        const res = await fetch(
          `https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals`
        );
        const data = await res.json();
        setArrivals(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArrivals();
  };

  console.log(arrivals);

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
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});
