import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Search from './containers/Search';
import Stations from './containers/Stations';
import Arrivals from './containers/Arrivals';

const App = () => {
  const [stations, setStations] = useState([]);
  const [arrivals, setArrivals] = useState([]);

  return (
    <View style={styles.container}>
      <Search handleStations={setStations} handleArrivals={setArrivals} />
      {arrivals.length > 0 ? (
        <Arrivals arrivals={arrivals} />
      ) : (
        <Stations stations={stations} handleArrivals={setArrivals} />
      )}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
