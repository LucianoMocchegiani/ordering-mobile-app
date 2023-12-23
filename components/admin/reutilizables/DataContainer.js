import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default function DataContainer({data, customStyles, large}){
    return(
        <>
            <View  
                style={large?styles.containerLarge:styles.container}>
                <Text style={customStyles?customStyles.text:styles.text}>{data}</Text>
            </View>
        </>     
    )
}
const styles = StyleSheet.create({
    container:{
        width:width*0.45,
        height:height*0.05,
        backgroundColor:"#fff",
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center'
    },
    containerLarge:{
        width:width*0.95,
        height:height*0.05,
        backgroundColor:"#fff",
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:5,
    },
    text:{
       color: "black",
       fontWeight: "bold",
       textAlign: "center",
       textTransform: "uppercase",
       fontSize:12,
    },
})
