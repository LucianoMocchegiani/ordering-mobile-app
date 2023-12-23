import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Dimensions, ScrollView, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '../reutilizables/Loading';
import ButtonHeader from '../reutilizables/ButtonHeader'
import ProductForm from './ProductForm'
import { deleteProduct, putProduct, uploadImageFirebase  } from '../../../firebase/endpoints/products';
import { getProducts } from '../../../firebase/endpoints/products';
import { useStorage } from '../../../context/storageContext';
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

export default function ProducDetail({navigation, route}){
    const {
        setProductsData, 
        categoriesData,
        discountCodesData,
    } = useStorage()
    const { category_id, name, description, discount_codes, dolar_price, image, stock, type, updated_date, created_date, id  } = route.params?.product
    const [product, setProduct] = useState({
        category_id : category_id,
        name : name,
        description : description,
        discount_codes : discount_codes,
        dolar_price : dolar_price,
        image : image,
        stock : stock,
        type : type,
        updated_date : updated_date,
        created_date : created_date,
    })
    
    const[loading, setLoading]=useState(false)
    const [formErrors, setFormErrors]= useState(false)

    const saveChanges= async (id, data)=>{
        if(Object.keys(validate(product)).length){
            return setFormErrors(true)
        }else{
            await putProduct(setLoading, id, data)
            getProducts(setLoading,setProductsData,'generic')
        }
    }
    const deleteProductHandle= async (id)=>{
        const asistandDelete= async ()=>{
            try{
                await deleteProduct(setLoading, id)
                navigation.navigate('Tienda')
                getProducts(setLoading,setProductsData,'generic')
            }catch(error){
                console.log(error)

            }
        }
        Alert.alert('Estas seguro?', 'Quieres eliminar este producto?',[
            {
                text: 'Eliminar',
                onPress: async () => asistandDelete(),
            },
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancelar'),
                style: 'cancel',
            },
        ],)
    }

    return (
       
        <View style={styles.container}>
            <Header/>{loading? <Loading/>:<>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10,}}>
                <ButtonHeader functionOnPress={()=>{deleteProductHandle(id)}} buttonName={'Eliminar'}/>
                <ButtonHeader functionOnPress={()=>{saveChanges(id, product)}} buttonName={'Guardar cambios'}/>
            </View>
            <ScrollView>
            <ProductForm formErrors={formErrors} product={product} setProduct={setProduct} categories={categoriesData} discountCodes={discountCodesData}/>
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


