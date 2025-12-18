import { useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import Search from '../components/Search';
import Stations from '../components/Stations';
import Arrivals from '../components/Arrivals';

import trainModes from '../helpers/trainModes';

const Train = () => {
  const [stations, setStations] = useState([]);
  const [arrivals, setArrivals] = useState([]);
  const iRef = useRef(setInterval(() => null, 0));

  const getStations = async (stationName: string) => {
    try {
      const res = await fetch(
        `https://api.tfl.gov.uk/StopPoint/Search?query=${stationName}&modes=${trainModes.join()}`,
      );
      const data = await res.json();
      setStations(data.matches);
    } catch (error) {
      console.error(error);
    }
    setArrivals([]);
  };

  const getArrivals = (stationId: string) => {
    clearInterval(iRef.current);
    const fetchArrivals = async () => {
      try {
        const res = await fetch(
          `https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals`,
        );
        const data = await res.json();
        setArrivals(
          data
            .sort((a: any, b: any) => a.timeToStation - b.timeToStation)
            .slice(0, 9),
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

export default Train;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
