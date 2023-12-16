import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View, Text, Modal, SafeAreaView} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');

const Touchable = (text,selected,onPress)=>{
    const TouchableComponent = ()=>{
      return (
        <TouchableOpacity 
          onPress={onPress}
          style={styles.selectTouch}>
          <Text style={{...styles.text,width:'80%' }}>{'Ver codigos'}</Text>
          <Icon name="chevron-right" color="#555" size={26}/>
          
        </TouchableOpacity>
      )
    }
  return {TouchableComponent}
}
  const Option =(item, selected ,onPress, dataActive=[]) =>{
    
    const OptionComponent =()=>{
      return (
        <TouchableOpacity style={styles.selctedContainer} onPress={onPress}>
          {(item&&dataActive.includes(item))?<Text style={{...styles.selectText}}>{item}    {'(codigo activo)'}</Text>:
          <Text style={styles.selectText}>{item?item:null}</Text>}
        </TouchableOpacity>
      )
    }
    return {OptionComponent}
}
function Select (
    { 
      touchableComponent = Touchable,
      optionComponent=Option,
      touchableText = 'Select a option',  
      title ="",
      data=[],
      dataActive=[],
      selectFunction,
    }
  ){
    const [visible,setVisible] = useState(false)
    const [selected,setSelected] = useState(null)
    const {TouchableComponent}=touchableComponent(touchableText,selected,()=> setVisible(true));
    function renderOption(item , dataActive){
      const {OptionComponent}=optionComponent(item,selected, ()=>toggleSelect(item), dataActive)
      return <OptionComponent key={item}/>
    }
    function toggleSelect(item){
      selectFunction(item)
      setSelected(item)
      setVisible(false)
    }
    return(
      <>
       <TouchableComponent/>  
       <Modal visible={visible} animationType="slide">
         <SafeAreaView style={{flex:1}}>
           <View style={styles.cabeza}>
             <TouchableOpacity onPress={()=> setVisible(false)}>
             <Icon name="close" size={26} color={'#212121'}/>
             </TouchableOpacity>
             <View style={styles.tituloContenedor}>
               <Text style={styles.titulo}>{title}</Text>
             </View>
           </View>
           <FlatList  
            data={data}
            keyExtractor={(_,index) => String(index)}
            renderItem={({ item }) => renderOption(item, dataActive)}
          />
         </SafeAreaView>
       </Modal>
       
      </>
    )
}

export default function ModalSelect({text='Seleccionar',text2='',arraySelects,arrayActive,selectFunction}){
    return(
        <>
            <View style={styles.button}>
                <Select touchableText = {text2}
                title="Selecciona una opcion" 
                data={arraySelects} 
                dataActive={arrayActive} 
                selectFunction={selectFunction}
                touchableText={text}/>
            </View>
        </>
    )
}



const styles = StyleSheet.create({
    selectTouch:{
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      width:'100%',
      height:'100%'
    },
    selectTextOne:{
      marginLeft:10,
      color:'#212121',
      fontSize:14,
      fontWeight:'800', 
    },
    selectText:{
      marginLeft:width*0.38,
      color:'#212121',
      fontSize:16,
      fontWeight:'600', 
    },
    cabeza:{
      borderBottomColor:'#fff',
      borderBottomWidth:3,
      flexDirection:"row-reverse",
      alignItems:"center",
      paddingBottom:12,
      paddingHorizontal:12,},
    tituloContenedor:{
      flex:1,
    },
    titulo:{
      marginLeft:width*0.05,
      fontSize:18,
      fontWeight: "bold",
      color:"#212121",
      textAlign:"center",
    },
    selctedContainer:{
      width:width,
      flexDirection:'row',
      alignItens: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12,
      paddingVertical:12,
      borderBottomColor:'black',
      borderBottomWidth:10,
      backgroundColor:'#fff',
    },
    container: {
        width:width*0.9,
        backgroundColor:'white',
        flexDirection:"row",
        alignItems:"center",
        marginTop:10,
      },
      title:{
        marginLeft:5,
        fontSize:14,
        fontWeight: "600",
        color:"#212121",
      },
      button:{
        width:width*0.45,
        height:height*0.05,
        backgroundColor:"#fff",
        borderColor:"#5c7ae3",
        borderWidth:1.5,
        borderRadius:8,
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    },
    text:{
      color: "black",
      fontWeight: "bold",
      textAlign: "center",
      textTransform: "uppercase",
      fontSize:12,
    },
});
 
 
