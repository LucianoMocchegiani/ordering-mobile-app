import { Alert, StatusBar } from 'react-native';
import React from "react";
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderProducts from './RenderProducts';
import {useStorage} from '../../context/storageContext'
import ButtonHeader from '../reutilizables/ButtonHeader'
import DataContainer from '../reutilizables/DataContainer';

const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={"cart"} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Carro</Text>
        </View>
    )
}

export default function Cart({navigation}){
    const { cart, cleanCart, total }= useStorage()
    function generateOrder(){
        if(cart.length){
            navigation.navigate("newOrder")
        }else{
            Alert.alert('Error','No hay nada en el carro.',[{
                text:'Ok', 
            }])
        }

    }
    return (
        <View style={styles.container}>
            <Header/>
            <DataContainer data={'Total USD '+ total}/>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10}}>
            {/* VACIAR CARRO */}
            <ButtonHeader functionOnPress={()=>cleanCart()} buttonName={'Vaciar carro'}/>
            {/* ENVIAR PEDIDO */}
            <ButtonHeader functionOnPress={()=>generateOrder()} buttonName={'Generar pedido'}/>
            </View>
            <View>
                <RenderProducts data={cart} />
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