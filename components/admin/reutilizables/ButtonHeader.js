import React from 'react';
import {Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default function Button({functionOnPress, buttonName}){
    return(
        <>
            <TouchableOpacity  onPress={() => functionOnPress()} style={styles.button}>
                {buttonName&&<Text style={styles.text}>{buttonName}</Text>}
            </TouchableOpacity>
        </>     
    )
}
const styles = StyleSheet.create({
    button:{
        width:width*0.45,
        height:height*0.05,
        backgroundColor:"#fff",
        borderColor:"#5c7ae3",
        borderWidth:1.5,
        borderRadius:8,
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
       color: "black",
       fontWeight: "bold",
       textAlign: "center",
       textTransform: "uppercase",
       fontSize:12,
    },
})
