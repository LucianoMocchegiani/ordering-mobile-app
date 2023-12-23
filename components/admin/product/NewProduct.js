import { StatusBar } from 'react-native';
import React, { useState } from "react";
import {View, Text, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../reutilizables/Loading';
import ButtonHeader from '../reutilizables/ButtonHeader'
import NewProductForm from './NewProductForm'
import { postProduct } from '../../../firebase/endpoints/products';
import { getProducts } from '../../../firebase/endpoints/products';
import { useStorage } from '../../../context/storageContext';
import { useEffect } from 'react';
import validate from './validateForm';

const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');



function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={'package-variant-closed'} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Detalle del producto</Text>
        </View>
    )
}

export default function NewProduct({navigation}){
    const {
        setProductsData, 
        categoriesData,
        discountCodesData,
        loading,
        setLoading,
    } = useStorage()
    const [formErrors, setFormErrors]= useState(false)
    const [product, setProduct] = useState({
        category_id : '',
        name : '',
        description : '',
        discount_codes : [],
        dolar_price : 0,
        image :[],
        stock : 0,
        type : '',
    })
    useEffect(()=>{
        console.log(product)
    },[product])
    const createProduct= async (data)=>{
        if(Object.keys(validate(product)).length){
            return setFormErrors(true)
        }else{
            console.log('sss')
            const responce= await postProduct(setLoading,data)
            if(responce){
                getProducts(setLoading,setProductsData,'generic')
                navigation.navigate('Tienda')
            }
        }
    }
    
    return (
       
        <View style={styles.container}>
            <Header/>{loading? <Loading/>:<>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10,}}>
                <ButtonHeader functionOnPress={()=>{createProduct(product)}} buttonName={'Registrar producto'}/>
            </View>
            <ScrollView>
            <NewProductForm product={product} setProduct={setProduct} categories={categoriesData} discountCodes={discountCodesData} formErrors={formErrors}/>
            </ScrollView></>}
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


