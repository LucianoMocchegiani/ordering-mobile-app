import {useState, useEffect, } from 'react'
import {getFirestore, collection, getDocs, doc, getDoc, setDoc, deleteDoc, addDoc} from 'firebase/firestore';
import {Dimensions,FlatList,StyleSheet,TextInput,TouchableOpacity,View,Text,BackHandler,Alert} from "react-native";
import {postFirestoreId} from '../../functions/apiFunctions'
import {useAuth} from '../../context/authContext'
import Loading from '../../functions/Loading'
import { LinearGradient } from 'expo-linear-gradient';
import { Icon } from 'react-native-gradient-icon';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';



const {width, height} = Dimensions.get('window');
function Modal({stateModal,navigation,getProfilesApi}){
    const {user} = useAuth()
    const [name, setName]=useState(null)
    const postMyBusinessProfile = (name)=>{
        const selectedCollection = doc(getFirestore(), "users/"+user.uid+"/myProfiles/"+user.uid)
        postFirestoreId(selectedCollection,{name:name,uidEntry:user.uid})     
    }   
        
    function modalHandler(e){
      setName(e)
    }
    function checkOk(){
      postMyBusinessProfile(name)
      stateModal(false)
      getProfilesApi()
      navigation.navigate("LoadingScreen",{destiny:"MyProfiles"})
    }
    function exit(){
      stateModal(false)
    }
    return (
      <View style={styles.modalContainer}>
      <LinearGradient 
        colors={[ '#F8E9E9','#B9C7CA']}
        start={{x:1,y:0}}
        end={{x:0,y:1}}
        style={styles.modal}>
        <Text style={styles. textTitle} ></Text>
        <TextInput
              style={styles.textInput}
              onChangeText={(e) => modalHandler(e)}
              value={name?.toString()}
            />
        <View style={styles.modalButtonsContainers}>
          <TouchableOpacity onPress={()=>checkOk()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
          <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
        </View> 
      </LinearGradient>
      </View>
    )
  }
const MyProfiles=({route,navigation})=>{
    console.log("------------------------")
    console.log("MyProfiles")
    
    const {user,changedProfile} = useAuth()
    const [modal,setModal]= useState(false)

    const [myProfilesApi,setMyProfilesApi]= useState(null)
    const getProfilesApi = ()=>{
      const selectedCollection= collection(getFirestore(), "users/"+user.uid+"/myProfiles")
        getDocs(selectedCollection).then(res => setMyProfilesApi(res.docs.map(profile=>({id:profile.id,...profile.data()}))))
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ' + error.message);
        })
    }



    // useEffect(() => {
    //   const backAction = () => {
    //     // Alert.alert('Hold on!', 'Are you sure you want to go back?', [
    //     //   {
    //     //     text: 'Cancel',
    //     //     onPress: () => null,
    //     //     style: 'cancel',
    //     //   },
    //     //   {text: 'YES', onPress: () => BackHandler.exitApp()},
    //     // ]);
    //     BackHandler.exitApp()
    //     return true;
    //   };
    //   const backHandler = BackHandler.addEventListener(
    //     'hardwareBackPress',
    //     backAction,
    //   );
  
    //   return () => backHandler.remove();
    // }, []);


    const unsubscribe = navigation.addListener('beforeRemove', e => {
      if(navigation.getState().index==2){
        BackHandler.exitApp()
        e.preventDefault();
      }
      
      
      
      // unsubscribe anula la navegacion volver
    });
    useEffect(() => {
      unsubscribe()
      getProfilesApi()
    },[navigation])

    const [hasProfile,setHasProfile]= useState([1])
    //limitando los perfiles a crear
    useEffect(() => {
        setHasProfile(myProfilesApi? myProfilesApi.filter((e) => e.id && e.id.includes(user.uid)):[1])
    },[myProfilesApi])
    let dataRender = myProfilesApi
    ////////////////////////////////////////////////////////////////////
  
    ////////////////////////////////////////////////////////////////////
        
   
    return( 
        <View style={styles.container}>
        {modal&&<Modal stateModal={setModal} navigation={navigation} getProfilesApi={getProfilesApi}/>}
        <Text style={{
            marginTop:"15%",
            fontSize: 25,
            fontWeight:"bold",}
        }>Perfiles de Negocio</Text>
        {hasProfile.length?null:<TouchableOpacity  onPress={() => setModal(true)}>
                <LinearGradient 
                  colors={[ '#F8E9E9','#B9C7CA']}
                  start={{x:1,y:0}}
                  end={{x:0,y:1}}
                  style={styles.cardProfile}>
                  <Icons style={{marginLeft:"30%"}} name="plus-box" size={100} color="black" />
                  <Text style={{
                    fontSize: 16,
                    fontWeight:"bold",
                    }}>Crea tu Perfil de Negocio
                  </Text>
                </LinearGradient>
            </TouchableOpacity>}
        {!myProfilesApi?<Loading/>:
        <FlatList
            style={styles.flatList}
            data={dataRender}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
            return (
                
                <TouchableOpacity
                    onPress={() => {
                        changedProfile(item.uidEntry,item)
                        navigation.navigate("MenuPrincipal")
                    }}>
                    <LinearGradient 
                        colors={[ '#206593','#25EADE']}
                        start={{x:1,y:0}}
                        end={{x:0,y:1}}
                        style={styles.cardProfile}>
                        <Text style={styles.text} >{item.name}</Text>
                        {item.from&&<Text style={{...styles.text, fontSize: 16}} >de: {item.from}</Text>}
                    </LinearGradient>
                
                </TouchableOpacity>
            );
            }}
        />
        }
          
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
      marginTop:-35,
      width:width,
      height:height,
      flex:1,
      alignItems:"center",
    },
    cardProfile:{
        width:width*0.6,
        height:height*0.2,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:25,
        marginTop:10,
    },
    text:{
        color: "white",
        fontSize: 25,
        fontWeight:"bold",
        
    },
    modalButtonsContainers:{
        width: '100%',
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
        paddingStart:30,
        width:width*0.5,
        height:50,
        marginTop:20,
        borderBottomWidth:2,
        borderBottomColor:"#2C7DA0",
      },
    
})
export default MyProfiles
