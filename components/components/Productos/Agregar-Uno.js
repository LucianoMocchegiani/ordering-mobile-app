import React, {useState } from "react";
import { Dimensions,TextInput, Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
////////////////////////////////////////////////////
import {useAuth} from '../../context/authContext'
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import {postFirestore} from '../../functions/apiFunctions'
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';

import BarCode from '../BarCode/BarCode'
import BarCodeIcon from '../BarCode/BarCodeIcon'
import ButtonNav from '../Reutilizables/ButtonNav'
const {width, height} = Dimensions.get('window');
////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////
function ModalSalir({navigation,stateModal}){
  function checkOk(){
    stateModal(false)
    navigation.navigate("MenuProductos")
  }
  function exit(){
    stateModal(false)
  }
  return (
    <View style={styles.modalContainer}>
    <LinearGradient 
      colors={colorA}
      start={{x:1,y:0}}
      end={{x:0,y:1}}
      style={styles.modal}>
      <Text style={{...styles.textTitle,marginTop:30}}>Desea cancelar y salir?</Text>
      <View style={styles.modalButtonsContainers}>
        <TouchableOpacity onPress={()=>checkOk()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
        <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
      </View> 
    </LinearGradient>
    </View>
  )
}

function Modal({dato, state, setState, stateModal}){
  const [editado, setEditado]=useState(state[dato])
  function modalHandler(e){
    setEditado(e)
  }
  function checkOk(){
    setState({
      ...state,
      [dato]:editado
    })
    stateModal(false)
  }
  function exit(){
    stateModal(false)
  }
  return (
    <View style={styles.modalContainer}>
    <LinearGradient 
      colors={colorA}
      start={{x:1,y:0}}
      end={{x:0,y:1}}
      style={styles.modal}>
      <TextInput
            style={styles.textInput}
            onChangeText={(e) => modalHandler(e)}
            value={editado?.toString()}
          />
      <View style={styles.modalButtonsContainers}>
        <TouchableOpacity onPress={()=>checkOk()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
        <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
      </View> 
    </LinearGradient>
    </View>
  )
}

function Editar({dato, setState, stateModal }){
  const edit = ()=>{
    setState(dato)
    console.log("edit "+ dato)
    stateModal(true)
  }
  return (
    <TouchableOpacity
      onPress={()=> edit()}>
      <Icons name="border-color" size={25} color="black" />
    </TouchableOpacity>
  )
}

export default function AgregarUno({navigation}) {
  console.log("------------------------")
  console.log("AgregarUno")
  const {userProfile}= useAuth()
  /////////////////////////////////////////////////
  const[editable,setEditable]= useState({
    name: "",
    price: "",
    stock : "",
    category: "",
    make: "",
    buyprice: "",
    barCode : "",
    description: "",
    image : "",
  })
  /////////////////////////////////////////////////
  const[modal,setModal]= useState(false)
  const[dato,setDato]= useState(false)
  const[modalSalir,setModalSalir]= useState(false)
  const [scannOn,setScannOn]=useState(false)
  const salir = () => {
    console.log("salir")
    setModalSalir(true)
  }
  /////////////////////////////////////////////////
   const postProducts = (data)=>{
    const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/products")
    postFirestore(selectedCollection,data)
  }
  /////////////////////////////////////////////////
  const agregar = () => {
    if(!editable.name){
      Alert.alert("Complete los campos")
    }else{
      postProducts(editable)
      Alert.alert("Producto agregado")
      navigation.navigate("MenuProductos")
    }
    
  }
  /////////////////////////////////////////////////
  const copyCode = (code) => {
    setEditable({
      ...editable,
      barCode:code
    })
  }
  /////////////////////////////////////////////////
  console.log("------------------------")
  return (
    <LinearGradient 
      colors={colorBackgroundModal}
      start={{x:1,y:0}}
      end={{x:0,y:1}}
      style={{width:width,height:height}}>
      {scannOn&&<BarCode codeFunction={copyCode}setActive={setScannOn}/>}
      <View style={styles.container}>
        {modal&&<Modal dato={dato} state={editable} setState={setEditable} stateModal={setModal}/>}
        {modalSalir&&<ModalSalir navigation={navigation}stateModal={setModalSalir}/>}
        <View style={{...styles.cotainerTitle}}>
          <Text style = {styles. textTitle}>Agregar Producto</Text>
        </View> 

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}>       
          <Text style = {styles.text}> Nombre del producto: {editable.name} </Text>
          <Editar dato={"name"} setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}>    
          <Text style = {styles.text}> Precio: {editable.price}</Text>
          <Editar dato={"price"} setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}>    
          <Text style = {styles.text}> Stock: {editable.stock}</Text>
          <Editar dato={"stock"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Categoria: {editable.category}</Text>
          <Editar dato={"category"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Marca: {editable.make} </Text>
          <Editar dato={"make"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Precio de compra: {editable.buyprice} </Text>
          <Editar dato={"buyprice"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {{...styles.text,width:width*0.7}}> Codigo: {editable.barCode} </Text>
          <TouchableOpacity onPress={()=>{setScannOn(true)}}><BarCodeIcon size={30}/></TouchableOpacity>
          <Editar dato={"barCode"}setState={setDato} stateModal={setModal}/> 
        </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Descripcion: {editable.description} </Text>
          <Editar dato={"description"}setState={setDato} stateModal={setModal}/>
          </LinearGradient>

        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.cotainerIcon}> 
          <Text style = {styles.text}> Imagen: {editable.image} </Text>
          <Editar dato={"imagen"}setState={setDato} stateModal={setModal}/>
        </LinearGradient>
          <View style = {styles.containerNavBar}>   
            <ButtonNav 
                functionNav={()=>salir()}
                iconSelect={"delete-forever"}
                buttonSize={30}
                buttonName={"Salir"}/>
            <ButtonNav 
                functionNav={()=>navigation.navigate("MenuPrincipal")}
                iconSelect={"home"}
                buttonSize={30}
                buttonName={"Home"}/>
            <ButtonNav 
                functionNav={()=>agregar()}
                iconSelect={"content-save"}
                buttonSize={30}
                buttonName={"Agregar"}/>
          </View>
      </View>
    </LinearGradient>
           
)
}

const styles = StyleSheet.create({
  container:{
    marginTop:-35,
    flex:1,
    alignItems:"center",
    width:width, height:height,
  },
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
  modalButtonsContainers:{
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
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
  modalContainer:{
    marginTop:25,
    zIndex: 10,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cotainerIcon: {
    width: width*0.9,
    backgroundColor: '#fff',
    flexWrap:"wrap",
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding:5,
    margin:10
  },
  cotainerTitle: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding:5,
    marginTop: 40,
  },
  textTitle : {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',            
  } ,
  text : {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',  
    width:"90%"          
  } ,
   textInput:{
    padding: 10,
    paddingStart:30,
    width:width*0.5,
    height:50,
    marginTop:20,
    borderBottomWidth:2,
    borderBottomColor:"#2C7DA0",
  },
})
