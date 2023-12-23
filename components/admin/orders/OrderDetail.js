import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DataContainer from '../reutilizables/DataContainer';
import OrderDetailForm from './OrderDetailForm';
import ButtonHeader from '../reutilizables/ButtonHeader'
import RenderProducts from './RenderProducts';
import { useStorage } from '../../../context/storageContext';
import { useAuth} from '../../../context/authContext'
import {deleteOrder, comfirmedPutOrder} from '../../../firebase/endpoints/orders'
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
    const { getOrdersStorePending,getOrdersStoreConfirmed, loading, setLoading}= useStorage()
    const {user} = useAuth()
    const [order, setOrder]= useState(
        {...route.params}
    )
    async function cancelOrder(id){
        const responce = await deleteOrder(id, setLoading)
        Alert.alert('Notificacion',responce.succes?responce.succes:responce.error)
        getOrdersStore()
        return navigation.navigate('orders')
    }
    async function comfirmedOrder(){
        const responce = await comfirmedPutOrder(setLoading, order.id, order, user.email)

        if(responce){
            getOrdersStorePending()
            getOrdersStoreConfirmed()
            Alert.alert('Notificacion', 'Pedido confirmado con exito, Stock actualizado')
            navigation.navigate('Confirmados')
        }
    }
    return (
        
        <View style={styles.container}>
        {loading?<Loading/>:
        <ScrollView>
            <Header/>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10}}>
                {order.status==='Confirmado'?<></>:<><ButtonHeader functionOnPress={()=>cancelOrder(order.id)} buttonName={'Cancelar pedido'}/>
                <ButtonHeader functionOnPress={()=>comfirmedOrder(order.id)} buttonName={'Comfirmar'}/></>}
            </View>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10}}>
                <DataContainer data={'Total USD '+ order.total}/>
                <DataContainer data={'Pedido '+order.id} 
                    customStyles={{text:{color: "black",
                    fontWeight: "bold",
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontSize:11,}}}
                />
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