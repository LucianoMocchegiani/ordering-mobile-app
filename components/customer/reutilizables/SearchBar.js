import React, { useState, useEffect} from "react";
import {StyleSheet, TextInput, Dimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');
function filterBy(array, search, atribute, atributes ) {
    // filtra array de objetos
    // 1 parametro array afiltrar
    // 2 parametro de busqueda
    // 3 parametro atributo a filtrar
    if(atributes?.length && array){
        let  result = []
        atributes.forEach(atribute => {
            const resultFilter = array.filter( (e) =>e[atribute] && e[atribute].toLowerCase().includes(search.toLowerCase()))
            if (resultFilter.length){
                result = resultFilter
            }   
        })
        return result
    }
    else if(array){
      return array.filter(
      (e) =>
          e[atribute] && e[atribute].toLowerCase().includes(search.toLowerCase())
    )}
}
export default function SerchFilter(
    {setFilter,  
    array, 
    atribute = 'id', 
    atributes,
    placeholder= 'Buscar...' })
    {
    // filtra array de objetos devuelve componente de busqueda
    const [filterBySearch, setFilterBySearch] = useState("");
    let filter = filterBy(array, filterBySearch, atribute, atributes);
    const filtroBusqueda = function (e) {
        setFilterBySearch(e);
    };
    useEffect(() => {
        setFilter(filter)
        if(filterBySearch==""){
            setFilter(array)
        } 
    },[filterBySearch])
   
    return(
        <View style={styles.container}>
        <Icon name={"magnify"} size={30} color="#5c7ae3" style={styles.icon}/>
        <TextInput
          style={styles.textInput}
          onChangeText={(e) => filtroBusqueda(e)}
          value={filterBySearch}
          placeholder={placeholder}
        />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
      width:width*0.42,
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
    }
});