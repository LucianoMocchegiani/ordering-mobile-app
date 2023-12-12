import React from "react";
import {StyleSheet, TextInput, Dimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getProducts, searchProductsAlgolia } from '../../firebase/endpoints/products';
const {width, height} = Dimensions.get('window');

export default function AlgoliaSearch({setRender, placeholder= 'Buscar...', setLoading}) {

    const handleChange = (e) => {       
        if (e === ''){
            getProducts( setLoading, setRender)
        }else{
            searchProductsAlgolia( setLoading, setRender, e)
        }
    }
  
    return (
        <View style={styles.container}>
            <Icon name={"magnify"} size={30} color="#5c7ae3" style={styles.icon}/>
            <TextInput
                style={styles.textInput}
                onChangeText={(e) => handleChange(e)}
                placeholder={placeholder}
            />
        </View>
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
    }
});