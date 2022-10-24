import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import stationName from '../helpers/stationName';

interface ArrivalInterface {
  destination: string;
  current: string;
}

const Arrival: React.FC<ArrivalInterface> = ({ destination, current }) => {
  return (
    <View style={styles.arrival}>
      <View style={styles.top}>
        <Text>{stationName(destination)}</Text>
        <Text>Due</Text>
      </View>
      {current && <Text>Currently {current}</Text>}
    </View>
  );
};

export default Arrival;

const styles = StyleSheet.create({
  arrival: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderRadius: 6,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
