import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Icon } from 'react-native-gradient-icon';
import {useAuth} from '../../context/authContext'
import ButtonNav from '../Reutilizables/ButtonNav'
const {width, height} = Dimensions.get('window');
const iconSize= 100;

export default function MenuProductos({navigation}){
    console.log("------------------------")
    console.log("MenuProductos")
    console.log("------------------------")
    const {userPermissions} = useAuth() 
    return(
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>navigation.navigate("Productos")}
                iconSelect={"magnify-expand"}
                buttonSize={100}
                buttonName={"Buscar Producto"}/>
            </View>
            
            {userPermissions.modifyProducts?<View style={styles.buttonContainer}>
                <ButtonNav 
                    functionNav={()=>navigation.navigate("Categorias")}
                    iconSelect={"shape"}
                    buttonSize={100}
                    buttonName={"Categorias"}/>
            </View>:<View style={styles.buttonContainer}></View>}
            {userPermissions.modifyProducts?<View style={styles.buttonContainer}>
                <ButtonNav 
                    functionNav={()=>navigation.navigate("AgregarUno")}
                    iconSelect={"plus-box"}
                    buttonSize={100}
                    buttonName={"Agregar Producto"}/>
            </View>:<View style={styles.buttonContainer}></View>}
            <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.buttom} onPress={()=>console.log("varios")}>
                <Icon  
                    size={iconSize}
                    colors={[
                        {color:"#206593",offset:"0",opacity:"1"},
                        {color:"#25EADE",offset:"1",opacity:"1"},
                    ]}
                    name="plus-box-multiple" type="material-community" />  
                    <Text style={styles.text}>Agregar Productos</Text>
            </TouchableOpacity> */}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        marginTop:-35,
        width:width,
        flex:1,  
        flexWrap:'wrap',
    },
    buttom:{
        width: width/4,
        height: height/6,
    },
    buttonContainer:{
        width: width/2,
        height: height/3,
        alignItems:"center",
        justifyContent: "center",
    },   
    text:{
        width:"100%",
        textAlign: "center",
    },
})