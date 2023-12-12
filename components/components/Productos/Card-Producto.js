import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window');
const CardProducto = ({ id, nombre, categoria, precio, listaSeleccionados}) => {
  
  listaSeleccionados = listaSeleccionados? listaSeleccionados.map(e=>e.id):[0]

  return (
    <>
      {!!(listaSeleccionados.includes(id))&&<LinearGradient 
        colors={[ '#206593','#25EADE']}
        start={{x:1,y:0}}
        end={{x:0,y:1}}
        style={styles.containerCard}>
        <Text style={styles.text1}>{nombre}</Text>
        <Text style={styles.text2}>{categoria}</Text>
        <Text style={styles.text3}>{precio} </Text>
      </LinearGradient>}
      {!(listaSeleccionados.includes(id))&&<LinearGradient 
        colors={[ '#F8E9E9','#B9C7CA']}
        start={{x:1,y:0}}
        end={{x:0,y:1}}
        style={styles.containerCard}>
        <Text style={styles.text1}>{nombre}</Text>
        <Text style={styles.text2}>{categoria}</Text>
        <Text style={styles.text3}>{precio} </Text>
      </LinearGradient>}
    </>
  );
};
export default CardProducto;

let styles = StyleSheet.create({
  containerCard:{
    flexDirection:'row',
    width:width*0.9,
    height:40,
    padding:10,
    margin: 5,
    justifyContent: "space-between",
    alignItems: "center",

  },
  text1: { fontWeight: "600", color: "black", width: "30%" },
  text2: { fontWeight: "600", color: "black", textAlign: "center", width: "30%" },
  text3: { fontWeight: "600", color: "black", textAlign: "right", width: "30%" },

})

