
import React from "react";
import {View, StyleSheet, Dimensions} from 'react-native';
import DataFormContainer from '../reutilizables/DataFormContainer';

const {width, height} = Dimensions.get('window');

export default function OrderDetailForm({order}){
    return (
        <View style={styles.container}>
            <View style={styles.dataForm}>
                <DataFormContainer data={'Cliente'}/>
                <DataFormContainer data={order.customer}/>
            </View>       
            <View style={styles.dataForm}>
                <DataFormContainer data={'Dni'}/>
                <DataFormContainer data={order.dni}/>
            </View>    
            <View style={styles.dataForm}>
                <DataFormContainer data={'Ubicacion'}/>
                <DataFormContainer data={order.location}/>
            </View>    
            <View style={styles.dataForm}>
                <DataFormContainer data={'Forma de pago'}/>
                <DataFormContainer data={order.way_to_pay.name}/>
            </View>    
            <View style={styles.dataForm}>
                <DataFormContainer data={'Codigo de descuento'}/>
                <DataFormContainer data={order.discount_code_id}/>
            </View>   
            <View style={styles.dataForm}>
                <DataFormContainer data={'Forma de retiro'}/>
                <DataFormContainer data={order.delivery_method.name}/>
            </View>   
            <View style={styles.dataForm}>
                <DataFormContainer data={'Confirmado por'}/>
                <DataFormContainer data={order.seller?order.seller:order.status}/>
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
