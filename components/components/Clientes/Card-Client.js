import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window');
const CardClient = ({nombre, telefono, direccion}) => {

  return ( 
    <>
      <LinearGradient 
        colors={[ '#F8E9E9','#B9C7CA']}
        start={{x:1,y:0}}
        end={{x:0,y:1}}
        style={styles.containerCard}>
        <Text style={styles.text1}>{nombre}</Text>
        <Text style={styles.text2}>{telefono}</Text>
        <Text style={styles.text3}>{direccion} </Text>
      </LinearGradient>
    </>
  );
};
export default CardClient;

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

