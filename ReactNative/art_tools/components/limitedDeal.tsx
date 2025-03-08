import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function LimitedDeal({ discount }: { discount: number }) {
  // Return null if discount is 0
  if (discount === 0) {
    return null;
  }
  
  // Convert decimal to percentage (1 => 100%, 0.5 => 50%)
  const percentage = Math.round(discount * 100);
  
  return (
    <View style={styles.container}>
      <Text style={styles.discountText}>{percentage}% OFF</Text>
      <Text style={styles.limitedText}>LIMITED DEAL</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height:"auto",
    marginVertical:5,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14, // Bigger text for impact
    textAlign: 'center',
  },
  limitedText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 3,
    textAlign: 'center',
  }
});