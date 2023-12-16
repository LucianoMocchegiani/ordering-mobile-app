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
          <Text style={{...styles.text,width:'50%' }}>{text}</Text>
          <Icon name="chevron-right" color="#555" size={26}/>
          <Text style={{...styles.text,width:'40%'}}>{selected}</Text>
        </TouchableOpacity>
      )
    }
  return {TouchableComponent}
}
  const Option =(item, value , selected ,onPress) =>{
    const OptionComponent =()=>{
      return (
        <TouchableOpacity style={styles.selctedContainer} onPress={onPress}>
          <Text style={styles.selectText}>{item?item[value]:null}</Text>
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
      objKey ='id',
      objValue="name",
      selectFunction,
    }
  ){
    const [visible,setVisible] = useState(false)
    const [selected,setSelected] = useState(null)
    const {TouchableComponent}=touchableComponent(touchableText,selected,()=> setVisible(true));
    function renderOption(item){
        const {OptionComponent}=optionComponent(item,objValue,selected, ()=>toggleSelect(item))
        return <OptionComponent key={item.id}/>
    }
    function toggleSelect(item){
      selectFunction(item)
      setSelected(item?.[objValue])
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
            renderItem={({ item }) => renderOption(item)}
          />
         </SafeAreaView>
       </Modal>
       
      </>
    )
}

export default function ModalSelect({text='Seleccionar',text2='', objValue, arraySelects,selectFunction}){
    return(
        <>
            <View style={styles.button}>
                <Select touchableText = {text2}
                title="Selecciona una opcion" 
                objKey='id' 
                objValue= {objValue?objValue:'name'}
                data={arraySelects} 
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
      borderBottomColor:'#eee',
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
      borderBottomColor:'#eee',
      borderBottomWidth:10,
      backgroundColor:'#DADEDF',
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
 
 
