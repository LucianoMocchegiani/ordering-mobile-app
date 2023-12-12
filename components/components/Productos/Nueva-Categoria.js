////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, Alert, StyleSheet,TextInput,TouchableOpacity,View,Text,} from "react-native";
////////////////////////////////////////////////////
import {useAuth} from '../../context/authContext'
import {getFirestore, collection, getDocs, doc} from 'firebase/firestore';
import {postFirestore, deleteFirestore} from '../../functions/apiFunctions'
////////////////////////////////////////////////////
import ButtonNav from '../Reutilizables/ButtonNav'
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
const Loading =()=>{
  return (
    <View style={[styles.Loading]}>
      <ActivityIndicator size="large" />
    </View>
  )
}

export default function NuevaCategoria({navigation}){
  console.log("------------------------")
  console.log("NuevaCategoria")
  const {userProfile} = useAuth()
  /////////////////////////////////////////////////
  const [categoriesApi,setCategoriesApi]= useState(null)
  const getCategories =  ()=>{
    const selectedC = collection(getFirestore(), "users/"+userProfile+"/categories")
      getDocs(selectedC)
      .then(res => setCategoriesApi(res.docs.map(category=>({id:category.id,...category.data()}))))
  }
 
  useEffect(() => {
      getCategories()
  },[]);
  const [responseApi,setResponseApi]= useState(null)
  useEffect(() => {
    console.log(responseApi)
    if (responseApi==="se elimino el documento"||responseApi=="se agrego el documento"){
      getCategories()
      setCategoria("")
      setResponseApi(null)
      setLoadingOn(false);
    }
},[responseApi]);
  /////////////////////////////////////////////////
  const postCategory = async (data)=>{
    const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/categories")
    postFirestore(selectedCollection,data)
  }
  const deleteCategory = (data)=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/categories", data.id)
    setResponseApi(deleteFirestore(selected))
  }
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  const [categoria, setCategoria] = useState("");
  const [text, setText] = useState("");
  const [loadingOn, setLoadingOn] = useState(false)
  const agregarCategoria = function (e) {
    function namesCategorias(categorias){
      let result=[]
      for(let i=0;i<categorias.length;i++){
       result.push(categorias[i].name)
      }
      return result
    }
    if (e.name == "") {
      Alert.alert("Debes completar los campos");
      return;
    }
    if (namesCategorias(categoriesApi).includes(e.name)) {
      Alert.alert("Esa categoria ya existe!");
      return;
    }  
    setLoadingOn(true);
    postCategory(e)
    setText("")
    Alert.alert("Categoria agregada")
  };
  const eliminarCategoria = async function (e) {
    console.log("eliminar categoria")
    setLoadingOn(true);
    deleteCategory(categoria)
    Alert.alert("Categoria Eliminada");
  };
  console.log("------------------------")
  return (
    <LinearGradient 
    colors={colorBackgroundModal}
    start={{x:1,y:0}}
    end={{x:0,y:1}}
    style={{width:width,height:height}}>
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <View style={styles.categoriasContainer}>
      {!categoriesApi||loadingOn?<Loading/>:
        <FlatList
          data={categoriesApi}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => setCategoria(item)}>
                <LinearGradient 
                    colors={categoria === item?colorB:colorA}
                    start={{x:1,y:0}}
                    end={{x:0,y:1}}
                    style={styles.categorias}>    
                  <Text style={categoria === item? {...styles.text,color:"white"}: styles.text}>{item.name}</Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          }}
        />}
      </View>  
      {categoria ? (
        <TouchableOpacity style={styles.deleteCategoria} onPress={() => eliminarCategoria(categoria)}>
        <Icon  
            size={iconSize}
            colors={[
                {color:"red",offset:"0",opacity:"1"},
                {color:"black",offset:"1",opacity:"1"},
            ]}
            name="delete-forever" type="material-community" />  
            <Text style={styles.textNavBar}>Eliminar</Text>
        </TouchableOpacity>
          
      ) : null}
      <View style={styles.contenedorInput}>
        <TextInput
          style={styles.textInput}
          placeholder="Escriba su nueva categoria aquí..."
          onChangeText={(e) => setText(e)}
          value={text}
        />
      </View>  
       {/* NavBar() -------------------------------------------*/}
       <View style = {styles.containerNavBar}>   

                            <ButtonNav 
                                functionNav={()=>navigation.navigate("MenuProductos")}
                                iconSelect={"delete-forever"}
                                buttonSize={30}
                                buttonName={"Salir"}/>
                            <ButtonNav 
                                functionNav={()=>navigation.navigate("MenuPrincipal")}
                                iconSelect={"home"}
                                buttonSize={30}
                                buttonName={"Home"}/>
                            <ButtonNav 
                                functionNav={()=>agregarCategoria({name:text})}
                                iconSelect={"content-save"}
                                buttonSize={30}
                                buttonName={"Agregar"}/>
        </View>   
    </View>
    </LinearGradient>
    
  );
};
const styles = StyleSheet.create({
  container:{
    marginTop:-15,
    flex:1,
    width:width, height:height,
    alignItems:"center",
  },
  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom:10,
  },
  categoriasContainer:{
    alignItems:"center",
    width:width, 
    height:height*0.6,
  },
  categorias:{
    margin:5,
    padding:5,
    width:width*0.8,
    borderRadius:15,
  },
  text:{
    textAlign: "center",
    color: 'black',  
    fontSize: 18,
    fontWeight: 'bold',             
  },
  contenedorInput:{
    bottom: 10,
    width:width,
    height:height*0.16,
    alignItems:"center",
  },
  textInput:{
    padding: 10,
    paddingStart:30,
    width:width*0.7,
    height:50,
    marginTop:20,
    borderBottomWidth:2,
    borderBottomColor:"#2C7DA0",
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
    /* Loading() -------------------------------------*/
    Loading: {
      flex: 1,
      justifyContent: "center"
    },
})
