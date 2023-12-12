import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Icon } from 'react-native-gradient-icon';
import {View,Text,TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {AuthProvider, } from '../context/authContext'
//-----------------------Productos------------------------------------
import MenuProductos from "./Productos/MenuProductos";
import Productos from './Productos/Productos'
import InformacionProducto from './Productos/Informacion-Editar'
import AgregarUno from './Productos/Agregar-Uno'
import Categorias from './Productos/Nueva-Categoria'
//-----------------------cobrar------------------------------------
import MenuCobrar from "./Cobrar/MenuCobrar";
import BucarProductos from './Cobrar/BuscarProductos'
import Ventas from './Cobrar/Ventas'
import VentaResumen from './Cobrar/VentaResumen'
//-----------------------cuenta------------------------------------
import ButtonNav from './Reutilizables/ButtonNav';
// Components
import Register from "./Login/Register";
import Login from "./Login/Login";
import Starting from "./Login/Starting"
import Cuenta from "./Cuenta/firestore"
import Customers from './Clientes/Customers'
import InformationClient from './Clientes/Client-Edit-Info'
import AddClient from './Clientes/Add-Client'
import Providers from './Provedores/Providers'
import AddProvider from './Provedores/Add-Provider'
import InformationProvider from './Provedores/Provider-Edit-Info'
import LinkProfileToUser from './Cuenta/Link-Profile'
import MyProfiles from './Cuenta/MyProfiles'
import MyAcount from './Cuenta/MyAcount';
import MyBusiness from './Cuenta/MyBusiness';
import ConfigProfile from './Cuenta/ConfigProfile'
import UserSelection from './Cuenta/UserSelection'
import LoadingScreen from './Reutilizables/LoadingScren'





const {width, height} = Dimensions.get('window');
const Stack = createNativeStackNavigator();
const iconSize= 100;
function MenuPrincipal(){
    console.log("------------------------")
    console.log("MenuPrincipal")
    const navigation = useNavigation();
    console.log("------------------------")
    return(
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>navigation.navigate("MenuProductos")}
                iconSelect={"storefront"}
                buttonSize={100}
                buttonName={"Productos"}/>
            </View>
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>navigation.navigate("MenuCobrar")}
                iconSelect={"cash-register"}
                buttonSize={100}
                buttonName={"Cobrar"}/>
            </View>
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>navigation.navigate("Ventas")}
                iconSelect={"format-list-bulleted-square"}
                buttonSize={100}
                buttonName={"Ventas"}/>
            </View>
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>navigation.navigate("Customers")}
                iconSelect={"account-group"}
                buttonSize={100}
                buttonName={"Clientes"}/>
            </View>
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>navigation.navigate("Providers")}
                iconSelect={"account-group"}
                buttonSize={100}
                buttonName={"Provedores"}/>
            </View>
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>navigation.navigate("Cuenta")}
                iconSelect={"account"}
                buttonSize={100}
                buttonName={"Cuenta"}/>
            </View>
            
        </View>
    );

}
export default function MenuMain(){
   
    
    return( 
        <NavigationContainer>  
            <AuthProvider>
            <Stack.Navigator initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                }}>
               <Stack.Screen name="MenuPrincipal" component={MenuPrincipal}/>
                <Stack.Screen name="Cuenta" component={Cuenta}/>
                <Stack.Screen name="MenuProductos" component={MenuProductos}/>
                <Stack.Screen name="MenuCobrar" component={MenuCobrar}/>
                {/* //-----------------------MenuProductos------------------------------------ */}
                <Stack.Screen name="Productos" component={Productos}/>
                <Stack.Screen name="Producto-info" component={InformacionProducto}/>
                <Stack.Screen name="AgregarUno" component={AgregarUno}/>
                <Stack.Screen name="Categorias" component={Categorias}/>        
                {/* //-----------------------MenuCobrar------------------------------------ */}
                <Stack.Screen name="BucarProductos" component={BucarProductos}/>
                <Stack.Screen name="Ventas" component={Ventas}/>
                <Stack.Screen name="VentaResumen" component={VentaResumen}/>
                {/* //-----------------------Cuenta------------------------------------ */}
                <Stack.Screen name="Login" component={Login}/> 
                <Stack.Screen
                name="Register"
                component={Register}
                />
                 <Stack.Screen
                name="Starting"
                component={Starting}
                />
                <Stack.Screen
                name="MyProfiles"
                component={MyProfiles}
                options={{
                    headerLeft: (props) => (
                     console.log("hola"))}}
                />
                 <Stack.Screen
                name="MyAcount"
                component={MyAcount}
                />
                 <Stack.Screen
                name="MyBusiness"
                component={MyBusiness}
                />
                <Stack.Screen
                name="Link-Profile-To-User"
                component={LinkProfileToUser}
                />
                <Stack.Screen
                name="ConfigProfile"
                component={ConfigProfile}
                />
                 <Stack.Screen
                name="UserSelection"
                component={UserSelection}
                />
                <Stack.Screen
                name="Customers"
                component={Customers}
                />
                <Stack.Screen
                name="Client-info"
                component={InformationClient}
                />
                <Stack.Screen
                name="Add-client"
                component={AddClient}
                />
                <Stack.Screen
                name="Providers"
                component={Providers}
                />
                <Stack.Screen
                name="Add-providers"
                component={AddProvider}
                />
                <Stack.Screen
                name="Provider-info"
                component={InformationProvider}
                />
                <Stack.Screen
                name="LoadingScreen"
                component={LoadingScreen}
                />

            
              
            </Stack.Navigator>
            </AuthProvider>
        </NavigationContainer>
    )
}


const styles = StyleSheet.create({
    container:{
        width:width,
        flex:1,  
        flexWrap:'wrap',
    },
    buttom:{
      width: width/4,
      height: height/6,
    },
    buttonContainer:{
        width: width/2,
        height: height/3,
        alignItems:"center",
        justifyContent: "center",
    },   
    text:{
        width:"100%",
        textAlign: "center",
    },
})
