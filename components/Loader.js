import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

export default function Loader() {
  return (
    <View style={styles.container}>
        <ActivityIndicator size='small'  color={'black'} />
      <Text>Loading ...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    }
})