import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default function DataFormContainer({data}){
    return(
        <>
            <View  
                style={styles.container}>
                <Text style={styles.text}>{data}</Text>
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
        alignItems:'center',
        borderColor:"gray",
        borderWidth:1.5,
    },
    text:{
       color: "black",
       fontWeight: "bold",
       textAlign: "center",
       textTransform: "uppercase",
       fontSize:12,
    },
})
