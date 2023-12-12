import { StatusBar } from 'react-native';
import React, { useState, useEffect} from "react";
import {View, Text, StyleSheet, Dimensions, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useStorage } from '../../context/storageContext';
const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

function Header(){
    return(
        <View style={styles.containerHeader}>
            <Text style={{textTransform:"uppercase", color:'#5c7ae3', fontSize:40}}>Ingresar</Text>
        </View>
    )
}

export default function Login({navigation}){
    const {dni, setDni, discountCode, setDiscountCode, loading, setLoading}= useStorage()

    const [discountCodeLocal, setDiscountCodeLocal] = useState(null)
    const [dniLocal, setDniLocal] = useState(null)
    
    function login(){
        if(!discountCodeLocal||!dniLocal){
            Alert.alert('Error','Debe completar los campos')
        }else{
            setDiscountCode(discountCodeLocal)
            setDni(dniLocal)
        }
    }
   
    useEffect(()=>{
        if(dni){
            navigation.navigate('navBar')
        }
    },[dni])

    return (
        
        <View style={styles.container}>
            <Header/>
            <TextInput
                style={styles.textInput}
                onChangeText={(e) => setDniLocal(e)}
                placeholder={'Ingrese DNI...'}
            />
             <TextInput
                style={styles.textInput}
                onChangeText={(e) => setDiscountCodeLocal(e)}
                placeholder={'Ingrese codigo...'}
            />
            <TouchableOpacity  
                onPress={() => login()}
                style={styles.button}
            >
                <Text style={styles.text}>Ingresar</Text>
            </TouchableOpacity>

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
        marginBottom:height*0.02,
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
});






