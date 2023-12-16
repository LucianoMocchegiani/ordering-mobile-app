
import React, { useState, useEffect} from "react";
import {View, TextInput, StyleSheet, Dimensions} from 'react-native';
import DataFormContainer from '../reutilizables/DataFormContainer';
import SelectComponent from '../reutilizables/SelectStyle'
const {width, height} = Dimensions.get('window');

export default function OrderForm({order, setOrder}){
   
    const setWayToPay = (data) =>{
        setOrder(
            {
                ...order,
                way_to_pay: data
            }
        )
    }
    const setDeliveryMethod = (data) =>{
        setOrder(
            {
                ...order,
                delivery_method: data
            }
        )
    }
    const handleChange = (e, atributo) => {       
        setOrder({
            ...order,
            [atributo]:e
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.dataForm}>
                <DataFormContainer data={'Cliente'}/>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(e) => handleChange(e, 'customer')}
                    placeholder={'Ingrese nombre...'}
                />
            </View>       
            <View style={styles.dataForm}>
                <DataFormContainer data={'Dni'}/>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(e) => handleChange(e, 'dni')}
                    placeholder={'Ingrese dni...'}
                    value={order.dni}
                />
            </View>    
            <View style={styles.dataForm}>
                <DataFormContainer data={'Ubicacion'}/>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(e) => handleChange(e, 'location')}
                    placeholder={'Ingrese ubicacion...'}
                />
            </View>    
            <View style={styles.dataForm}>
                <DataFormContainer data={'Forma de pago'}/>
                <SelectComponent
                    text={''}
                    text2={''}
                    arraySelects={[
                        {id:'Efectivo',name:'Efectivo'},
                        {id:'Transferencia',name:'Transferencia'},
                        {id:'Credito',name:'Credito'},
                        {id:'Debito',name:'Debito'}
                    ]}
                    selectFunction={setWayToPay}
                />
            </View>    
            <View style={styles.dataForm}>
                <DataFormContainer data={'Codigo de descuento'}/>
                <DataFormContainer data={order.discount_code_id}/>
            </View>   
            <View style={styles.dataForm}>
                <DataFormContainer data={'Forma de retiro'}/>
                <SelectComponent
                    text={''}
                    text2={''}
                    arraySelects={[
                        {id:'Retiro en el local',name:'Retiro en el local'},
                        {id:'Envio',name:'Envio'},
                    ]}
                    selectFunction={setDeliveryMethod}
                />
            </View>   
            <View style={styles.dataForm}>
                <DataFormContainer data={'Confirmado por'}/>
                <DataFormContainer data={order.seller}/>
            </View>         
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width*0.95, 
        alignItems:'center',
        justifyContent:'center',
        paddingTop:10,
        borderColor:"black",
        borderWidth:1.5,
        marginBottom:10,
    },
    dataForm:{
        width:'100%',
        flexDirection:'row', 
        justifyContent: "space-around", 
        marginBottom:10
    },
    textInput: {
        width:width*0.45,
        height:height*0.05,
        backgroundColor:"#fff",
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:"black",
        borderWidth:1.5,
    },
    text:{
       color: "black",
       fontWeight: "bold",
       textAlign: "center",
       textTransform: "uppercase",
       fontSize:12,
    },
});
