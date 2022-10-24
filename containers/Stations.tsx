import { StyleSheet, Button, View } from 'react-native';
import React from 'react';

import stationName from '../helpers/stationName';

interface StationsInterface {
  stations: any[];
  handleArrivals: (stationId: string) => void;
}

const Stations: React.FC<StationsInterface> = ({
  stations,
  handleArrivals,
}) => {
  return (
    <View style={styles.stationsContainer}>
      {stations.map((station: any) => {
        return (
          <View key={station.id} style={styles.station}>
            <Button
              color={'#113b92'}
              title={
                station.name.includes('Station')
                  ? stationName(station.name)
                  : station.name
              }
              onPress={() => handleArrivals(station.id)}
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
