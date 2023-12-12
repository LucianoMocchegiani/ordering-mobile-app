////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
import {ActivityIndicator, Dimensions, FlatList, Alert, StyleSheet,TextInput,TouchableOpacity,View,Text,} from "react-native";
////////////////////////////////////////////////////
import {useAuth} from '../../context/authContext'
import {getFirestore, collection, getDocs} from 'firebase/firestore';
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
import CardProducto from './Card-Producto-Cobrar'
import CategoriesSelect from './../Productos/Buscar/FIltro Categorias/FiltroCategorias'
const Loading =()=>{
    return (
      <View style={[styles.Loading]}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
export default function BucarProductos({ route, navigation }){
    console.log("------------------------")
    console.log("BucarProductos")
    const {userProfile} = useAuth()
    /////////////////////////////////////////////////////
    const [productsApi,setProductsApi]=useState(null)
    const getProducts =  ()=>{
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/products")
        getDocs(selectedC)
        .then(res => setProductsApi(res.docs.map(sale=>({id:sale.id,...sale.data()}))))
    }
   
    useEffect(() => {
        getProducts() 
    },[]);
    let arrayAMostrar = productsApi;
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    const [filtroCategoria,setFiltroCategoria]= useState(null)
    function filtroCategory(category) {
        if (!productsApi){return} 
        if (!category){return setFiltroCategoria(null)}
        return (
        setFiltroCategoria(productsApi.filter((e) =>e.category && e.category.includes(category))),
        console.log("filtrado......................."),
        console.log(productsApi.filter((e) =>e.category && e.category.includes(category))),
        // console.log(productosApi),
        console.log("filtrado.......................")
        )
    }
    if (filtroCategoria){
        arrayAMostrar=filtroCategoria
    }
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
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
  
   //Reflejar Stock
   function addToCart(product){
    // Pass and merge params back to home screen
    navigation.navigate({
      name: 'MenuCobrar',
      params: { products: product},
      merge: true,
    });}
   /////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
  //hacer global
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
   console.log("------------------------")
   /////////////////////////////////////////////////////
    return(
        <LinearGradient 
        colors={[ '#F1F4F4','#DADEDF']}
        start={{x:1,y:0}}
        end={{x:0,y:1}}
        style={{width:width,height:height}}>
       <View style={styles.container}>
          <View style={styles.caja}>
            <TextInput
            style={styles.textInput}
            onChangeText={(e) => filtroBusqueda(e)}
            value={filterBySearch}
            placeholder="Buscar..."
            />
            <CategoriesSelect filtrar={filtroCategory}/>
          </View>
          {!productsApi?<Loading/>:
            <FlatList
                data={arrayAMostrar}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                            <CardProducto
                                key={item.id}
                                id={item.id}
                                nombre={item.name}
                                categoria={item.category?item.category:null}
                                precio={item.price?financial(item.price):null}
                                product={item}
                                onPress={addToCart}
                            />
                    );
                }}
            />}
        </View>  
        </LinearGradient>                             
    );
}
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
      paddingStart:30,
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
