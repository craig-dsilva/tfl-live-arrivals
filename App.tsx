import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Search from './containers/Search';
import Stations from './containers/Stations';

const App = () => {
  const [stations, setStations] = useState([]);

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
  };

  return (
    <View style={styles.container}>
      <Search handleStations={getStations} />
      <Stations stations={stations} />
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
