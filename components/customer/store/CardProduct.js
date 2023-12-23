import React, { useState, useEffect} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useStorage} from '../../../context/storageContext'
const {width, height} = Dimensions.get('window');

function ProductImage({image}){
    return(
        <View style={productImageStyle.container}>
            {image?<Image source={{uri:image, width:width*0.30, height:width*0.30}} width={width*0.30} height={width*0.30}/>: 
            <Icon name={'package-variant-closed'} size={100} color="#534e4e" />}
        </View>
    )
}
const productImageStyle = StyleSheet.create({
    container: {
      width:width*0.30,
      marginLeft:'4%',
      marginRight:'4%',
      height:width*0.30,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor:'red'
    },
});

function ToCarButton({product}){
    const { addProductToCart}= useStorage()
    const [amount, setAmount] = useState(0)
    function handlePressAmount(){
        if(amount < 1){
            return
        }else{
            setAmount(amount-1) 
        }
    }
    function handlePressAdd(){
        addProductToCart(product, amount)
    }
    return(
        <View style={ToCarButtonStyle.container}>
            <View style={ToCarButtonStyle.plusMinus}>
                <TouchableOpacity
                    onPress={() => setAmount(amount+1)}
                >
                    <Icon name={'plus-circle-outline'} size={30} color="#867f7f" />
                </TouchableOpacity>
                <Text style={ToCarButtonStyle.amount}>{amount}</Text>
                <TouchableOpacity
                    onPress={() => handlePressAmount()}
                >
                    <Icon name={'minus-circle-outline'} size={30} color="#867f7f" />
                </TouchableOpacity>
            </View> 
            <TouchableOpacity
                onPress={() => handlePressAdd()}
                style={ToCarButtonStyle.add}
            >
                <Text> Agregar </Text>
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

export default function CardProduct({category, image, name, description, price, product}){

    const { discountCode ,  categoriesData }= useStorage()
    function discountValue(){
        if(Number(discountCode.discount) === 0){
            return null
        }
        else if (product.discount_codes&& product.discount_codes?.includes(discountCode.id)){
            const newPrice = Number(price) - (Number(discountCode.discount)/100)*Number(price)
            let priceDiscount= {
                price: newPrice,
                discount: Number(discountCode.discount),
                product:{...product, dolar_price:newPrice}
            }
            return priceDiscount
        }else{
            return null
        }
    }
    const categoryName= categoriesData.filter(e => e.id === category)
    return(
        <View style={CardProductStyle.container}>
            <Text style={CardProductStyle.category}>{categoryName[0]?.name}</Text>
            <View style={{flexDirection:'row', height:'60%', width:'100%',}}>
                <ProductImage
                    image={image}
                />
                <View style={{width:'60%'}}>
                    <Text style={CardProductStyle.name}>{name}</Text>
                    <Text style={CardProductStyle.description}>{description}</Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={!discountValue()?CardProductStyle.price:{...CardProductStyle.price,textDecorationLine:'line-through'}}>USD {price}</Text>
                        <Text style={{...CardProductStyle.price, marginLeft:10}}>{discountValue()?`USD ${discountValue().price}`:''}</Text>
                    </View>
                  
                </View>
            </View>
            <ToCarButton product={discountValue()?discountValue().product:product}/>
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
