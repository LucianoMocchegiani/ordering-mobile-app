import React from "react";
import {Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function ButtonLogin({onPress}){
   
    return (    
        <TouchableOpacity onPress={()=>onPress()} style={styles.container} >
          <LinearGradient 
            colors={[ '#206593','#25EADE']}
            start={{x:1,y:0}}
            end={{x:0,y:1}}
            style={styles.button}>
            <Text style={styles.text}>Login</Text>
          </LinearGradient>
        </TouchableOpacity> 
    )
}
export function ButtonLoginGoogle({onPress}){
   
  return (    
      <TouchableOpacity onPress={()=>onPress()} style={styles.container} >
        <LinearGradient 
          colors={[ '#206593','#25EADE']}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.button}>
          <Image source={require("../../assets/googleIcon.png")} style={{width:45,height:45}}/>
          <Text style={styles.text}>Login with Google</Text>
        </LinearGradient>
      </TouchableOpacity> 
  )
}
export function ButtonRegister({onPress}){
   
    return (    
        <TouchableOpacity onPress={()=>onPress()} style={styles.container} >
          <LinearGradient 
            colors={[ '#206593','#25EADE']}
            start={{x:1,y:0}}
            end={{x:0,y:1}}
            style={styles.button}>
            <Text style={styles.text}>Registrar</Text>
          </LinearGradient>
        </TouchableOpacity> 
    )
}

const styles= StyleSheet.create({
    container: {
        width: '80%',
        height:50,
        alignItems: 'center',
        marginTop: 20,
    },
    button:{
        width:"80%",
        height:50,
        borderRadius:25,
        padding:10,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',

    },
    text:{
        fontSize:20,
        color:"#fff",
        textAlign:"center",
    }

})