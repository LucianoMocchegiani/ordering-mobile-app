import {useEffect} from 'react'
import {useAuth} from '../../context/authContext'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Icon } from 'react-native-gradient-icon';

import ButtonNav from '../Reutilizables/ButtonNav'


const {width, height} = Dimensions.get('window');
const iconSize= 100;
const Cuenta=({navigation})=>{
    console.log("------------------------")
    console.log("Cuenta")
    const {user, logout, loading} = useAuth()
    const handleLogout = async ()=>{
        await logout()
        navigation.navigate("Login")
    }
    /////////Protected Screen
    useEffect(() => {
        if(loading){
            return (
              <View style={{flex:1, justifyContent: 'center',alignItems: 'center'}}>
                  <Text style={{color:"black"}}>Cargando...</Text>
              </View>
            )
        }
        if (!user){
            return navigation.navigate("Login")
        }
    },[])
    /////////Protected Screen
    console.log("------------------------")

    return(
        <View style={styles.container}>
       
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>navigation.navigate("MyAcount")}
                iconSelect={"account-box"}
                buttonSize={100}
                buttonName={"Mi cuenta"}/>
            </View>
         
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>navigation.navigate("MyBusiness")}
                iconSelect={"storefront"}
                buttonSize={100}
                buttonName={"Mi Negocio"}/>
            </View>
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>navigation.navigate("MyProfiles")}
                iconSelect={"account-convert"}
                buttonSize={100}
                buttonName={"Mis Perfiles"}/>
            </View>
  
            <View style={styles.buttonContainer}>
            </View>
            
            <View style={styles.buttonContainer}>
            </View>
       
            <View style={styles.buttonContainer}>
            <ButtonNav 
                functionNav={()=>handleLogout()}
                iconSelect={"logout"}
                buttonSize={100}
                buttonName={"Logout"}/>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        marginTop:-35,
        width:width,
        flex:1,  
        flexWrap:'wrap',
    },
    buttom:{
        width: width/4,
        height: height/6,
    },
    buttonContainer:{
        width: width/2,
        height: height/3,
        alignItems:"center",
        justifyContent: "center",
    },   
    text:{
        width:"100%",
        textAlign: "center",
    },
})

export default Cuenta