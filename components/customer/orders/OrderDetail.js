import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DataContainer from '../reutilizables/DataContainer';
import OrderDetailForm from './OrderDetailForm';
import ButtonHeader from '../reutilizables/ButtonHeader'
import RenderProducts from './RenderProducts';
import { useStorage } from '../../../context/storageContext';
import {deleteOrder} from '../../../firebase/endpoints/orders'
import Loading from '../reutilizables/Loading'
const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={"text-box-outline"} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Detalle del pedido</Text>
        </View>
    )
}

export default function OrderDetail({navigation, route}){
    const {getOrdersStore, loading, setLoading}= useStorage()
    const [order, setOrder]= useState(
        {...route.params}
    )
    async function cancelOrder(id){
        if(order.status === 'Confirmado'){
            Alert.alert('Notificacion','El pedido ya esta confirmado contacte al provedor para cancelarlo.')
            return
        }else{
            const responce = await deleteOrder(id, setLoading)
            Alert.alert('Notificacion',responce.succes?responce.succes:responce.error)
            getOrdersStore()
            return navigation.navigate('Pedidos')
        }
    }
    return (
        
        <View style={styles.container}>
        {loading?<Loading/>:
        <ScrollView>
            <Header/>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10}}>
            <DataContainer data={'Total USD '+ order.total}/>
            <ButtonHeader functionOnPress={()=>cancelOrder(order.id)} buttonName={'Cancelar pedido'}/>
            </View>
            <OrderDetailForm order={order}  />
            <View>
                <RenderProducts data={order.order} />
            </View>
        </ScrollView>}
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