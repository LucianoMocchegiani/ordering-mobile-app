import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Dimensions, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AlgoliaSearch from './AlgoliaSearch'
import RenderProducts from './RenderProducts';
import { getProducts, getProductsOnScroll } from '../../../firebase/endpoints/products';
import { getCategories } from '../../../firebase/endpoints/categories';
import SelectComponent from '../reutilizables/Select'
import Loading from '../reutilizables/Loading';

const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={"storefront"} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Tienda</Text>
        </View>
    )
}

export default function Tienda({navigation}){
    const [productsData, setProductsData] = useState([])
    const [categoriesData,setCategoriesData]= useState([])
    const [categorySelect,setCategorySelect]= useState({name:'Ninguna'})
    const [loading, setLoading]= useState(false)
    
    const unsubscribe = navigation.addListener('beforeRemove', e => {
        if(navigation.getState().index==0){
          BackHandler.exitApp()
          e.preventDefault();
        }
        // unsubscribe anula la navegacion volver
    });
    useEffect(() => {
        getCategories(setCategoriesData)
        unsubscribe()
    },[navigation])
    let getOnScroll = async ()=> {getProductsOnScroll(setLoading,setProductsData,'generic')}
    useEffect(()=>{
        if(categorySelect.name != 'Ninguna'){
            getProducts(setLoading,setProductsData,'where',categorySelect.id)
            getOnScroll = async ()=> {getProductsOnScroll(setLoading,setProductsData,'where',categorySelect.id)}
        }else{
            getProducts(setLoading,setProductsData,'generic')
            getOnScroll = async ()=> getProductsOnScroll(setLoading,setProductsData,'generic')
        }
    },[categorySelect])
    return (
        <View style={styles.container}>
            <Header/>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10,}}>
                <AlgoliaSearch
                    setRender={setProductsData}
                    placeholder= {'Buscar producto...'}
                    setLoading={setLoading}
                />
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
                    onScrollFunction={getOnScroll}/>}
            </View>
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