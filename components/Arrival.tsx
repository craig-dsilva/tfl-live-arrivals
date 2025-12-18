import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

import stationName from '../helpers/stationName';
import toMinutes from '../helpers/toMinutes';
import tubeColour from '../helpers/tubeColours.json';

interface ArrivalInterface {
  destination: string;
  lineName: string;
  timeToStation: number;
}

interface tubeColourInterface {
  Bakerloo: string[];
  District: string[];
  'Elizabeth line': string[];
  'Hammersmith & City': string[];
  Jubilee: string[];
  'London Overground': string[];
  Metropolitan: string[];
  Piccadilly: string[];
  'Waterloo & City': string[];
  Central: string[];
  Circle: string[];
  Northern: string[];
  Victoria: string[];
  DLR: string[];
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
          {!destination
            ? 'Check Front of Train'
            : stationName(destination).replace(/ *\([^)]*\) */g, '')}
        </Text>

        <Text>
          <Image
            source={require('../assets/signal.png')}
            style={{ width: 25, height: 25 }}
          />
          {timeToStation && toMinutes(timeToStation)}
        </Text>
      </View>
      <View
        style={{
          backgroundColor:
            tubeColour[lineName as keyof tubeColourInterface] &&
            tubeColour[lineName as keyof tubeColourInterface][0],
          maxWidth: 100,
          borderRadius: 7,
          padding: 5,
        }}
      >
        <Text
          style={{
            color:
              tubeColour[lineName as keyof tubeColourInterface] &&
              tubeColour[lineName as keyof tubeColourInterface][1],
          }}
        >
          {lineName === 'Hammersmith & City' ? "H'smith & City" : lineName}
        </Text>
      </View>
    </View>
  );
};

export default Arrival;

const styles = StyleSheet.create({
  arrival: {
    margin: 4,
    padding: 4,
    borderRadius: 6,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
