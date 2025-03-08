import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function LimitedDealIndex({ discount }: { discount: number }) {
  // Return null if discount is 0
  if (discount === 0) {
    return null;
  }
  
  // Convert decimal to percentage (1 => 100%, 0.5 => 50%)
  const percentage = Math.round(discount * 100);
  
  return (
    <View style={styles.container}>
      <Text style={styles.discountText}>{percentage}%</Text>
      <Text style={styles.limitedText}>OFF</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d32f2f',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
    maxWidth: '40%', // Limit width to prevent overflow
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  limitedText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  }
});