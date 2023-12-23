import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DataContainer from '../reutilizables/DataContainer';
import OrderForm from './OrderForm';
import ButtonHeader from '../reutilizables/ButtonHeader'
import RenderProducts from './RenderProducts';
import { useStorage } from '../../../context/storageContext';
import {postOrder} from '../../../firebase/endpoints/orders'
import Loading from '../reutilizables/Loading'
import CardProduct from "./CardProducts";
const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={"text-box-outline"} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Generar pedido</Text>
        </View>
    )
}

export default function NewOrder({navigation}){
    const {cart, dni, total, discountCode, setCart, getOrdersStore, loading, setLoading}= useStorage()

    const [order, setOrder]= useState(
        {
            customer:'',
            seller:'',
            dni:dni,
            location:'',
            way_to_pay:{id:'Efectivo', name:'Efectivo'},
            status:'Pendiente de confirmacion',
            total:total,
            discount_code_id:discountCode.id,
            delivery_method:{id:'Retiro en el local',name:'Retiro en el local'},
            order:[...cart],
        }
    )

    async function sendOrder(data){
        if(!order.customer||!order.dni||!order.location){
            Alert.alert('Notificacion','Debes completar todos los campos.',[{
                text:'Ok', 
                style:'cancel'
            }])
        }else{
            setLoading(true)
            const responce = await postOrder(setLoading, data)
            if(responce){
                getOrdersStore()
                navigation.navigate('Pedidos')
                setCart([])

            }
        }
    }
    return (
        
        <View style={styles.container}>
        {loading?<Loading/>:
        <ScrollView>
            <Header/>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10}}>
            <DataContainer data={'Total USD '+ total}/>
            <ButtonHeader functionOnPress={()=>sendOrder(order)} buttonName={'Enviar pedido'}/>
            </View>
            <OrderForm order={order} setOrder={setOrder} />
            <View>
                <RenderProducts data={cart} />
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