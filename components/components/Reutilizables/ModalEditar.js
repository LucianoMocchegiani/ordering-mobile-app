import {useState} from 'react'
import { Dimensions,StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
////////////////////////////////////////////////////
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';


////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////

const {width, height} = Dimensions.get('window');

function Editar({setActive,setActiveModal}){
  
  const handleChange = ()=>{
    setActiveModal(true)
    setActive(true)
  }
  
  return (
    <TouchableOpacity
      onPress={()=> handleChange()}>
      <Icon  
          size={25}
          colors={[
            {color:"#206593",offset:"0",opacity:"1"},
            {color:"#25EADE",offset:"1",opacity:"1"},
          ]}
          name="pencil" type="material-community" /> 
    </TouchableOpacity>
    
  )
}
export default function ModalEditar({dato, state, setState,setActiveModal}){
    const [editado, setEditado]= useState(state[dato])
    const [active, setActive]= useState(false)
    function modalHandler(e){
      setEditado(e)
    }
    function checkOk(){
      setState({
        ...state,
        [dato]:editado
      })
      setActiveModal(false)//tapa a el componente que llama a el modal
      setActive(false)
      
    }
    function exit(){
      setActiveModal(false)
      setActive(false)
      
    }
    return (
      <>
        {!active?<Editar setActive={setActive} setActiveModal={setActiveModal}/>:
        <View style={styles.container}>
        <LinearGradient 
            colors={[ '#F8E9E9','#B9C7CA']}
            start={{x:1,y:0}}
            end={{x:0,y:1}}
            style={styles.modal}>
            <Text style={styles. textTitle} ></Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(e) => modalHandler(e)}
                value={editado?.toString()}
                />
            <View style={styles.modalButtonsContainers}>
            <TouchableOpacity onPress={()=>checkOk()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
            <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
            </View> 
        </LinearGradient>
        </View>}
      </>
    )
  }


  const styles = StyleSheet.create({
    container:{
      
      position: 'absolute',
      top: -100, left: -63,
      flex:1,
      alignItems:"center",
      width:width, height:height,
      backgroundColor:"black",
    },
    modalButtonsContainers:{
      
      width:width,
      justifyContent: 'space-around',
      flexDirection: 'row',
    },
    modal:{
      
      marginTop: "60%",
      position: "absolute",
      width: '90%',
      marginLeft: '5%',
      height: "30%",
      backgroundColor: 'black',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: 0,
      elevation: 10,
      flexDirection: 'column',
    },
    modalContainer:{
      
      position: 'absolute',
      marginTop:25,
      width: width,
      height: height,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    cotainerIcon: {
      
      width: width*0.9,
      backgroundColor: '#fff',
      flexWrap:"wrap",
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding:5,
      margin:10
    },
    cotainerTitle: {
      
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      padding:5,
      marginTop: 40,
    },
    textTitle : {
      
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',            
    } ,
    text : {
      
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',  
      width:"90%"          
    } ,
     textInput:{
      
      padding: 10,
      paddingStart:30,
      width:width*0.5,
      height:50,
      marginTop:20,
      borderBottomWidth:2,
      borderBottomColor:"#2C7DA0",
    },
  })
  