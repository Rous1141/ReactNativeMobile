import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PriceTag({ price }: { price: number }) {
  
  return (
    <View style={styles.container}>
      <Text style={styles.priceText}>
        <Text style={styles.dollarSign}>$</Text>{price}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d32f2f', // Red tone background
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginVertical:5,
  },
  priceText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dollarSign: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  }
});
