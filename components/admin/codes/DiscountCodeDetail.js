import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect} from "react";
import {View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Text, StatusBar,Alert} from 'react-native';
import DataFormContainer from '../reutilizables/DataFormContainer';
import ButtonHeader from '../reutilizables/ButtonHeader'
import {putDiscountCode, getDiscountCodes, deleteDiscountCode} from '../../../firebase/endpoints/discountCodes'
import { useStorage } from '../../../context/storageContext';
import Loading from '../reutilizables/Loading';
const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');
function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={'code-greater-than'} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Nuevo codigo</Text>
        </View>
    )
}
export default function DiscountCodeDetail({navigation, route}){
    const { setDiscountCodesData, loading, setLoading } = useStorage()

    const {id, discount, created_date, updated_date} = route.params.code
    const [ discountCode, setDiscountCode ] = useState(
        {
            id:id,
            discount:discount,
            created_date:created_date,
            updated_date: updated_date
        }
    )
    const handleChange = (e, atribute) => {       
        if(atribute==='discount'&& isNaN(Number(e))){
            return
        }else{
            setDiscountCode({
                ...discountCode,
                [atribute]:e
            })
        }
    }
    const updatedDiscountCode = async ()=>{
        if(!discountCode.id){
            return Alert.alert('Error','Complete los campos.')
        }else{
            const responce = await putDiscountCode(setLoading, discountCode.id, discountCode)
            if(responce){
                getDiscountCodes(setDiscountCodesData)
                setDiscountCode(  {
                    id:'',
                    discount:0
                })
                navigation.navigate('Tienda')
            }
        }
    }
    const deleteCodeHandle= async ()=>{
        const asistandDelete= async ()=>{
            try {
                await deleteDiscountCode(id,setLoading)
                navigation.navigate('Tienda')
                getDiscountCodes(setDiscountCodesData)
                Alert.alert('Notificacion', 'Codigo eliminado.')

            }catch(error){
                Alert.alert('Error', error.message)
            }
        }
        Alert.alert('Estas seguro?', 'Quieres eliminar este codigo?',[
            {
                text: 'Eliminar',
                onPress: async () => asistandDelete(),
            },
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancelar'),
                style: 'cancel',
            },
        ],)
    }
  
    return (
        <View style={styles.containerAll}>
            <Header/>
            {loading?<Loading/>:<>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10,}}>
                <ButtonHeader functionOnPress={()=>updatedDiscountCode()} buttonName={'Guardar Cambios'}/>
                <ButtonHeader functionOnPress={()=>deleteCodeHandle()} buttonName={'Eliminar codigo'}/>
            </View>
            <View style={styles.container}>
                <View style={styles.dataForm}>
                    <DataFormContainer data={'Nombre'}/>
                    <DataFormContainer data={discountCode.id}/>
                </View>       
                <View style={styles.dataForm}>
                    <DataFormContainer data={'Descuento'}/>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={(e) => handleChange(e, 'discount')}
                        placeholder={'Ingrese descuento'}
                        value={discountCode.discount.toString()}
                    />
                </View>      
                <View style={styles.dataForm}>
                    <DataFormContainer data={'Creado'}/>
                    <DataFormContainer data={created_date.toDate().toString()}/>
                </View>
                <View style={styles.dataForm}>
                    <DataFormContainer data={'Ultima actualizacion'}/>
                    <DataFormContainer data={updated_date.toDate().toString()}/>
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

