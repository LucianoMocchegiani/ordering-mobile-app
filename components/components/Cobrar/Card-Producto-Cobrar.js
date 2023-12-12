import React , {useState} from "react";
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
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
const CardProducto = ({ id, nombre, categoria, precio, product,onPress}) => {
  const navigation = useNavigation();

    return (
      <>
        <LinearGradient 
          colors={[ '#F8E9E9','#B9C7CA']}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.containerCard}>
          <Text style={styles.text1}>{nombre}</Text>
          <Text style={styles.text2}>{categoria}</Text>
          <Text style={styles.text3}>{precio} </Text>
          <TouchableOpacity onPress={()=>onPress(product)}><Icons name="cart-plus" size={26} color={'#212121'}/></TouchableOpacity>
        </LinearGradient >
      </>
    );
  


};
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

  

export default CardProducto;
