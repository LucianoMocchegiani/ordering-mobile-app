import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect} from "react";
import {View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text, StatusBar,Alert} from 'react-native';
import DataFormContainer from '../reutilizables/DataFormContainer';
import ButtonHeader from '../reutilizables/ButtonHeader'
import {putCategory, getCategories} from '../../../firebase/endpoints/categories'
import { useStorage } from '../../../context/storageContext';
import Loading from '../reutilizables/Loading';
const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');
function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={'code-greater-than'} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Categoria</Text>
        </View>
    )
}
export default function CategoryDetail({navigation, route}){
    const {setCategoriesData, loading,setLoading} = useStorage()
    const {id, name, created_date, updated_date} = route.params.category
    const [ category, setCategory] = useState(
        {
            name:name,
        }
    )
    const handleChange = (e, atribute) => {       
 
        setCategory({
            ...category,
            [atribute]:e
        })
     
    }
    const updatedCategory = async ()=>{
        if(!category.name){
            return Alert.alert('Error','Complete los campos.')
        }else{
            const responce = await putCategory(setLoading, id, category)
            if(responce){
                getCategories(setCategoriesData)
                navigation.navigate('tienda')
            }
        }
    }
  
    return (
        <View style={styles.containerAll}>
            <Header/>
            {loading?<Loading/>:<>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10,}}>
                <ButtonHeader functionOnPress={()=>updatedCategory()} buttonName={'Actualizar categoria'}/>
            </View>
            <View style={styles.container}>
                <View style={styles.dataForm}>
                    <DataFormContainer data={'Nombre'}/>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(e) => handleChange(e, 'name')}
                        placeholder={'Ingrese nombre...'}
                        value={category.name}
                    />
                </View>         
            </View></>}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:width*0.95, 
        alignItems:'center',
        justifyContent:'center',
        paddingTop:10,
        borderColor:"black",
        borderWidth:1.5,
        marginBottom:10,
    },
    dataForm:{
        width:'100%',
        flexDirection:'row', 
        justifyContent: "space-around", 
        marginBottom:10
    },
    textInput: {
        width:width*0.45,
        height:height*0.05,
        backgroundColor:"#fff",
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:"black",
        borderWidth:1.5,
    },
    textInputStock:{
        width:width*0.10,
        height:height*0.05,
        backgroundColor:"#fff",
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        borderColor:"#fff",
        borderWidth:1.5,
    },
    text:{
       color: "black",
       fontWeight: "bold",
       textAlign: "center",
       textTransform: "uppercase",
       fontSize:12,
    },
    plusMinus:{
        paddingVertical:30,
        flexDirection:'row',
        width:width*0.45,
        alignItems:'center',
        justifyContent:'space-around',
        borderColor:"gray",
        borderWidth:1.5,
        marginTop:5,
        
    },
    imageContainer:{
        width:width*0.45,
        borderColor:"gray",
        borderWidth:1.5,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
    },
    containerAll: {
        marginTop:heigtStatusBar,
        flex: 1,
        width:width,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
      },
      containerHeader:{
          justifyContent: "center",
          alignItems:"center",
          flexDirection:'row',
          height:height*0.08,
      }
});

