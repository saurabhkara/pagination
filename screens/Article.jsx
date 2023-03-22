import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function Article({route}) {
    const item = route?.params?.item;
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={{textAlign:'center'}}>Article</Text>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.goBack()}>
        <Text>
            Back, Main Screen
        </Text>
      </TouchableOpacity>
      <View style={{height:'70%',marginHorizontal:'5%', justifyContent:'center',alignItems:'center'}}>
            <Text>
                {JSON.stringify(item)}
            </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        marginVertical:'20%'
    },
    button:{
        backgroundColor:'lightblue',
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        height:50,
        width:150,
        alignSelf:'center',
        marginVertical:20,
    }
})