import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Dimensions, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useStorage } from '../../context/storageContext';
import Loading from '../customer/reutilizables/Loading'
const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

function validate(input) {
    let errors = {};
    if (!input.dni){
        errors.dni = '*Ingresa un dni'
    }else if(isNaN(Number(input.dni))){
        errors.dni = '*El dni debe incluir solo numeros'
    }else if (input.dni.length < 7 || input.dni.length > 9 ){
        errors.password = '*DNI escrito incorrectamente'
    }
    if (!input.discountCode){
      errors.discountCode = '*Codigo incorrecto'
    } 
    return errors;
};

function Header(){
    return(
        <View style={styles.containerHeader}>
            <Text style={{textTransform:"uppercase", color:'#5c7ae3', fontSize:40}}>Ingresar</Text>
        </View>
    )
}

export default function Login({navigation}){
    const {dni, setDni, discountCode, loading, getDiscountCodeStore}= useStorage()
    const [formErrors, setFormErrors] = useState(false)

    const [componentState , setComponentState] = useState({
        dni:'',
        discountCode:''
    })

    async function login (){
        if(Object.keys(validate(componentState)).length){
            return setFormErrors(true)
        }else{
            const responce = await getDiscountCodeStore(componentState.discountCode)
            if(responce.error){
                Alert.alert('Error', responce.error)
            }else{
                setDni(componentState.dni)
            }
            
        }
    }
    const handleChange = (e, atribute) => {       
        setComponentState({
            ...componentState,
            [atribute]:e
        })
    }
   
    useEffect(()=>{
        if(dni && discountCode){
            navigation.navigate('navBar')
        }
    },[dni, discountCode])

    return (
        <View style={styles.container}>
            <Header/>
            {loading?<Loading/>:<>
            <TextInput
                style={styles.textInput}
                onChangeText={(e) => handleChange(e,'dni')}
                placeholder={'Ingrese DNI...'}
            />
            <Text style={styles.error}>{validate(componentState).dni&&formErrors?validate(componentState).dni:''}</Text>
             <TextInput
                style={styles.textInput}
                onChangeText={(e) => handleChange(e,'discountCode')}
                placeholder={'Ingrese codigo...'}
            />
            <Text style={styles.error}>{validate(componentState).discountCode&&formErrors?validate(componentState).discountCode:''}</Text>
            <TouchableOpacity  
                onPress={() => login()}
                style={styles.button}
            >
                <Text style={styles.text}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>navigation.navigate('loginAccount')}
            >
            <Text style={styles.textGray}>Ingresar con cuenta.</Text></TouchableOpacity></>}
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
        alignItems:'flex-start',
        justifyContent:'flex-end',
        height:height*0.2,
        width:width*0.8,
        paddingBottom:height*0.02
    },
    textInput: {
        width:width*0.8,
        height:height*0.06,
        borderColor:"black",
        borderWidth:1.5,
        paddingHorizontal:10,
    },
    button:{
        width:width*0.8,
        height:height*0.06,
        backgroundColor:"#5c7ae3",
        borderColor:"#5c7ae3",
        borderWidth:1.5,
        borderRadius:8,
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        textTransform: "uppercase",
        fontSize:14,
    },
    textGray:{
        marginTop:10,
        color: "gray",
        fontWeight: "bold",
        textAlign: "center",
        fontSize:14,
    },
    error:{
        height:height*0.03 ,
        color: "red",
        textAlign: "center",
        textTransform: "uppercase",
        fontSize:14,
    }
});






