import React, {useState } from "react";
import { Dimensions,TextInput, Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
////////////////////////////////////////////////////
import {useAuth} from '../../context/authContext'
import {getFirestore, doc} from 'firebase/firestore';
import {putFirestore, deleteFirestore} from '../../functions/apiFunctions'
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonNav from '../Reutilizables/ButtonNav'
import BarCode from '../BarCode/BarCode'
import BarCodeIcon from '../BarCode/BarCodeIcon'


const {width, height} = Dimensions.get('window');
////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////
function ModalSalir({deleteFunction,navigation,stateModal}){
  function checkOk(){
    deleteFunction()
    Alert.alert("Producto Eliminado");
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
      <Text style={{...styles.textTitle,marginTop:30}}>Desea eliminar el producto?</Text>
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
      colors={[ '#F8E9E9','#B9C7CA']}
      start={{x:1,y:0}}
      end={{x:0,y:1}}
      style={styles.modal}>
      <Text style={styles. textTitle} ></Text>
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
  /////////////////////////////////////////////////
  const {userPermissions} = useAuth()
  /////////////////////////////////////////////////
  const edit = ()=>{
    setState(dato)
    stateModal(true)
  }
  return (
    <>
    {userPermissions.modifyProducts?<TouchableOpacity
      onPress={()=> edit()}>
      <Icons name="pencil" size={25} color="black" />
      </TouchableOpacity>:null}
    </>
      
    
  )
}

export default function InformacionProducto({navigation,route}) {
  console.log("------------------------")
  console.log("InformacionProducto")
  const {userProfile,userPermissions} = useAuth()
  const {barCode, buyprice, category, description,id,image, make, name, price, stock} = route.params
  /////////////////////////////////////////////////
  const[editable,setEditable]= useState({
    id:id,
    name: name?name:"",
    price: price?price:"",
    stock : stock?stock:"",
    category: category?category:"",
    make: make?make:"",
    buyprice: buyprice?buyprice:"",
    barCode: barCode?barCode:"",
    image: image?image:"", 
    description: description?description:""
  })

  /////////////////////////////////////////////////
   const putProducts = (data)=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/products", data.id)
    putFirestore(selected,data)
  }
  
  const deleteProducts = ()=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/products", id)
    deleteFirestore(selected)
  }

  /////////////////////////////////////////////////
  const[modal,setModal]= useState(false)
  const[dato,setDato]= useState(false)
  const[modalSalir,setModalSalir]= useState(false)
  const [scannOn,setScannOn]=useState(false)
  const salir = () => {
    navigation.navigate("Productos")
  }
  const eliminar = () => {
    console.log("eliminar")
    setModalSalir(true)
  }
  const guardar = () => {
    putProducts(editable)
    Alert.alert("Producto Actualizado");
    navigation.navigate("MenuProductos")
  }
  const copyCode = (code) => {
    setEditable({
      ...editable,
      barCode:code
    })
  }
  //////////////////////////////////////////////////////////
  //hacer global
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  console.log("------------------------")
  return (
        <LinearGradient 
                colors={[ '#F1F4F4','#DADEDF']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={{width:width,height:height}}>
       {scannOn&&<BarCode codeFunction={copyCode}setActive={setScannOn}/>}
       <View style={styles.container}>
         {modal&&<Modal dato={dato} state={editable} setState={setEditable} stateModal={setModal}/>}
         {modalSalir&&<ModalSalir deleteFunction={deleteProducts} navigation={navigation}stateModal={setModalSalir}/>}
            <View style={{...styles.cotainerTitle}}>
              <Text style = {styles. textTitle}>Informacion del Producto: {id}</Text>
            </View> 

            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}>       
              <Text style = {styles.text}> Nombre del producto: {editable.name} </Text>
              <Editar dato={"name"} setState={setDato} stateModal={setModal}/>
            </LinearGradient>
           
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}>    
              <Text style = {styles.text}> Precio: {editable.price?financial((editable.price)):null}</Text>
              <Editar dato={"price"} setState={setDato} stateModal={setModal}/>
              </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}>    
              <Text style = {styles.text}> Stock: {editable.stock}</Text>
              <Editar dato={"stock"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Categoria: {editable.category}</Text>
              <Editar dato={"category"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
           
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Marca: {editable.make} </Text>
              <Editar dato={"make"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
            
            {userPermissions.modifyProducts?<LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Precio de compra: {editable.buyprice?financial((editable.buyprice)):null} </Text>
              <Editar dato={"buyprice"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>:null}
            
            <LinearGradient 
              colors={colorA}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {{...styles.text,width:width*0.7}}> Codigo: {editable.barCode} </Text>
              {userPermissions.modifyProducts?<TouchableOpacity onPress={()=>{setScannOn(true)}}><BarCodeIcon size={30}/></TouchableOpacity>:null}
              <Editar dato={"barCode"}setState={setDato} stateModal={setModal}/> 
            </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Informacion: {editable.description} </Text>
              <Editar dato={"description"}setState={setDato} stateModal={setModal}/>
              </LinearGradient>
            
            <LinearGradient 
              colors={[ '#F8E9E9','#B9C7CA']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.cotainerIcon}> 
              <Text style = {styles.text}> Imagen: {editable.imagen} </Text>
              <Editar dato={"imagen"}setState={setDato} stateModal={setModal}/>
            </LinearGradient>
            <View style = {styles.containerNavBar}>   
            {userPermissions.modifyProducts?
              <ButtonNav 
                functionNav={()=>eliminar()}
                iconSelect={"delete-forever"}
                buttonSize={30}
                buttonName={"Eliminar"}/>
            :<TouchableOpacity style={styles.buttom}></TouchableOpacity>}
              <ButtonNav 
                functionNav={()=>navigation.navigate("MenuPrincipal")}
                iconSelect={"home"}
                buttonSize={30}
                buttonName={"Home"}/>
            {userPermissions.modifyProducts?
             <ButtonNav 
                functionNav={()=>guardar()}
                iconSelect={"content-save"}
                buttonSize={30}
                buttonName={"Guardar"}/>
            :<TouchableOpacity style={styles.buttom}></TouchableOpacity>}
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
