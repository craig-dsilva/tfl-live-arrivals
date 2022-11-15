import { StyleSheet, Button, View } from 'react-native';
import React, { useRef } from 'react';

import stationName from '../helpers/stationName';

interface StationsInterface {
  stations: any[];
  handleArrivals: any;
}

const Stations: React.FC<StationsInterface> = ({
  stations,
  handleArrivals,
}) => {
  const iRef = useRef<any>();

  const getArrivals = (stationId: string) => {
    clearInterval(iRef.current);
    const fetchArrivals = async () => {
      try {
        const res = await fetch(
          `https://api.tfl.gov.uk/StopPoint/${stationId}/Arrivals`
        );
        const data = await res.json();
        handleArrivals(
          data
            .sort((a: any, b: any) => a.timeToStation - b.timeToStation)
            .slice(0, 9)
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchArrivals();
    iRef.current = setInterval(() => fetchArrivals(), 30000);
  };
  return (
    <View style={styles.stationsContainer}>
      {stations.map((station: any) => {
        return (
          <View key={station.id} style={styles.station}>
            <Button
              color={'#113b92'}
              title={stationName(station.name)}
              onPress={() => getArrivals(station.id)}
            />
          </View>
        );
      })}
    </View>
  );
};

export default Stations;

const styles = StyleSheet.create({
  stationsContainer: {
    flex: 5,
  },
  station: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
  },
});
