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
const {width, height} = Dimensions.get('window');
////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////
import CardCompra from './CardCompra'
import Loading from '../../functions/Loading'

export default function Compras({route,navigation}){
    const {userProfile} = useAuth()
    ////////////////////conexion Api////////////////////////////
    const [shoppingApi,setShoppingApi]=useState(null)
    const getCompras =  ()=>{
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/shopping")
        getDocs(selectedC)
        .then(res => setShoppingApi(res.docs.map(buy=>({id:buy.id,...buy.data()}))))
    }
    useEffect(() => {
        if(userProfile){getCompras()}
    },[])
    let dataRender = shoppingApi
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
    let filtro = filtroName(shoppingApi, filterBySearch, "id");
    const filtroBusqueda = function (e) {
        setFilterBySearch(e);
    };

    if (filterBySearch !== "") {
        dataRender=filtro
    }
   /////////////////////////////////////////////////////
   /////////////////////////////////////////////////////
    return(
         <LinearGradient 
            colors={colorBackgroundModal}
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
            </View>
            <View style={styles.lista}>
                <Text style={styles.text}>Nro Compra</Text>
                <Text style={styles.text}>Total</Text>
                <Text style={styles.text}>Fecha </Text>
            </View>
            <View style={{height:height*0.72,}}>
            {!shoppingApi?<Loading/>:<FlatList
                    data={dataRender}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("CompraResumen",{id:item.id,total:item.total,fecha:item.createdDate,resumen:item.buyProducts, provider:item.provider,idProvider:item.idProvider,wayToPay:item.wayToPay})}>   
                                <CardCompra
                                    key={item.id+"p"}
                                    id={item.id}
                                    total={item.total}
                                    fecha={item.createdDate}
                                    resumen={item.buyProducts}
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
