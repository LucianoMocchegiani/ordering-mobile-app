import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Dimensions, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/authContext';
import Loading from '../customer/reutilizables/Loading'
const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

export function validate(input) {
    let errors = {};
    if (!input.email) {
      errors.email = '*ingresa un email'
    // }else if (emailRegex.test(input.email)){
    //   errors.email = '*formato incorrecto'
    }
    if (!input.password){
      errors.summary = '*ingresa una contraseña'
    }else if (input.password.length < 6){
      errors.password = '*debe contener al menos 6 caracteres'
    }else if (input.password.length > 60){
      errors.password = '*no puede contener mas de 60 caracteres'
    }
    
    return errors;
};

function Header(){
    return(
        <View style={styles.containerHeader}>
            <Text style={{textTransform:"uppercase", color:'#5c7ae3', fontSize:40}}>Ingresar cuenta</Text>
        </View>
    )
}

export default function LoginAcount({navigation}){
    const {login, user, loading, setLoading} = useAuth()
    
    const [componentState, setComponentState] = useState({
      email: "",
      password: "",
    });
    const [formErrors, setFormErrors] = useState(false)
    
    async function handleLogin (){

        if(Object.keys(validate(componentState)).length){
            return setFormErrors(true)
        }else{
            setLoading(true)
            const responce =  await login(componentState.email, componentState.password)
            if(Object.keys(responce)[0]==='error'){
                setFormErrors(responce)
                setLoading(false)
                Alert.alert('Error', responce.error)
            }else if(Object.keys(responce)[0]==='successful'){
                setLoading(false)
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
        if(user){
            navigation.navigate('navBarAdmin')
        }
    },[user])

    return (
        <View style={styles.container}>
            <Header/>
            {loading?<Loading/>:<>
            <TextInput
                style={styles.textInput}
                onChangeText={(e) => handleChange(e,'email')}
                placeholder={'Ingrese email...'}
            />
            <Text style={styles.error}>{validate(componentState).email&&formErrors?validate(componentState).email:''}</Text>
             <TextInput
                style={styles.textInput}
                onChangeText={(e) => handleChange(e,'password')}
                placeholder={'Ingrese contraseña...'}
            />
            <Text style={styles.error}>{validate(componentState).password&&formErrors?validate(componentState).password:''}</Text>
            <TouchableOpacity  
                onPress={() => handleLogin()}
                style={styles.button}
            >
                <Text style={styles.text}>Ingresar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>navigation.navigate('register')}
            >
            <Text style={styles.textGray}>No tengo cuenta.</Text></TouchableOpacity></>}
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






