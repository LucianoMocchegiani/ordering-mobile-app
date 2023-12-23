import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Dimensions, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AlgoliaSearch from './AlgoliaSearch'
import RenderProducts from './RenderProducts';
import { getProducts, getProductsOnScroll} from '../../../firebase/endpoints/products';
import { getCategories } from '../../../firebase/endpoints/categories';
import { getDiscountCodes } from '../../../firebase/endpoints/discountCodes';
import SelectComponent from '../reutilizables/Select'
import Loading from '../reutilizables/Loading';
import ButtonHeader from '../reutilizables/ButtonHeader'
import { useStorage } from '../../../context/storageContext';

const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={"storefront"} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Tienda </Text>
            <Text style={{marginLeft:5}}>{'( Admin )'} </Text>
        </View>
    )
}

export default function Tienda({navigation}){
    const {
        productsData, 
        setProductsData, 
        categoriesData,
        setCategoriesData, 
        discountCodesData,
        setDiscountCodesData

    } = useStorage()

    const [categorySelect,setCategorySelect]= useState({name:'Ninguna', id :'Ninguna'})
    const [codeSelect,setCodeSelect]= useState({id:'Ninguno', discount:0})
    const [loading, setLoading]= useState(false)
    
    const unsubscribe = navigation.addListener('beforeRemove', e => {
        if(navigation.getState().index==0){
          BackHandler.exitApp()
          e.preventDefault();
        }
        // unsubscribe anula la navegacion volver
    });
    let getOnScroll = async ()=> {getProductsOnScroll(setLoading,setProductsData,'generic')}
    useEffect(() => {
        getCategories(setCategoriesData)
        getDiscountCodes(setDiscountCodesData)
        unsubscribe()
    },[])
    useEffect(()=>{
        if (codeSelect.id != 'Ninguno' && categorySelect.id != 'Ninguna'){
            getProducts(setLoading,setProductsData,'whereArrayWhere',categorySelect.id,codeSelect.id )
            getOnScroll = async ()=> {getProductsOnScroll(setLoading,setProductsData,'whereArrayWhere',categorySelect.id,codeSelect.id )}
        }else if (codeSelect.id != 'Ninguno' && categorySelect.id == 'Ninguna'){
            getProducts(setLoading,setProductsData,'whereArray',codeSelect.id )
            getOnScroll = async ()=> {getProductsOnScroll(setLoading,setProductsData,'whereArray',codeSelect.id )}
        }else if (codeSelect.id == 'Ninguno' && categorySelect.id != 'Ninguna'){
            getProducts(setLoading,setProductsData,'where',categorySelect.id)
            getOnScroll = async ()=> {getProductsOnScroll(setLoading,setProductsData,'where',categorySelect.id)}
        }else{
            getProducts(setLoading,setProductsData,'generic')
            getOnScroll = async ()=> getProductsOnScroll(setLoading,setProductsData,'generic')
        }
         
    },[categorySelect, codeSelect])
    return (
        <View style={styles.container}>
            <Header/>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10,}}>
                <View><AlgoliaSearch
                    setRender={setProductsData}
                    placeholder= {'Buscar producto...'}
                    setLoading={setLoading}
                    getSearch={()=>getProducts(setLoading,setProductsData,'generic')}
                /></View>
                <ButtonHeader functionOnPress={()=>navigation.navigate('newProduct')} buttonName={'Nuevo producto'}/>
            </View>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10,}}>
                <ButtonHeader functionOnPress={()=>navigation.navigate('codesScreen')} buttonName={'Codigos'}/>
                <SelectComponent
                    text={'codigo'}
                    text2={''}
                    objValue={'id'}
                    arraySelects={[...discountCodesData,{id:'Ninguno',discount:0}]}
                    selectFunction={setCodeSelect}
                />            
            </View>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10,}}>
                <ButtonHeader functionOnPress={()=>navigation.navigate('categoryScreen')}  buttonName={'Categorias'}/>
                <SelectComponent
                    text={'categoria'}
                    text2={''}
                    arraySelects={[...categoriesData,{id:'Ninguna',name:'Ninguna'}
                    ]}
                    selectFunction={setCategorySelect}
                />             
            </View>
            <View>
                {loading?<Loading/>:
                <RenderProducts 
                    data={productsData} 
                    categories={categoriesData}
                    navigation = {navigation}
                    discount = {codeSelect.discount}
                    discountCodes={discountCodesData}
                    onScrollFunction={getOnScroll}/>}
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