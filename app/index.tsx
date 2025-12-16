import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useRouter } from 'expo-router';

const index = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Train" onPress={() => router.navigate('/train')} />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});
