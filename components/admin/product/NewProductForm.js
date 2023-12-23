import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect} from "react";
import {View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text, Image} from 'react-native';
import DataFormContainer from '../reutilizables/DataFormContainer';
import SelectComponent from '../reutilizables/SelectStyle'
import ApliedCodes from './ApliedCodes'
import Permissions from 'expo-permissions'
import ImagePicker from 'expo-image-picker'
import validate from './validateForm';

const {width, height} = Dimensions.get('window');

export default function ProductForm({product, setProduct, categories, discountCodes, formErrors}){
    const { category_id, name, description, discount_codes , dolar_price, image, stock, type, updated_date, created_date } = product
    const [validateData, setValidateData] = useState(false)
    function setCategoryState(obj){
        setProduct({
            ...product,
            category_id:obj.id
        })

    }
    function setDiscountCodeState(str){
        if(discount_codes&& discount_codes.length&&discount_codes.includes(str)){
            setProduct({
                ...product,
                discount_codes:[...discount_codes.filter((e)=> e!= str)]
            })
        }else{
            setProduct({
                ...product,
                discount_codes:[...discount_codes, str]
            })
        }
    }
    const handleChange = (e, atributo) => {       
        setProduct({
            ...product,
            [atributo]:e
        })
    }
    const dataTransform =()=>{
        const result = discountCodes.map(e=>{return e.id})
        return result
    }
    const dataCategoryTransform =()=>{
        if (category_id){
            const result = categories.filter(e=> e.id == category_id)
            return result[0].name
        }
        return ''
    }
    const handleChangeStock = (e) => {     
        if(isNaN(Number(e))||e ===''){
           return
        } else{
            setProduct({
                ...product,
                stock:e
            })
        }
       
    }

    const handleAddStock = (e) => {       
        setProduct({
            ...product,
            stock:Number(stock)+1
        })
    }
    const handleMinusStock = (e) => {     
        if(stock<1){
            return
        }else{
            setProduct({
                ...product,
                stock:Number(stock)-1
            })
        }
    }
    const  loadImageFromGalery = async ()=>{
        const response = {status:false, image:null}
        const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)
        if(resultPermissions.status === 'denied'){
            Alert.alert('Aviso','Debes permitir el acceso para subir imagenes.')
            return response
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect:array
        })
        if(result.canceled){
            return response
        }
        response.status =true
        response.image =result.url
        return response
    }
    const uploadImage = async (e)=>{
        const response = await loadImageFromGalery([4,4])
        if(!response.status){
            Alert.alert('Error','No has selecionado ninguna imagen.')
        }
        console.log(response.image)
        setProduct({
            ...product,
           image: response.image
        })

    }
    return (
        <View style={styles.container}>
            <View style={styles.dataForm}>
                <DataFormContainer data={'Nombre'}/>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(e) => handleChange(e, 'name')}
                    placeholder={'Ingrese nombre...'}
                    value={name}
                />
                 
            </View>       
            <Text style={styles.error}>{validate(product).name&&formErrors?validate(product).name:''}</Text>
            <View style={styles.dataForm}>
                <DataFormContainer data={'Precio USD'}/>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(e) => handleChange(e, 'dolar_price')}
                    placeholder={'Ingrese precio...'}
                    value={dolar_price.toString()}
                />
                 
            </View>    
            <Text style={styles.error}>{validate(product).dolar_price&&formErrors?validate(product).dolar_price:''}</Text>
            <View style={styles.dataForm}>
                <DataFormContainer data={'Tipo'}/>
                <TextInput
                    style={styles.textInput}
                    onChangeText={(e) => handleChange(e, 'type')}
                    placeholder={'Ingrese precio...'}
                    value={type}
                />
                
            </View> 
            <Text style={styles.error}>{validate(product).type&&formErrors?validate(product).type:''}</Text>
            <View style={styles.dataForm}>
                <DataFormContainer data={'Categoria'}/>
                <SelectComponent
                    text={category_id}
                    text2={''}
                    arraySelects={categories}
                    selectFunction={setCategoryState}
                    selectState={dataCategoryTransform()}
                />

            </View>    
            <Text style={styles.error}>{''}</Text>
            <View style={styles.dataForm}>
                <DataFormContainer data={'Codigos Aplicados'}/>
                <ApliedCodes
                    text={''}
                    text2={''}
                    arraySelects={dataTransform()}
                    arrayActive={discount_codes}
                    selectFunction={setDiscountCodeState}
                />
            </View>  
            <Text style={styles.error}>{''}</Text>
            <View style={{...styles.dataForm, flexDirection:'column',justifyContent: "center", alignItems:'center'}}>
                <DataFormContainer data={'Descripcion'} large={true}/>
                <TextInput
                    style={{...styles.textInput, width:width*0.9,height:height*0.2,marginTop:5}}
                    onChangeText={(e) => handleChange(e, 'description')}
                    placeholder={'Ingrese descripcion...'}
                    value={description}
                    multiline={true}
                    numberOfLines={8}
                />
                 
            </View>    
            <Text style={styles.error}>{validate(product).description&&formErrors?validate(product).description:''}</Text>
            < View style={styles.dataForm}>
                <View style={{width:width*0.45, flexDirection:'column', justifyContent: "center", alignItems:'center'}}>
                    <DataFormContainer data={'Imagen'}/>
                    {/* <TouchableOpacity
                        onPress={()=> uploadImage()}>
                    <View style={styles.imageContainer}>
                        {image? <Image source={{uri: image}}/>:
                        <Icon name={'upload'} size={150} color="#5c7ae3" />}
                    </View>
                    </TouchableOpacity> */}
                </View> 
             
                <View style={{width:width*0.45}}>
                    <DataFormContainer data={'Stock'}/>
                    <View style={styles.plusMinus}>
                        <TouchableOpacity
                            onPress={(e) => handleAddStock(e)}
                        >
                            <Icon name={'plus-circle-outline'} size={30} color="#867f7f" />
                        </TouchableOpacity>
                        <TextInput
                           style={styles.textInputStock}
                           onChangeText={(e) => handleChangeStock(e)}
                           placeholder={'0'}
                           value={stock.toString()}
                        />
                        <TouchableOpacity
                            onPress={(e) => handleMinusStock(e)}
                        >
                            <Icon name={'minus-circle-outline'} size={30} color="#867f7f" />
                        </TouchableOpacity>
                    </View>
                </View>
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
    textInputStock:{
        width:width*0.10,
        height:height*0.05,
        backgroundColor:"#fff",
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:"#fff",
        borderWidth:1.5,
    },
    text:{
       color: "black",
       fontWeight: "bold",
       textAlign: "center",
       textTransform: "uppercase",
       fontSize:12,
    },
    plusMinus:{
        paddingVertical:30,
        flexDirection:'row',
        width:width*0.45,
        alignItems:'center',
        justifyContent:'space-around',
        borderColor:"gray",
        borderWidth:1.5,
        marginTop:5,
        
    },
    imageContainer:{
        width:width*0.45,
        borderColor:"gray",
        borderWidth:1.5,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
    },
    error:{
        height:height*0.023 ,
        color: "red",
        textAlign: "center",
        textTransform: "uppercase",
        fontSize:12,
    }
});
