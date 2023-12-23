import React from "react";
import {StyleSheet, TextInput, Dimensions, View, FlatList, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { searchProductsAlgolia, getProduct } from '../../../firebase/endpoints/products';
import { useState } from "react";
import { useEffect } from "react";
const {width, height} = Dimensions.get('window');

export default function AlgoliaSearch({setRender, placeholder= 'Buscar...', setLoading, getSearch=()=>console.log('search') }) {
    const [state, setState]= useState([])
    const handleChange = (e) => {    
        if (!e.length){
            console.log(e)
            getSearch()
            setState([])
        }else{
            searchProductsAlgolia( setLoading, setState, e)
        }
    }
    useEffect(()=>{
        console.log(state)
    },[state])
    const geter = async ( setLoading, id, setRender)=>{
        console.log(id)
        await getProduct(setLoading, id, setRender)
    }
    return (
        <>
        <View style={styles.container}>
            <Icon name={"magnify"} size={30} color="#5c7ae3" style={styles.icon}/>
            <TextInput
                style={styles.textInput}
                onChangeText={(e) => handleChange(e)}
                placeholder={placeholder}
            />
        </View>
        {state.length?
            <FlatList
                style={styles.stylesearch}
                data={state}
                keyExtractor={(item) => item.objectID}
                renderItem={({ item }) => {
                return (
                    <TouchableOpacity
                        onPress={()=> geter( setLoading, item.objectID, setRender)}
                    >
                    <View
                        key={item.objectID}
                    >
                        <Text style={styles.text}>{item.name}</Text>
                    </View>
                    </TouchableOpacity>
                );
                }}
            />:null}
       
        </>
    )
}



const styles = StyleSheet.create({
    container:{
      width:width*0.45,
      height:height*0.05,
      flexDirection:'row',
      backgroundColor:"#fff",
      borderColor:"black",
      borderWidth:1,
      alignItems:'center',
      justifyContent:'center',
    },
    textInput: {
      width:'80%',
      height:'100%',
    },
    icon:{
        width:'20%',
        height:'100%',
        paddingVertical:5,
    },
    stylesearch:{
        width:width*0.45,
        height:'auto',
        backgroundColor:'#fff',
        padding:10,
        borderColor:"black",
        borderWidth:1,
        
    },
    text:{
        fontSize:12,
        color:'black',
        textTransform:'uppercase'
    }
});