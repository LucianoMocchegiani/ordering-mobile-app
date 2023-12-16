import React, { useState, useEffect} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');

function ProductImage({image}){
    return(
        <View style={productImageStyle.container}>
            {!image?<Icon name={'package-variant-closed'} size={100} color="#534e4e" />:
            <Icon name={'package-variant-closed'} size={30} color="black" />}
        </View>
    )
}
const productImageStyle = StyleSheet.create({
    container: {
      width:'32%',
      marginLeft:'4%',
      marginRight:'4%',
      height:'100%',
      alignItems: "center",
      justifyContent: "center",
    },
});

function ToCarButton({navigationFunction, stock}){

    return(
        <View style={ToCarButtonStyle.container}>
            <View style={ToCarButtonStyle.plusMinus}>
                <Text> Stock {stock} </Text>
            </View>
            <TouchableOpacity
                onPress={() => navigationFunction()}
                style={ToCarButtonStyle.add}
            >
                <Text> Ver detalle </Text>
            </TouchableOpacity>
        </View>
    )
}
const ToCarButtonStyle = StyleSheet.create({
    container: {
      flexDirection:'row',
      alignItems: "center",
      justifyContent: "center",
      width:'100%',
      height:height*0.05,
    },
    plusMinus:{
        flexDirection:'row',
        width:'40%',
        alignItems:'center',
        justifyContent:'center',
        
    },
    add:{
        width:'50%',
        marginLeft:'5%',
        marginRight:'5%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#fff",
        borderColor:"#5c7ae3",
        borderWidth:1.5,
        borderRadius:8,
        height:'90%'
    },
    amount:{
        fontSize:18,
        width:'50%',
        textAlign:'center',
        paddingHorizontal:0
    }
});

export default function CardProduct({navigation, category, image, name, description, price, product, discount}){
    return(
        <View style={CardProductStyle.container}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('productDetail',{product:product})}
            >
            <Text style={CardProductStyle.category}>{category}</Text>
            <View style={{flexDirection:'row', height:'60%', width:'100%',}}>
                <ProductImage
                    image={image}
                />
                <View style={{width:'60%'}}>
                    <Text style={CardProductStyle.name}>{name}</Text>
                    <Text style={CardProductStyle.description}>{description}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={CardProductStyle.price}>USD {price}</Text>
                        <Text style={{...CardProductStyle.price, color:'red', marginLeft:10}}>-{discount}%</Text>
                        <Text style={{...CardProductStyle.price, color:'red', marginLeft:10}}>USD {price - price*(discount/100)}</Text>
                    </View>
                  
                </View>
            </View>
            </TouchableOpacity>
            <ToCarButton navigationFunction={() => navigation.navigate('productDetail',{product:product})}
                stock = {product.stock}
            />
        </View>
    )
}
const CardProductStyle = StyleSheet.create({
    container: {
        width:width*0.95,
        height:height*0.3,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderWidth:1,
        borderColor:'black',
        paddingHorizontal:0,
        marginBottom:15,
    },
    category:{
        color:"#867f7f",
        width:'100%',
        paddingLeft:'7%'
    },
    name:{
        fontSize:14,
    },
    description:{
        color:"#867f7f",
        fontSize:12,
    },
    price:{
        color:'#08631c',
    },
});
