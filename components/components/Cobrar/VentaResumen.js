////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
import {ActivityIndicator,Platform, Dimensions, FlatList, Alert, StyleSheet,TextInput,TouchableOpacity,View,Text,} from "react-native";
////////////////////////////////////////////////////
import {useAuth} from '../../context/authContext'
import {getFirestore, doc ,getDoc} from 'firebase/firestore';
import {deleteFirestore,putFirestore} from '../../functions/apiFunctions'
////////////////////////////////////////////////////
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

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
const VentaResumen = ({route,navigation})=>{
  console.log("------------------------")
  console.log("VentaResumen")
  const {userProfile} = useAuth()
/////////////////////////////////////////////////////////
  const {id,resumen,fecha,total,client,idClient,wayToPay}=route.params
  const data = resumen
/////////////////////////////////////////////////////////
const [businessApi,setBusinessApi] = useState(null)
const getMyBusinessApi = ()=>{
  const selectedDoc = doc(getFirestore(), "users/"+userProfile)
  getDoc(selectedDoc).then(res => setBusinessApi(res.data()))
}
useEffect(()=>{
  getMyBusinessApi()
},[])
  const deleteSale = ()=>{
    const selected = doc(getFirestore(), "users/"+userProfile+"/sales", id)
    deleteFirestore(selected)
    // putproduct stoock
  }
  
  const putProductsStock = (data)=>{
    data.forEach(product=>{
        const selectedDoc = doc(getFirestore(), "users/"+userProfile+"/products", product.id)
        let productEdit=null
        getDoc(selectedDoc).then(
          res => {return({id:res.id,...res.data()})}).then(res=>putFirestore(selectedDoc,({...res,stock:res.stock+product.amount})))
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    });
  }

 
/////////////////////////////////////////////////////////
  
 
  const anular = (products) => {
    deleteSale()
    putProductsStock(products)
    Alert.alert("Venta Anulada");
    navigation.navigate("MenuPrincipal")
  }

/////////////////////////////////////////////////////////
  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="width:100%;text-align: center;justify-content: center;">
    <div style="display:flex;flex-wrap: wrap;background-color:#F8E9E9;margin-bottom:15px; ">
      <div style="width:59%;height:28%;padding:10px;text-align:left;">
        <p style="text-align:right;">No valido como factura</p>
        <p>${businessApi?.myBusiness?.negocio?businessApi.myBusiness.negocio:null}</p>
        <p>${businessApi?.myBusiness?.de?businessApi.myBusiness.de:null}</p>
        <p>Cuit: ${businessApi?.myBusiness?.cuit?businessApi.myBusiness.cuit:null}</p>
        <p>Telefono: ${businessApi?.myBusiness?.telefono?businessApi.myBusiness.telefono:"Ninguno"}</p>
        <p>Fecha: ${fecha}</p>
        <p>Nro de venta: ${id}</p>
        <p>Cliente: ${client}</p>
        <p>Nro de Cliente: ${idClient}</p>
        <p>Forma de pago: ${wayToPay}</p>
      </div>
      <div style="width:35%;height:28%;">
        <img style="margin-top:36px;"src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Codigo_QR.svg/2048px-Codigo_QR.svg.png" alt="QR" width="250" height="250">
      </div>
    </div>
      ${resumen.map(product=> 
        ` <div style="background-color:#F8E9E9;width:100%;height:9%;margin-bottom:5px;display:flex;flex-wrap: wrap;">
            <p style="width:100%;text-align:center;">${product.name}</p>
            <p style="width:33%;text-align:center;">Precio por unidad: $ ${product.price}</p>            
            <p style="width:33%;text-align:center;">Cantidad: ${product.amount}</p>          
            <p style="width:33%;text-align:center;">Precio Final $ ${product.price*product.amount}</p>
            
          </div>`
      )}
      
      <p style="background-color:#F8E9E9;width:100%;margin-bottom:15px; padding:10px;">Total: $ ${total}</p>

    </body>
  </html>
  `;
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    // getMyBusinessApi()
    await Print.printAsync({
      html,
      height: 92, 
      width:192,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };
      //hacer global
      function financial(x) {
        return Number.parseFloat(x).toFixed(2);
      }
  console.log("------------------------")
  

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
                    <Text style={styles.text}>Cliente: {client?client:"ninguno"}</Text>
                    <Text style={styles.text}>Nro de Cliente: {idClient?idClient:"ninguno"}</Text>
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
                                    <Text style={styles.text}>Precio por unidad: {item.price?financial(item.price):null}</Text>
                                    <Text style={styles.text}>Cantidad: {item.amount}</Text>
                                    <Text style={styles.text}>Total Producto: {item.price?financial(item.price*item.amount):null}</Text>
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
                        <ButtonNav 
                          functionNav={() => anular(data)}
                          iconSelect={"delete-forever"}
                          buttonSize={30}
                          buttonName={"Anular"}/>
                        <ButtonNav 
                          functionNav={()=>navigation.navigate("MenuPrincipal")}
                          iconSelect={"home"}
                          buttonSize={30}
                          buttonName={"Home"}/>
                        <ButtonNav 
                          functionNav={Platform.OS === 'ios'?selectPrinter: print}
                          iconSelect={"content-save"}
                          buttonSize={30}
                          buttonName={"Resumen"}/>
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
      width: width*0.9,
      height: height*0.13,
      marginBottom: 5,
      padding: 10,
      flexWrap: "wrap"
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




export default VentaResumen;