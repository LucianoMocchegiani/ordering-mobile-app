////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
import {ActivityIndicator, Dimensions, FlatList, Alert, StyleSheet,TextInput,TouchableOpacity,View,Text,} from "react-native";
////////////////////////////////////////////////////
import {useAuth} from '../../context/authContext'
import {getFirestore, doc} from 'firebase/firestore';
import {deleteFirestore} from '../../functions/apiFunctions'
////////////////////////////////////////////////////
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window');
////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////
const CompraResumen = ({route,navigation})=>{
  const {userProfile} = useAuth()
  /////////////////////////////////////////////////////////
  const {id,resumen,fecha,total,provider,idProvider,wayToPay}=route.params
  const data = resumen
  /////////////////////////////////////////////////////////

  const deleteSale = ()=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/shopping", id)
    deleteFirestore(selected)
    // putproduct stoock
  }

  /////////////////////////////////////////////////////////
  const anular = () => {
    deleteSale()
    Alert.alert("Compra Anulada");
    navigation.navigate("MenuPrincipal")
  }
    return (
        
          <LinearGradient 
              colors={colorBackgroundModal}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={{width:width,height:height}}>
            <View style={styles.container}>
                <LinearGradient 
                            colors={colorA}
                            start={{x:1,y:0}}
                            end={{x:0,y:1}} 
                            style={styles.lista}>
                    <Text style={styles.text}>Nro de venta: {id}</Text>
                    <Text style={styles.text}>Fecha: {fecha} </Text>
                    <Text style={styles.text}>Provedor: {provider?provider:"ninguno"}</Text>
                    <Text style={styles.text}>Nro de Provedor: {idProvider?idProvider:"ninguno"}</Text>
                    <Text style={styles.text}>Forma de Pago: {wayToPay?wayToPay:"ninguna"} </Text>
                </LinearGradient >
                
                
                <View style={{alignItems:"center", width:width, height:height*0.7}}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                          <LinearGradient 
                            colors={colorA}
                            start={{x:1,y:0}}
                            end={{x:0,y:1}} 
                            style={styles.lista2}>
                                    <Text style={styles.text}>{item.name}</Text>
                                    <Text style={styles.text}>{item.price}</Text>
                                    <Text style={styles.text}>Cantidad: {item.amount}</Text>
                                    <Text style={styles.text}>{item.price*item.amount}</Text>
                          </LinearGradient >            
                        );
                    }}
                />
                <LinearGradient 
                    colors={colorA}
                    start={{x:1,y:0}}
                    end={{x:0,y:1}} style={{width:width*0.5, height:height*0.04,flexDirection: "row",justifyContent:"space-around",}}>
                  <Text style={styles.textTotal}>Total:     {total}</Text>
                </LinearGradient>
            
            </View>
                   {/* NavBar() -------------------------------------------*/}
                   <View style = {styles.containerNavBar}>   
                        <TouchableOpacity style={styles.buttom} onPress={() => anular()}>
                                <Icon  
                                    size={iconSize}
                                    colors={[
                                        {color:iconColorA,offset:"0",opacity:"1"},
                                        {color:iconColorB,offset:"1",opacity:"1"},
                                    ]}
                                    name="delete-forever" type="material-community" />  
                                    <Text style={styles.textNavBar}>Anular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttom} onPress={() => navigation.navigate("MenuPrincipal")}>
                                <Icon  
                                    size={iconSize}
                                    colors={[
                                        {color:iconColorA,offset:"0",opacity:"1"},
                                        {color:iconColorB,offset:"1",opacity:"1"},
                                    ]}
                                    name="home" type="material-community" />  
                                    <Text style={styles.textNavBar}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttom} onPress={() => console.log("comprobante")}>
                                <Icon  
                                    size={iconSize}
                                    colors={[
                                        {color:iconColorA,offset:"0",opacity:"1"},
                                        {color:iconColorB,offset:"1",opacity:"1"},
                                    ]}
                                    name="content-save" type="material-community" />  
                                    <Text style={styles.textNavBar} >Resumen</Text>
                        </TouchableOpacity>
                </View> 
            </View>  
            </LinearGradient>
        
    );
};
  

  const styles = StyleSheet.create({
    container:{
      marginTop:-35,
      flex:1,
      alignItems: "center",
    },
    
    lista: {
      width:width*0.9,
      marginTop:30,
      marginBottom: 20,
      height:height*0.15,
      backgroundColor: "#F8E9E9",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
      lista2: {
      flex: 1,
      width: width*0.9,
      marginBottom: 5,
      padding: 10,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'space-between',
    },
    text: { color: "black"},
    textTotal:{
      color: "black",
      fontSize: 18,
    },

  
      /* NavBar() -------------------------------------*/
         textNavBar : {
            textAlign: "center",
            fontSize: 14,
            fontWeight: 'bold',
            color: 'black',               
          } ,
          containerNavBar: {
            position: "absolute",
            bottom: 0,
            width: '100%',
            height: 70,
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          },
    
  
})

  
  export default CompraResumen;