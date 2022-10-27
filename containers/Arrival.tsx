import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import stationName from '../helpers/stationName';
import toMinutes from '../helpers/toMinutes';

interface ArrivalInterface {
  destination: string;
  lineName: string;
  timeToStation: number;
}

const Arrival: React.FC<ArrivalInterface> = ({
  destination,
  lineName,
  timeToStation,
}) => {
  return (
    <View style={styles.arrival}>
      <View style={styles.top}>
        <Text>
          {!destination ? 'Check Front of Train' : stationName(destination)}
        </Text>

        <Text>
          <Image
            source={require('../assets/signal.png')}
            style={{ width: 25, height: 25 }}
          />
          {timeToStation && toMinutes(timeToStation)}
        </Text>
      </View>
      <Text>{lineName}</Text>
      {/* {current && <Text>Currently {current}</Text>} */}
    </View>
  );
};

export default Arrival;

const styles = StyleSheet.create({
  arrival: {
    margin: 8,
    padding: 8,
    borderRadius: 6,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
