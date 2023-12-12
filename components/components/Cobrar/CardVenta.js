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


const CardVenta = ({id,total,fecha,resumen})=>{
    const navigation = useNavigation();
    return (
        <> 
          <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.lista}>
                    <Text style={styles.texto1}>{id}</Text>
                    <Text style={styles.texto2}>{total}</Text>
                    <Text style={styles.texto3}>{fecha} </Text>
          </LinearGradient>
        </>
    );
};
  
  let styles = StyleSheet.create({
    lista: {
      flex: 1,
      backgroundColor: "#F8E9E9",
      margin: 5,
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
  
  export default CardVenta;