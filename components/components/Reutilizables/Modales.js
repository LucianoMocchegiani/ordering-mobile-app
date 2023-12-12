import React from "react";
import { Dimensions,StyleSheet, Text, View, TouchableOpacity } from 'react-native';
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////

const {width, height} = Dimensions.get('window');


export default function ModalConfirmation({functionCheckOk,setStateModal,mensaje="Cancelar y Salir?"}){
    function checkOk(){
      functionCheckOk()
      setStateModal(false)
    }
    function exit(){
        setStateModal(false)
    }
    return (
      <View style={styles.modalContainer}>
      <LinearGradient 
        colors={colorA}
        start={{x:1,y:0}}
        end={{x:0,y:1}}
        style={styles.modal}>
        <Text style={{...styles.textTitle,marginTop:30}}>{mensaje}</Text>
        <View style={styles.modalButtonsContainers}>
          <TouchableOpacity onPress={()=>checkOk()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
          <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
        </View> 
      </LinearGradient>
      </View>
    )
}

const styles = StyleSheet.create({
    modal:{
      zIndex: 10,
      marginTop: "60%",
      position: "absolute",
      width: '90%',
      marginLeft: '5%',
      height: "30%",
      backgroundColor: 'black',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 0,
      elevation: 10,
      flexDirection: 'column',
    },
    modalButtonsContainers:{
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    modalContainer:{
      marginTop:25,
      zIndex: 10,
      width: width,
      height: height,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textTitle : {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',            
    } ,
  })