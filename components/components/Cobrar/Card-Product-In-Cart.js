import React , {useEffect, useState} from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
////////////////////////////////////////////////////
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
const CardProducto = (
  {id,nombre, categoria, precio,product,shopingCart,shopingCartSave,setShopingCart,venta,setVenta})=>{
  const navigation = useNavigation();
  const [cantidad,setCantidad]= useState(1)
    function existe(arrayDeObjetos,atributo,valor){
      for(let i=0;i<arrayDeObjetos.length;i++){
        if(arrayDeObjetos[i][atributo]===valor){
          return true
        }
      }
      return false
    }

  ///////////////////////////////////////////////////////////////
  function addd(ventaEdit){
    let productoSave = shopingCartSave.filter(i=>i.id===id)
    let productoCantidad = ventaEdit.filter(i=>i.id===id)
    let productos = shopingCart
    for(let i=0;i<productos.length;i++){
        if(productos[i].id===id){
            productos[i]={...productos[i],stock:productoSave[0].stock-productoCantidad[0].amount}
        }
    }
    setShopingCart(productos)  
  }  
  function removee(Producto){
    setShopingCart(shopingCart.filter(p=>p.id!=Producto.id))     
  }
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    if(!existe(venta,"id",id)&&cantidad>0){
      setVenta([...venta,{id:id,name:nombre,amount:cantidad,price:precio}])
      let productoSave = shopingCart.filter(i=>i.id===id)
      setShopingCart([...shopingCart.filter(i=>i.id!=id),{...productoSave[0],stock:productoSave[0].stock-cantidad}])
    }else{
      if(cantidad===0){
        let ventaEdit=venta.filter(i=>i.id!=id)
        setVenta(ventaEdit)
        removee(product)
      }
      else{
        let ventaEdit = [...venta]
        for(let i=0;i<ventaEdit.length;i++){
          if(ventaEdit[i].id===id){
            ventaEdit[i]={...ventaEdit[i],amount:cantidad}
          }
        }
        setVenta(ventaEdit)
        addd(ventaEdit)
      }
    }
  },[cantidad])
    function add(){
      setCantidad(cantidad+1)
    }
    function remove(){
      setCantidad(cantidad-1)
    }
    return (
      <>
        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={estilo.lista}>
          <Text style={estilo.texto1}>{nombre}</Text>
          <Text style={estilo.texto2}>{categoria}</Text>
          <Text style={estilo.texto3}>{precio} </Text>
        </LinearGradient >
        <LinearGradient 
          colors={colorB}
          start={{x:1,y:0}}
          end={{x:0,y:1}} 
          style={estilo.listaCart}> 
          <TouchableOpacity onPress={()=>remove()}><Icon name="cart-remove" size={26} color={'white'}/></TouchableOpacity>
            <Text style={{color:'white'}}>Cantidad: {cantidad}</Text>
          <TouchableOpacity onPress={()=>add()}><Icon name="cart-plus" size={26} color={'white'}/></TouchableOpacity>
        </LinearGradient>
      </>
    );
  


};

let estilo = StyleSheet.create({
  listaCart: {
    width:width*0.9,
    flex: 1,
    marginTop:0,
    marginBottom:10,
    elevation: 1,
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    padding: 10,
    justifyContent:"space-around",
},
  lista: {
    width:width*0.9,
    flex: 1,
    backgroundColor: "#F8E9E9",
    elevation: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    justifyContent:"space-between",
  },
  texto1: { color: "black", width: "30%" },
  texto2: { color: "black", textAlign: "center", width: "30%" },
  texto3: { color: "black", textAlign: "right", width: "30%" },
});

export default CardProducto;
