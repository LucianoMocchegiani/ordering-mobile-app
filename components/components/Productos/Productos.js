
import React, { useEffect, useState } from "react";
import {Dimensions,FlatList,StyleSheet,TextInput,TouchableOpacity,View,Text} from "react-native";
////////////////////////////////////////////////////
import {useAuth} from '../../context/authContext'
import {getFirestore, collection, getDocs} from 'firebase/firestore';
////////////////////////////////////////////////////
import CardProducto from "./Card-Producto";
import ModificarVarios from './Buscar/ModificarVarios'
import CategoriesSelect from './Buscar/FIltro Categorias/FiltroCategorias'
import Loading from '../../functions/Loading'
import BarCode from '../BarCode/BarCode'
import BarCodeIcon from '../BarCode/BarCodeIcon'
////////////////////////////////////////////////////
const {width, height} = Dimensions.get('window');
////////////////////////////////////////////////////
import { LinearGradient } from 'expo-linear-gradient';
////////////////////////////////////////////////////


const Productos = ({navigation}) => {
  console.log("------------------------")
  console.log("Productos")
   /////////////////////////////////////////////////////
    const {userProfile} = useAuth() 
  /////////////////////////////////////////////////////
    const [productsApi,setProductsApi]=useState(null)
    const getProducts =  ()=>{
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/products")
        getDocs(selectedC)
        .then(res => setProductsApi(res.docs.map(product=>({id:product.id,...product.data()})
        )))
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    }
   
    useEffect(() => {
      getProducts()
    },[]);
    let arrayAMostrar = productsApi;
    // useEffect(() => {
    //   

    // },[]);
    
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  //Funcion Filtro Scann
  const [scannOn,setScannOn]=useState(false)
  const [filterScanned,setFilterScanned]=useState(null)
  function filtroScann(code) {
    if (!productsApi){return} 
    if (!code){return setFilterScanned(null)}
    return (
      setFilterScanned(productsApi.filter((e) =>e.barCode && e.barCode.includes(code)))     
    )
  }
  if (filterScanned){
      arrayAMostrar=filterScanned
  }
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  //Funcion Filtro catgorias
  const [filtroCategoria,setFiltroCategoria]= useState(null)
  function filtroCategory(category) {
    if (!productsApi){return} 
    if (!category){return setFiltroCategoria(null)}
    return (
      setFiltroCategoria(productsApi.filter((e) =>e.category && e.category.includes(category)))     
    )
  }
  if (filtroCategoria){
    arrayAMostrar=filtroCategoria
  }
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  //Funcion Busqueda Nombre
  function filtroName(array, search, attibute) {
    if (!array){return} 
    return array.filter(
      (e) =>
        e[attibute] && e[attibute].toLowerCase().includes(search.toLowerCase())
    );
  }
  const [filterBySearch, setFilterBySearch] = useState("");
  let filtro = filtroName(arrayAMostrar, filterBySearch, "name");
  const filtroBusqueda = function (e) {
    setFilterBySearch(e);
  };
  if (filterBySearch !== "") {
    arrayAMostrar = filtro;
  }
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  // configuracion ModificarVarios
  const [seleccionarVarios,setSeleccionarVarios] = useState(false);
  const [arraySeleccionados,setArraySeleccionados]= useState([]);
  useEffect(() => {
    if(!arraySeleccionados.length){
      setSeleccionarVarios(false)
    }
  },[arraySeleccionados]);
  /////////////////////////////////////////////////////
  const [IdSelect, setIdSelect] = useState(0);
  const onLongPressHandler=(params)=>{
    if(!seleccionarVarios){
      setSeleccionarVarios(true)
    }
    if(arraySeleccionados.includes(params)){
      setArraySeleccionados(arraySeleccionados.filter(select=>select!==params))
    }
    else{
      setArraySeleccionados([...arraySeleccionados,params])
    }
  }
  const onPressHandler=(params)=>{
    if(!seleccionarVarios){
      setIdSelect(params.id)
      navigation.navigate("Producto-info",{...params})
    }
    else{
      if(arraySeleccionados.includes(params)){
        setArraySeleccionados(arraySeleccionados.filter(select=>select!==params))
      }
      else{
        setArraySeleccionados([...arraySeleccionados,params])
      }
    }
  }
  console.log("------------------------")
  //////////////////////////////////////////////////////////
  //hacer global
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
  /////////////////////////////////////////////////////
  
    return (
      
      <LinearGradient 
                colors={[ '#F1F4F4','#DADEDF']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={{width:width,height:height}}>
        {scannOn&&<BarCode codeFunction={filtroScann}setActive={setScannOn}/>}
       
        <View style={styles.container}>
          <View style={styles.caja}>
            <View style={{width:width,flexDirection:"row",justifyContent: "space-around"}}>
              <TextInput
              style={styles.textInput}
              onChangeText={(e) => filtroBusqueda(e)}
              value={filterBySearch}
              placeholder="Buscar..."
              />
              <TouchableOpacity onPress={()=>{setScannOn(true)}}><BarCodeIcon/></TouchableOpacity>
            </View>
            <CategoriesSelect filtrar={filtroCategory}/>
            <ModificarVarios estado={seleccionarVarios} listaSeleccionados={arraySeleccionados} setListaSeleccionados={setArraySeleccionados} listaCompleta={arrayAMostrar} recargarLista={getProducts} navigation={navigation}/>
          </View>
          {!productsApi?<Loading/>:
          <FlatList
            data={arrayAMostrar}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onLongPress={()=> onLongPressHandler(item)}
                  onPress={() => onPressHandler(item)}>
                  <CardProducto
                    key={item.id}
                    id={item.id}
                    nombre={item.name}
                    categoria={item.category}
                    precio={item.price?financial(item.price):null}
                    listaSeleccionados={arraySeleccionados}
                  />
                </TouchableOpacity>
              );
            }}
          />
        }
        </View>
      </LinearGradient>
    );
  
};
const styles = StyleSheet.create({
  container:{
    marginTop:-35,
    flex:1,
    alignItems:"center",
  },
  caja:{
    width:width,
    paddingTop:30,
    alignItems:"center",
  },
  textInput:{
    padding: 10,
    paddingStart:10,
    width:width*0.5,
    height:50,
    marginTop:20,
    borderRadius:30,
    backgroundColor:"#fff",
  },
  Loading: {
    flex: 1,
    justifyContent: "center"
  },
})


export default Productos;
