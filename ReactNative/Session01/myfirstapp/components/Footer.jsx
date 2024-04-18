import React from 'react'
import { View, Text } from 'react-native'
export default function Footer() {
    return (
        <View style={{
            position: 'absolute',
            display:"flex",
            backgroundColor: '#000000',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 50,
            bottom:0
        }}>
            <Text style={{
                color:"white",
            }}>
                All rights reserved by Annie Anomaly - 2024
            </Text>
        </View>
    )
}
