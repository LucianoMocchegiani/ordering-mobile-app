import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AuthProvider, } from '../context/authContext'
import { StorageProvider } from '../context/storageContext';
//-------components
import Login from './login/Login'
import NavBar from './NavigationNavBar'
import NewOrder from './orders/NewOrder'
import OrderDetail from './orders/OrderDetail'
import NuevoProducto from './productos/NuevoProducto'
import DetalleProducto from './productos/DetalleProducto'

const Stack = createNativeStackNavigator();

export default function Navigation(){
   
    return( 
        <NavigationContainer>  
            <AuthProvider>
            <StorageProvider>
            <Stack.Navigator 
                initialRouteName="login"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="login" component={Login}/>
                {/* //-----------------------Ingreso Propietario------------------------------------ */}
                <Stack.Screen name="navBar" component={NavBar} />
                <Stack.Screen name="newOrder" component={NewOrder}/>
                {/* //-----------------------Ingreso Propietario------------------------------------ */}
                <Stack.Screen name="nuevoProducto" component={NuevoProducto}/>
                <Stack.Screen name="detalleProducto" component={DetalleProducto}/>
                <Stack.Screen name="orderDetail" component={OrderDetail}/>                   
            </Stack.Navigator>
            </StorageProvider>
            </AuthProvider>  
        </NavigationContainer>
    )
}
