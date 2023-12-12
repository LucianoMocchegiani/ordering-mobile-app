import React, { useEffect, useState } from "react";
import { ActivityIndicator,Dimensions,FlatList,StyleSheet,TextInput,TouchableOpacity,View,Text} from "react-native";
import CardProvider from "./Card-Provider";
import { LinearGradient } from 'expo-linear-gradient';
import {useAuth} from '../../context/authContext'
import {getFirestore, collection, getDocs} from 'firebase/firestore';
import {postFirestore} from '../../functions/apiFunctions'
const {width, height} = Dimensions.get('window');

const Loading =()=>{
  return (
    <View style={[styles.Loading]}>
      <ActivityIndicator size="large" />
    </View>
  )
}
const Providers= ({navigation}) => {
  console.log("------------------------")
  console.log("Providers")
  const {userProfile,userPermissions} = useAuth()
  const [providersApi,setProvidersApi]= useState(null)
  const peticion =  ()=>{
    const selectedC = collection(getFirestore(), "users/"+userProfile+"/providers")
      getDocs(selectedC)
      .then(res => setProvidersApi(res.docs.map(provider=>({id:provider.id,...provider.data()}))))
  }
  useEffect(() => {
    peticion()
  },[])

  /////////////////////////////////////////////////////
  const addProvider = ()=>{
    const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/Providers")
    postFirestore(selectedCollection)
  }
  /////////////////////////////////////////////////////
  let arrayAMostrar = providersApi;
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  //Funcion Busqueda Nombre
  function filtroName(array, search, attibute) {
    if (!array){return} 
    return array.filter(
      (e) =>
        e[attibute] && e[attibute].toLowerCase().includes(search.toLowerCase())
    );
  }
  const [filterBySearch, setFilterBySearch] = useState("");
  let filtro = filtroName(arrayAMostrar, filterBySearch, "identifier");
  const filtroBusqueda = function (e) {
    setFilterBySearch(e);
  };
  if (filterBySearch !== "") {
    arrayAMostrar = filtro;
  }
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  /////////////////////////////////////////////////////
  const [IdSelect, setIdSelect] = useState(null);
 
  const onPressHandler=(params)=>{
    setIdSelect(params.id)
    navigation.navigate("Provider-info",{...params})
  }
  
  /////////////////////////////////////////////////////
  console.log("------------------------")
    return (
      <LinearGradient 
                colors={[ '#F1F4F4','#DADEDF']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={{width:width,height:height}}>
        <View style={styles.container}>
          <View style={styles.caja}>
            <TextInput
            style={styles.textInput}
            onChangeText={(e) => filtroBusqueda(e)}
            value={filterBySearch}
            placeholder="Buscar provedor..."
            />
            {userPermissions.modifyProviders?<TouchableOpacity onPress={()=>navigation.navigate("Add-providers")}>
            <LinearGradient 
              colors={['#206593','#25EADE']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={styles.button}> 
              <Text style = {styles.textButton}>Agregar provedor</Text>
            </LinearGradient>
            </TouchableOpacity>:null}
            <View style={{
              marginVertical:10,
              paddingHorizontal:10,
              width:width*0.9,
              flexDirection:"row",
              justifyContent:"space-between"
            }}>
              <Text>Provedor</Text>
              <Text>Telefono</Text>
              <Text>Direccion</Text>
            </View>
          </View>
          {!providersApi?<Loading/>:
          <FlatList
            data={arrayAMostrar}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() => onPressHandler(item)}>
                  <CardProvider
                    key={item.id}
                    id={item.id}
                    nombre={item.identifier}
                    telefono={item.phone}
                    direccion={item.location}
                  />
                </TouchableOpacity>
              );
            }}
          />
        }
        </View>
      </LinearGradient>
    );
  
};
const styles = StyleSheet.create({
  container:{
    marginTop:-35,
    flex:1,
    alignItems:"center",
  },
  caja:{
    width:width,
    paddingTop:30,
    alignItems:"center",
  },
  textInput:{
    padding: 10,
    paddingStart:30,
    width:width*0.5,
    height:50,
    marginTop:20,
    borderRadius:30,
    backgroundColor:"#fff",
  },
  Loading: {
    flex: 1,
    justifyContent: "center"
  },
  button: {
    width: width*0.45,
    alignItems: 'center',
    padding:5,
    margin:10,
    borderRadius:15
  },
  textButton : {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',  
    width:"90%",
    textAlign:"center"

  } ,
})


export default Providers;
