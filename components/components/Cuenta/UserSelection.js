import {useState, useEffect} from 'react'
import {getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc, addDoc} from 'firebase/firestore';
import { Alert,TextInput,View, Text, TouchableOpacity, FlatList,Dimensions,StyleSheet} from 'react-native';
import {postFirestore} from '../../functions/apiFunctions'
import {useAuth} from '../../context/authContext'
import ModalInput from '../Reutilizables/ModalInput'
import BarCode from '../BarCode/BarCode'
import Loading from '../../functions/Loading'

////////////////////////////////////////////////////
import { Icon } from 'react-native-gradient-icon';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import ButtonNav from '../Reutilizables/ButtonNav'


////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////
const {width, height} = Dimensions.get('window');


const UserSelection = ({navigation})=>{
    console.log("------------------------")
    console.log("UserSelection")
   
    const [codeUser, setCodeUser] = useState("")
    const [modal,setModal]=useState(false)
    const [barCodeActive,setBarCodeActive]= useState(false)


    const selectCode = (value)=>{
        setCodeUser(value)
        navigation.navigate("Link-Profile-To-User",{userCode:value})
        
    }
    // navigation.navigate("Ventas",{idClient:id})
    // const idClient = route.params? route.params.idClient: null
    
    console.log("------------------------")
    return (
        <>
        {barCodeActive&&<BarCode codeFunction={selectCode}setActive={setBarCodeActive}/>}
        {modal? <ModalInput inputValueStr={codeUser}setStateModal={setModal} functionCheckOk={selectCode}/>:
        <View style={styles.container}>
             
            <TouchableOpacity 
                onPress={()=>setModal(true)}
                >
                <LinearGradient 
                    colors={colorB}
                    start={{x:1,y:0}}
                    end={{x:0,y:1}}
                    style={{...styles.button,marginTop:"25%",marginTop:"25%",...styles.containerOption}}>
                    <Text style={{color:"#fff",fontWeight:"bold"}}>Codigo: {codeUser}</Text>
                    <Icons name="chevron-right" color="#fff" size={26}/>
                </LinearGradient>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>setBarCodeActive(true)}
                iconSelect={"qrcode-scan"}
                buttonSize={100}
                buttonName={"Escanea el QR"}/>
            </View>
          
        </View> }
        </>
    )
}
export default UserSelection ;

const styles = StyleSheet.create({
    container:{
        marginTop:-35,
      width:width,
      height:height,
      flex:1,
      alignItems:"center",
    },

    containerOption: {
        width: width*0.7,
        backgroundColor: '#fff',
        flexWrap:"wrap",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin:3,
        padding:2,
    },
    button:{
        marginTop:"15%",
        marginBottom:"15%"
    }

    
})