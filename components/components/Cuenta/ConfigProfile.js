import {useState, useEffect} from 'react'
import {getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc, addDoc} from 'firebase/firestore';
import { Alert,TextInput,View, Text, TouchableOpacity, FlatList,Dimensions,StyleSheet} from 'react-native';
import {postFirestore} from '../../functions/apiFunctions'
import {useAuth} from '../../context/authContext'
import ModalInput from '../Reutilizables/ModalInput'

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


const ConfigProfile = ({navigation})=>{
    console.log("------------------------")
    console.log("ConfigProfile")
    const {user} = useAuth()
    const [permissions, setPermissions] = useState({
        name:"",
        modifyProducts: false,
        modifyClients:false,
        modifyProviders:false,
        modifySales:false,
        modifyBuys:false,
        accessToStatistics:false,
        accessToBuys:false,
        accesToProviders:false,
        uidEntry:user.uid,
        from:user.email
    })
    const postProfileForUsers = (data)=>{
        const selectedCollection = collection(getFirestore(), "users/"+user.uid+"/profilesForUsers")
        postFirestore(selectedCollection,data)
    }
    const checkOk=(key)=>{
        setPermissions({
           ...permissions,
           [key]:true
        })
    }
    const checkNull=(key)=>{
        setPermissions({
            ...permissions,
            [key]:false
         })
    }
    const completedProfile = ()=>{
        if(permissions.name){
            postProfileForUsers(permissions)
            Alert.alert("Perfil Agregado")
            navigation.navigate("MyBusiness")
        }else{Alert.alert("Complete los campos")}
    }
    const [modal,setModal]=useState(false)
    const changeName=(value)=>{
        setPermissions({
            ...permissions,
            name:value
        })
    }
    console.log("------------------------")
    return (
        <>
        {modal? <ModalInput inputValueStr={permissions.name}setStateModal={setModal} functionCheckOk={changeName}/>:
        <View style={styles.container}>
             
            <TouchableOpacity 
                onPress={()=>setModal(true)}
                >
                <LinearGradient 
                    colors={colorB}
                    start={{x:1,y:0}}
                    end={{x:0,y:1}}
                    style={{...styles.button,marginTop:"25%",marginTop:"25%",...styles.containerOption}}>
                    <Text style={{color:"#fff",fontWeight:"bold"}}>Perfil: {permissions.name}</Text>
                    <Icons name="chevron-right" color="#fff" size={26}/>
                </LinearGradient>
            </TouchableOpacity>
    
            <View style={styles.containerOption}>
                <Text>Modificar Productos</Text>
                {permissions.modifyProducts?
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("modifyProducts")}><Icons name="checkbox-marked" size={35} color="green"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("modifyProducts")}><Icons name="close-box" size={35} color="gray" /></TouchableOpacity> 
                </View>:
                 <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("modifyProducts")}><Icons name="checkbox-marked" size={35} color="gray"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("modifyProducts")}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
                </View>
                }
            </View>
            <View style={styles.containerOption}>
                <Text>Modificar Clientes</Text>
                {permissions.modifyClients?
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("modifyClients")}><Icons name="checkbox-marked" size={35} color="green"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("modifyClients")}><Icons name="close-box" size={35} color="gray" /></TouchableOpacity> 
                </View>:
                 <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("modifyClients")}><Icons name="checkbox-marked" size={35} color="gray"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("modifyClients")}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
                </View>
                }
             </View>
            <View style={styles.containerOption}>
                <Text>Modificar Provedores</Text>
                {permissions.modifyProviders?
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("modifyProviders")}><Icons name="checkbox-marked" size={35} color="green"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("modifyProviders")}><Icons name="close-box" size={35} color="gray" /></TouchableOpacity> 
                </View>:
                 <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("modifyProviders")}><Icons name="checkbox-marked" size={35} color="gray"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("modifyProviders")}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
                </View>
                }
            </View>
            <View style={styles.containerOption}>
                <Text>Modificar Ventas</Text>
                {permissions.modifySales?
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("modifySales")}><Icons name="checkbox-marked" size={35} color="green"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("modifySales")}><Icons name="close-box" size={35} color="gray" /></TouchableOpacity> 
                </View>:
                 <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("modifySales")}><Icons name="checkbox-marked" size={35} color="gray"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("modifySales")}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
                </View>
                }
            </View>
            <View style={styles.containerOption}>
                <Text>Modificar Compras</Text>
                {permissions.modifyBuys?
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("modifyBuys")}><Icons name="checkbox-marked" size={35} color="green"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("modifyBuys")}><Icons name="close-box" size={35} color="gray" /></TouchableOpacity> 
                </View>:
                 <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("modifyBuys")}><Icons name="checkbox-marked" size={35} color="gray"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("modifyBuys")}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
                </View>
                }
            </View>
            <View style={styles.containerOption}>
                <Text>Acceso a las estadisticas</Text>
                {permissions.accessToStatistics?
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("accessToStatistics")}><Icons name="checkbox-marked" size={35} color="green"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("accessToStatistics")}><Icons name="close-box" size={35} color="gray" /></TouchableOpacity> 
                </View>:
                 <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("accessToStatistics")}><Icons name="checkbox-marked" size={35} color="gray"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("accessToStatistics")}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
                </View>
                }
            </View>
            <View style={styles.containerOption}>
                <Text>Acceso a las compras</Text>
                {permissions.accessToBuys?
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("accessToBuys")}><Icons name="checkbox-marked" size={35} color="green"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("accessToBuys")}><Icons name="close-box" size={35} color="gray" /></TouchableOpacity> 
                </View>:
                 <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("accessToBuys")}><Icons name="checkbox-marked" size={35} color="gray"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("accessToBuys")}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
                </View>
                }
            </View>
            <View style={styles.containerOption}>
                <Text>Acceso a los provedores</Text>
                {permissions.accesToProviders?
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("accesToProviders")}><Icons name="checkbox-marked" size={35} color="green"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("accesToProviders")}><Icons name="close-box" size={35} color="gray" /></TouchableOpacity> 
                </View>:
                 <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={()=>checkOk("accesToProviders")}><Icons name="checkbox-marked" size={35} color="gray"/></TouchableOpacity> 
                    <TouchableOpacity onPress={()=>checkNull("accesToProviders")}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
                </View>
                }
            </View> 
            <View style={{marginTop:25,}}>
                <ButtonNav 
                    functionNav={()=>completedProfile()}
                    iconSelect={"content-save-check"}
                    buttonSize={100}
                    buttonName={"Crear Profile"}/>
            </View>
            
        
        </View> }
        </>
    )
}
export default ConfigProfile;

const styles = StyleSheet.create({
    container:{
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