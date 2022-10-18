import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Search from './containers/Search';

export default function App() {
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
  },
});
