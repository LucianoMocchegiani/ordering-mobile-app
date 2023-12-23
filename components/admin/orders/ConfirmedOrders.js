import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import Loading from '../reutilizables/Loading';
import RenderOrders from './RenderOrders';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStorage} from '../../../context/storageContext';

const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');
function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={"text-box-outline"} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Pedidos comfirmados</Text>
        </View>
    )
}
export default function PedidosRecividos({navigation, route}){
    const {getOrdersStoreConfirmed, getOrdersStoreConfirmedOnScroll, ordersConfirmed, loading, setLoading}= useStorage()

    useEffect(()=>{
        getOrdersStoreConfirmed()
    },[])
    
    return (
        <View style={styles.container}>
            <Header/>
            <View>
                {loading?<Loading/>:
                <RenderOrders 
                    data={ordersConfirmed} 
                    onScrollFunction={()=>getOrdersStoreConfirmedOnScroll()}
                    navigation={navigation}
                    />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop:heigtStatusBar,
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