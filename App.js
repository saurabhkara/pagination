import MainScreen from "./screens/MainScreen";
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Article from "./screens/Article";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="main">
        <Stack.Screen name="main" component={MainScreen}/>
        <Stack.Screen name="article" component={Article}/>
      </Stack.Navigator>
    </NavigationContainer>
   
  )
}


