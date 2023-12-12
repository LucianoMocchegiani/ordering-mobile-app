import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View,Text} from 'react-native';
//screens
const Stack = createNativeStackNavigator();

export default function MenuTareas(){
    return(
        <View>
            <Text 
             style={{
                fontSize:30,
                textAlign:"center", 
                marginTop:"20%"
            }}>Tareas</Text>
        </View>
    );
}