import { StyleSheet, Button, View } from 'react-native';
import React from 'react';

interface StationsInterface {
  stations: any[];
}

const Stations: React.FC<StationsInterface> = ({ stations }) => {
  return (
    <View style={styles.stationsContainer}>
      {stations.map((station: any) => {
        return (
          <View key={station.id} style={styles.station}>
            <Button color={'#113b92'} title={station.name} />
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
