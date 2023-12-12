////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
import {ActivityIndicator, Dimensions, FlatList, Alert, StyleSheet,TextInput,TouchableOpacity,View,Text,} from "react-native";
////////////////////////////////////////////////////
import {useAuth} from '../../context/authContext'
import {getFirestore, collection, getDocs, Timestamp} from 'firebase/firestore';
////////////////////////////////////////////////////
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';
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
import CardVenta from './CardVenta'
const Loading =()=>{
    return (
      <View style={[styles.Loading]}>
        <ActivityIndicator size="large" />
      </View>
    )
}
export default function Ventas({route,navigation}){
    console.log("------------------------")
    console.log("Ventas")
    const {userProfile} = useAuth()
    //////////////////////filtro por cliente///////////////////////////////
    const idClient = route.params? route.params.idClient: null

    ////////////////////conexion Api////////////////////////////
    const [salesApi,setSalesApi]=useState(null)
    const getVentas =  ()=>{
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/sales")
        getDocs(selectedC)
        .then(res => setSalesApi(res.docs.map(sale=>({id:sale.id,...sale.data()}))))
    }
    useEffect(() => {
        if(userProfile){
           getVentas()
        }
    },[])
    let dataRender = []
    if(idClient){
        dataRender= salesApi?.filter(sale=> sale.idClient===idClient)
    }else{
        dataRender = salesApi
    }
    /////////////////////////////////////////////////////
    
    
    function filtroName(array, search, attibute) {
        if (!array){return} 
        return array.filter(
        (e) =>
            e[attibute] && e[attibute].toLowerCase().includes(search.toLowerCase())
        );
    }
    const [filterBySearch, setFilterBySearch] = useState("");
    let filtro = filtroName(salesApi, filterBySearch, "id");
    const filtroBusqueda = function (e) {
        setFilterBySearch(e);
    };

    if (filterBySearch !== "") {
        dataRender=filtro
    }
   /////////////////////////////////////////////////////
    //hacer global
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }
   console.log("------------------------")
   /////////////////////////////////////////////////////
    return(
         <LinearGradient 
            colors={colorBackgroundModal}
            start={{x:1,y:0}}
            end={{x:0,y:1}}
            style={{width:width,height:height}}>
        <View style={styles.container}>
            <View style={styles.caja}>
            {!idClient&&<TextInput
                    style={styles.textInput}
                    onChangeText={(e) => filtroBusqueda(e)}
                    value={filterBySearch}
                    placeholder="Buscar..."
                /> }                      
            </View>
            <View style={styles.lista}>
                <Text style={styles.text}>Nro Venta</Text>
                <Text style={styles.text}>Total</Text>
                <Text style={styles.text}>Fecha </Text>
            </View>
            <View style={{height:height*0.72,}}>
            {!salesApi?<Loading/>:<FlatList
                    data={dataRender}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("VentaResumen",{id:item.id,total:item.total,fecha:item.createdDate,resumen:item.sellProducts, client:item.client,idClient:item.idClient,wayToPay:item.wayToPay})}>   
                                <CardVenta
                                    key={item.id+"p"}
                                    id={item.id}
                                    total={item.total?financial(item.total):null}
                                    fecha={item.createdDate}
                                    resumen={item.sellProducts}
                                    // client={item.client}
                                    // idClient={item.idClient}
                                    // wayToPay={item.wayToPay}
                                />
                            </TouchableOpacity> 
                        );
                    }}
                />}
            </View>
            {/* NavBar() -------------------------------------------*/}
            <View style = {styles.containerNavBar}>   
                     
            <ButtonNav 
                                functionNav={()=>navigation.navigate("MenuPrincipal")}
                                iconSelect={"home"}
                                buttonSize={30}
                                buttonName={"Home"}/>
                   
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
      marginBottom:5,
      borderRadius:30,
      backgroundColor:"#fff",
    },
    lista: {
        width:width*0.88,
        height: height*0.04,
        margin: 5,
        backgroundColor: "white",
        justifyContent:"space-between",
        flexDirection: "row",
        alignItems: "center",
    },
    text: { color: "black"},
    Loading: {
      flex: 1,
      justifyContent: "center"
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
