import React, { useState, useEffect} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStorage} from '../../../context/storageContext';

const {width, height} = Dimensions.get('window');

function ProductImage({imagen}){
    return(
        <View style={productImageStyle.container}>
            {!imagen?<Icon name={'package-variant-closed'} size={100} color="#534e4e" />:
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

function OutCartButton({product}){
    const {removeProductFromCart,updateAmountProduct}= useStorage()
    const [amount, setAmount] = useState(product.amount<1?1:product.amount)

    useEffect(()=>{
        console.log('dsadasdasda')
        updateAmountProduct(product, amount)
    },[amount])

    function handlePressAmount(){
        if(amount < 2){
            return
        }else{
            setAmount(amount-1) 
        }
    }
    function handlePressRemove(){
        removeProductFromCart(product)
    }
    return(
        <View style={outCartButtonStyle.container}>
            <View style={outCartButtonStyle.plusMinus}>
                <TouchableOpacity
                    onPress={() => setAmount(amount+1)}
                >
                    <Icon name={'plus-circle-outline'} size={30} color="#867f7f" />
                </TouchableOpacity>
                <Text style={outCartButtonStyle.amount}>{amount}</Text>
                <TouchableOpacity
                    onPress={() => handlePressAmount()}
                >
                    <Icon name={'minus-circle-outline'} size={30} color="#867f7f" />
                </TouchableOpacity>
            </View> 
            <TouchableOpacity
                onPress={() => handlePressRemove()}
                style={outCartButtonStyle.add}
            >
                <Text> Quitar </Text>
            </TouchableOpacity>
        </View>
    )
}
const outCartButtonStyle = StyleSheet.create({
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

export default function CardProduct({category, image, name, description, price, product}){
    return(
        <View style={CardProductStyle.container}>
            <Text style={CardProductStyle.category}>{category}</Text>
            <View style={{flexDirection:'row', height:'60%', width:'100%',}}>
                <ProductImage
                    imagen={image}
                />
                <View style={{width:'60%'}}>
                    <Text style={CardProductStyle.name}>{name}</Text>
                    <Text style={CardProductStyle.description}>{description}</Text>
                    <Text style={CardProductStyle.price}>{price}</Text>
                </View>
            </View>
            <OutCartButton product={product} />
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
