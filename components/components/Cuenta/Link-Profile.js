import {useState, useEffect} from 'react'
import {getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc, addDoc} from 'firebase/firestore';
import { Alert,TextInput,View, Text, TouchableOpacity, FlatList,Dimensions,StyleSheet} from 'react-native';
import {postFirestore} from '../../functions/apiFunctions'
import {useAuth} from '../../context/authContext'
import Loading from '../../functions/Loading'


////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const ModalSetting = ({setStateModal})=>{
    const {user} = useAuth()
    const postProfileForUsers = (data)=>{
        const selectedCollection = collection(getFirestore(), "users/"+user.uid+"/profilesForUsers")
        postFirestore(selectedCollection,data)
    }
    const functionCheckOk=()=>{
        if(name){
            postProfileForUsers({name:name,config:config, uidEntry:user.uid, from:user.email})
            Alert.alert("Perfil Agregado")
            setStateModal(false)
        }else{Alert.alert("Complete los campos")}
    }
    function checkOk(){
        functionCheckOk()
    }
    function exit(){
          setStateModal(false)
    }
    const [name,setName]= useState(null)
    const [config,setConfig] = useState("Admin")
  
    useEffect(()=>{
        console.log(name)
    },[name])
    return (
        <View style={styles.modalContainer}>
        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.modal}>
          <Text style={{...styles.textTitle,marginTop:30}}>mensaje</Text>
          <View style={styles.modalButtonsContainers}>
          <TextInput
              style={styles.textInput}
              onChangeText={(e) => setName(e)}
              value={name}
              placeholder="Buscar..."
              />
            <TouchableOpacity onPress={()=>checkOk()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
            <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
          </View> 
        </LinearGradient>
        </View>
    )
}
const LinkProfileToUser=({navigation,route})=>{
    console.log("------------------------")
    console.log("LinkProfileToUser")
    const {user} = useAuth()
    const[profileSettings,setProfileSettings]= useState(null)
    const [userCode, setUserCode] = useState(null)
    useEffect( ()=>{
        if(route.params){
            setUserCode(route.params.userCode)
        }
    },[route.params])
    const [valideCode,setValideCode]= useState(null)
    useEffect(()=>{
        if (userCode){getUserExist(userCode)}
    },[userCode])
    ////////////////////////////////////////////////////////////////////
    const [profileSelected,setProfileSelected]=useState(null)
    ////////////////////////////////////////////////////////////////////
    const[modalSettingVisible,setModalSettingVisible] = useState(false)
    ////////////////////////////////////////////////////////////////////

    const getProfilesSettingsApi = ()=>{
        const selectedCollection = collection(getFirestore(), "users/"+user.uid+"/profilesForUsers")
        getDocs(selectedCollection).then(res => setProfileSettings(res.docs.map(profileSetting=>({id:profileSetting.id,...profileSetting.data()}))))
    }
    const getUserExist = async (uid)=>{
        //controla si el codigo de usuario existe
        const selectedDoc= doc(getFirestore(), "users/"+uid)
        await getDoc(selectedDoc)
        .then(res=>{setValideCode(res._document?res._document:"null")})
        .catch(err => {setValideCode("null")})
    }
    useEffect(()=>{
        getProfilesSettingsApi()  
    },[route])
    let dataRender = profileSettings;
    ////////////////////////////////////////////////////////////////////
    const postLinkProfile = (data,uid)=>{
        const selectedCollection = collection(getFirestore(), "users/"+uid+"/myProfiles")
        postFirestore(selectedCollection,data)
        const selectedCollection2 = collection(getFirestore(), "users/"+user.uid+"/linkedProfiles")
        const selectedDoc= doc(getFirestore(), "users/"+uid)
        getDoc(selectedDoc).then(res=>postFirestore(selectedCollection2,{...data,uidLinked:uid,identifierLinked:(res.data().identifier) }))
    }   
    console.log("------------------------")
    ////////////////////////////////////////////////////////////////////
    // postLinkProfile(profileSelected,code)
    return( 
        <View style={styles.container}>
            {modalSettingVisible&&<ModalSetting setStateModal ={setModalSettingVisible}/>}
            <Text style={{fontWeight: 'bold',...styles.cotainerText,marginTop:"20%",textAlign:"center"}}>Perfiles Configurados</Text>
            <View style={styles.containerList}>
                <Text style={{textAlign:"center",marginBottom:5}}>selecciona un perfil para vincularlo</Text>
            {!profileSettings?<Loading/>:
            <FlatList
               
                data={dataRender}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                return (
                    // <TouchableOpacity
                    // onPress={() => setProfileSelected(item)}>
                    // <Text>{item.name}</Text>
                    // </TouchableOpacity>
                       <>
                       <TouchableOpacity 
                            onPress={() => setProfileSelected(item)}
                            onLongPress={()=> setProfileSelected(item)}
                        >
                       {profileSelected==item?<LinearGradient 
                            colors={[  '#206593','#25EADE']}
                            start={{x:1,y:0}}
                            end={{x:0,y:1}}
                            style={{height:40,marginBottom:5,justifyContent:"center"}}>
                            <Text style={{textAlign:"center",color:"#fff",fontWeight:"bold"}}>{item.name}</Text>
                       </LinearGradient>:
                       <LinearGradient 
                            colors={[ '#F8E9E9','#B9C7CA']}
                            start={{x:1,y:0}}
                            end={{x:0,y:1}}
                            style={{height:40,marginBottom:5,justifyContent:"center"}}>
                            <Text style={{textAlign:"center"}}>{item.name}</Text>
                     </LinearGradient>}
                       </TouchableOpacity>
                     </>
                );
                }}
            />
            }
            </View>
            <TouchableOpacity 
                onPress={()=>navigation.navigate("ConfigProfile")}
                >
                
                <View style={styles.cotainerText}>
                    <Text style={styles.textSelect}>Configurar Un Perfil</Text>
                    <Icons name="chevron-right" color="#555" size={26}/>
                </View>
                
            </TouchableOpacity>
            <TouchableOpacity 
                style={{marginBottom:"12%"}}
                onPress={()=>{navigation.navigate("UserSelection")}}
                >
                <View style={styles.cotainerText}>
                <Text style={styles.textSelect}>Selecciona el usuario a vincular</Text>
                    <Icons name="chevron-right" color="#555" size={26}/>
                </View>
            </TouchableOpacity>    
            <Text style={{marginBottom:"3%",textAlign:"left",width: width*0.9,}}>Usuario: {userCode?userCode:'"seleccione usuario"'}</Text>
            {valideCode=="null"&&<Text style={{marginBottom:"3%",textAlign:"left",width: width*0.9,color:"red"}}>*El usuario no existe</Text>}
            <Text style={{marginBottom:"10%",textAlign:"left",width: width*0.9,}}>Perfil: {profileSelected?profileSelected.name:'"seleccione perfil"'}</Text>
            

                {(profileSelected&&(valideCode&&valideCode!="null"))?
                <TouchableOpacity
                    onPress={()=>postLinkProfile(profileSelected,userCode)}>
                    <LinearGradient 
                                    colors={[  '#206593','#25EADE']}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={{borderRadius:20,width: width*0.9,height:40,marginBottom:5,justifyContent:"center"}}>
                                    <Text style={{textAlign: 'center',color:"#fff",fontWeight:"bold",width: width*0.9}}>Vincular</Text>
                    </LinearGradient>
                </TouchableOpacity>:
                <TouchableOpacity>
                    <LinearGradient 
                                    colors={[ '#F8E9E9','#B9C7CA']}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={{borderRadius:20,width: width*0.9,height:40,marginBottom:5,justifyContent:"center"}}>
                                    <Text style={{textAlign: 'center',width: width*0.9,color:"#fff"}}>Vincular</Text>
                    </LinearGradient>
                </TouchableOpacity>}
                
            
        </View>    
    ) 
}
export default LinkProfileToUser
const styles = StyleSheet.create({
    container:{
        marginTop:-35,
      width:width,
      height:height,
      flex:1,
      alignItems:"center",
    },

    // ---------Modal--------------
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
      modalButtonsContainers:{
          width: '100%',
          justifyContent: 'space-around',
          flexDirection: 'row',
      },
      modalContainer:{
        marginTop:25,
        zIndex: 10,
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      textTitle : {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',            
      } ,
      textInput:{
        padding: 10,
        paddingStart:10,
        width:width*0.5,
        height:50,
        marginTop:20,
        borderRadius:30,
        backgroundColor:"#fff",
      },
      cotainerText: {
        width: width*0.9,
        backgroundColor: '#fff',
        flexWrap:"wrap",
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin:3,
        padding:2,
    },
    containerList:{
        backgroundColor: "#fff",
        width: width*0.9,
        height:height*0.5,

    },
    textSelect:{
        fontWeight: 'bold',
    }
    
})