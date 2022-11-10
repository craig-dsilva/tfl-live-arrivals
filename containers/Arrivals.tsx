import { StyleSheet, View } from 'react-native';
import React from 'react';

import Arrival from './Arrival';

interface ArrivalsInterface {
  arrivals: any[];
}

const Arrivals: React.FC<ArrivalsInterface> = ({ arrivals }) => {
  return (
    <View style={styles.arrivalsContainer}>
      {arrivals.map((arrival: any) => {
        return (
          <Arrival
            key={arrival.id}
            destination={arrival.destinationName}
            lineName={arrival.lineName}
            timeToStation={arrival.timeToStation}
          />
        );
      })}
    </View>
  );
};

export default Arrivals;

const styles = StyleSheet.create({
  arrivalsContainer: {
    flex: 5,
  },
});
