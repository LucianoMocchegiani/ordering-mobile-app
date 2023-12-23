import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAuth} from '../../../context/authContext'
import DataContainer from '../reutilizables/DataFormContainer'
import ButtonHeader from '../reutilizables/ButtonHeader'


const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={"account"} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Mi cuenta </Text>
            <Text style={{marginLeft:5}}>{'( Admin )'} </Text>
        </View>
    )
}

export default function Account({navigation}){
    const {
       logout,
       user,
    } = useAuth()
    useEffect(()=>{
        console.log(user)
    },[user])

    async function handleLogout(){
        async function asistandLogout(){
            try{
                await logout()
                navigation.navigate('login')
                Alert.alert('Notificacion','Sesion cerrada')
            }catch(error){
                Alert.alert('Error',error.message)
            }
        }
        Alert.alert('Quieres cerrar sesion?', '',[
            {
                text: 'Cerrar sesion',
                onPress: async () => asistandLogout(),
            },
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancelar'),
                style: 'cancel',
            },
        ],)

        
    }

   
    return (
        <View style={styles.container}>
            <Header/>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10,}}>
                <ButtonHeader functionOnPress={()=>handleLogout()} buttonName={'Cerrar sesion'}/> 
            </View>
            <View style={{width:width*0.95, flexDirection:'column', justifyContent: "center", alignItems:'center', marginBottom:10,}}>
                <DataContainer data={'Email'} large={true} />
                <DataContainer data={user?.email} large={true}/>        
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop:heigtStatusBar,
      flex: 1,
      width:width,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    containerHeader:{
        justifyContent: "center",
        alignItems:"center",
        flexDirection:'row',
        height:height*0.08,
    }
});