import React from "react";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, FlatList, StyleSheet, Dimensions, Text, StatusBar, TouchableOpacity} from 'react-native';
import { useStorage } from "../../../context/storageContext";
import ButtonHeader from "../reutilizables/ButtonHeader";

const heigtStatusBar = StatusBar.currentHeight
const {height, width} = Dimensions.get('window');
function CardCode ({id, name, category, navigation}){
    return(
        <TouchableOpacity
            onPress={()=>navigation.navigate('categoryDetail',{category:category})}>
            <View style={styles.container}>
                <Text >{name}</Text>
            </View>
        </TouchableOpacity>
    )
}
function Header(){
    return(
        <View style={styles.containerHeader}>
            <Icon name={'code-greater-than'} size={40} color="#5c7ae3" />
            <Text style={{textTransform:"uppercase", marginLeft:5}}>Categorias</Text>
        </View>
    )
}

export default function RenderCodes({navigation}){
    const {categoriesData}=useStorage()
    return (
        <View style={styles.containerAll}>
            <Header/>
            <View style={{width:width*0.95, flexDirection:'row', justifyContent: "space-between", marginBottom:10,}}>
                <ButtonHeader functionOnPress={()=>navigation.navigate('newCategory')} buttonName={'Nuevo categoria'}/>       
            </View>
            <View>
                <FlatList
                    style={styles.containerFlat}
                    data={categoriesData}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                    return (
                        <CardCode 
                            key={item.id}
                            id={item.id}
                            name ={item.name}
                            category = {item}
                            navigation = {navigation}
                        />
                    );
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader:{
        justifyContent: "center",
        alignItems:"center",
        flexDirection:'row',
        height:height*0.08,
    },
    containerAll: {
        marginTop:heigtStatusBar,
        flex: 1,
        width:width,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "flex-start",
      },
    containerFlat: {
        height:"auto", marginBottom:height*0.30,
    },
    container: {
        width:width*0.95,
        height:height*0.06,
        backgroundColor: "#fff",
        alignItems: 'center',
        alignContent:'center',
        justifyContent: 'space-around',
        borderWidth:1,
        borderColor:'black',
        marginBottom:10,
        flexDirection:'row'
    },
    text:{
        fontSize:14,
        textTransform:'uppercase',
    }
});