import {useEffect,useState} from 'react'
import {useAuth} from '../../context/authContext'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from 'react-native';
import { Icon } from 'react-native-gradient-icon';
import {getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc, addDoc} from 'firebase/firestore';
import {postFirestoreId} from '../../functions/apiFunctions'
const {width, height} = Dimensions.get('window');
const iconSize= 100;
import ButtonNav from '../Reutilizables/ButtonNav'

////////////////////////////////////////////////////
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
function Editar({dato,setDato,setActive}){
  
  const handleChange = ()=>{
    setDato(dato)
    setActive(true)
  }
  
  return (
    <TouchableOpacity
      onPress={()=> handleChange()}>
      <Icons name="pencil" size={25} color="black" />
    </TouchableOpacity>
    
  )
}
function ModalEditar({dato,state,setState,setActive,checkOk}){
    const [editado, setEditado]= useState(state[dato])
    function modalHandler(e){
      setEditado(e)
    }
    function checkOkey(){
      setState({
        ...state,
        [dato]:editado
      })
    //   checkOk()
      setActive(false)
      
    }
    function exit(){
      setActive(false)
      
    }
    return (
        <View style={styles.containerModal}>
        <LinearGradient 
            colors={[ '#F8E9E9','#B9C7CA']}
            start={{x:1,y:0}}
            end={{x:0,y:1}}
            style={styles.modal}>
            <Text style={styles.textTitleModal} ></Text>
            <TextInput
                style={styles.textInputModal}
                onChangeText={(e) => modalHandler(e)}
                value={editado?.toString()}
                />
            <View style={styles.modalButtonsContainers}>
            <TouchableOpacity onPress={()=>checkOkey()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
            <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
            </View> 
        </LinearGradient>
        </View>
      
    )
  }

////////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
const MyBusiness=({route,navigation})=>{
    console.log("------------------------")
    console.log("Cuenta")
    const {user} = useAuth()
////////////////////////////////////////////////////
    const [apiDoc,setApiDoc] = useState(null)
   
    const [business,setBusiness] = useState({
        negocio:"",
        de:"",
        cbu:"",
        ubicacion:"",
        cuit:"",
        telefono:"",
    })
////////////////////////////////////////////////////
    const getMyBusinessApi = ()=>{
      const selectedDoc = doc(getFirestore(), "users/"+user.uid)
      getDoc(selectedDoc).then(res => setApiDoc(res.data()))
    }
    const postMyBusiness = ()=>{
      const selectedDoc = doc(getFirestore(), "users/"+user.uid)
      postFirestoreId(selectedDoc,{...apiDoc,myBusiness:{...business}})
    }  
    useEffect(()=>{
        getMyBusinessApi()
    },[])
    useEffect(()=>{
      if (apiDoc?.myBusiness){
        setBusiness({
          ...business,
          ...apiDoc.myBusiness
        })
      }  
  },[apiDoc])
////////////////////////////////////////////////////
    const [active, setActive] = useState(false)
    const [dato, setDato] = useState(null)
    const save = ()=>{
      postMyBusiness()
      navigation.navigate("Cuenta")
    }
    console.log("------------------------")
    return(
        <View style={styles.container}>
            {active&&<ModalEditar dato={dato} state={business}setState={setBusiness}setActive={setActive}checkOk={postMyBusiness}/>}
            <View style={{...styles.buttonContainer,width:width,height:height/2}}>
                <ButtonNav 
                  iconSelect={"storefront"}
                  buttonSize={100}/>
            <View style={{...styles.cotainerIcon,marginTop:25}}>
                    <Text style={styles.text}>Negocio: {business.negocio}</Text>
                    <Editar 
                        dato={"negocio"}
                        setDato={setDato}
                        setActive={setActive}
                        
                    />
                </View>
                <View style={styles.cotainerIcon}>
                    <Text style={styles.text}>De: {business.de}</Text>
                    <Editar
                        dato={"de"}
                        setDato={setDato}
                        setActive={setActive}
                        
                    />
                </View>
                
                <View style={styles.cotainerIcon}>
                    <Text style={styles.text}>Cuit: {business.cuit}</Text>
                    <Editar
                        dato={"cuit"}
                        setDato={setDato}
                        setActive={setActive}
                        
                    />
                </View>
                <View style={styles.cotainerIcon}>
                    <Text style={styles.text}>Cbu: {business.cbu}</Text>
                    <Editar
                        dato={"cbu"}
                        setDato={setDato}
                        setActive={setActive}
                        
                    />
                </View>
                <View style={styles.cotainerIcon}>
                    <Text style={styles.text}>Ubicacion: {business.ubicacion}</Text>
                    <Editar
                        dato={"ubicacion"}
                        setDato={setDato}
                        setActive={setActive}
                        
                    />
                </View>
                <View style={styles.cotainerIcon}>
                    <Text style={styles.text}>Telefono: {business.telefono}</Text>
                    <Editar
                        dato={"telefono"}
                        setDato={setDato}
                        setActive={setActive}
                    />
                </View>
                {(apiDoc?.myBusiness!==business)&&
                <TouchableOpacity
                    onPress={()=>save()}
                    style={{flexDirection:"row"}}
                  >
                  <ButtonNav 
                    iconSelect={"content-save"}
                    buttonSize={30}/>
                  <Text
                    style={{marginTop:5}}
                    >Guardar Cambios</Text>
                </TouchableOpacity>}
                
            </View>
       
        
            <View style={styles.buttonContainer}>
              <ButtonNav 
                functionNav={()=>navigation.navigate("Link-Profile-To-User")}
                iconSelect={"link-variant-plus"}
                buttonSize={100}
                buttonName={"Vincular Usuario"}/>
            </View>
       
           
        </View>
        
    );
}
const styles = StyleSheet.create({
    container:{
      marginTop:-35,
        height:height,
        width:width,
        flex:1,  
        flexWrap:'wrap',
    },
    buttom:{
        width: width/4,
        height: height/6,
    },
    buttonContainer:{
        marginTop:40,
        marginBottom:25,
        width: width/2,
        height: height/3,
        alignItems:"center",
        justifyContent: "center",
    },   
    text:{
        width:"60%",
        textAlign: "left",
    },
    cotainerIcon: {
        width: width*0.7,
        backgroundColor: '#fff',
        flexWrap:"wrap",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin:3,
        padding:2,
    },
    modalBackground:{
        width:width,
        height:height,
        
    },
    ///////////////////////
    // -----ModalEdit-----
      containerModal:{
        marginTop:25,
        zIndex: 10,
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalButtonsContainers:{
        
        width:width,
        justifyContent: 'space-around',
        flexDirection: 'row',
      },
      modal:{
        zIndex: 10,
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
      cotainerIconModal: {
        
        width: width*0.9,
        backgroundColor: '#fff',
        flexWrap:"wrap",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding:5,
        margin:10
      },
      cotainerTitleModal: {
        
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding:5,
        marginTop: 40,
      },
      textTitleModal : {
        
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',            
      } ,
      textModal : {
        
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',  
        width:"90%"          
      } ,
       textInputModal:{
        
        padding: 10,
        paddingStart:30,
        width:width*0.5,
        height:50,
        marginTop:20,
        borderBottomWidth:2,
        borderBottomColor:"#2C7DA0",
      },
    
})

export default MyBusiness

