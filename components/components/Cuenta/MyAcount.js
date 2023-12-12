import {useEffect} from 'react'
import {useAuth} from '../../context/authContext'
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import { Icon } from 'react-native-gradient-icon';
// import QrGenerator from '../../functions/QrGenerator'
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';

import ButtonNav from '../Reutilizables/ButtonNav'


const copyToClipboard = async (value) => {
    await Clipboard.setStringAsync(value);
  };
const {width, height} = Dimensions.get('window');
const iconSize= 100;

const MyAcount=({navigation})=>{
    console.log("------------------------")
    console.log("MyAcount")
    const {user,loading} = useAuth()
  
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
            <View style={{...styles.buttonContainer,width:width}}>
                <ButtonNav 
                    iconSelect={"account-box"}
                    buttonSize={100}/>
                <Text style={styles.text}>{user.email}</Text>
            </View>
            <View style={styles.container2}>
                <View style={styles.buttonContainer}>
                    <Text style={{...styles.text,marginBottom:10}}>Codigo de Usuario:</Text>
                    <Text 
                        style={{...styles.text,width:"80%",marginBottom:15}}
                        ellipsizeMode="tail"
                        numberOfLines={1}
                    >{user.uid}</Text>
                    <View style={{
                        width: width/2,
                        flexDirection:"row",
                        justifyContent:"space-around"}}>
                        <ButtonNav 
                            functionNav={()=>{copyToClipboard(user.uid)}}
                            iconSelect={"share"}
                            buttonSize={30}
                            buttonName={"Compartir"}/>
                        <ButtonNav 
                            functionNav={()=>{copyToClipboard(user.uid)}}
                            iconSelect={"content-copy"}
                            buttonSize={30}
                            buttonName={"Copiar"}/>
            
                    </View>
                </View>                   

        

                <View style={styles.buttonContainer}>
                </View>

                <View style={styles.buttonContainer}>
                    {/* <QrGenerator value={user.uid} size={170}/> */}
                </View>


                
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        marginTop:-35,
        width:width,
        height:height,
        flex:1,  
        flexWrap:"wrap", 
    },
    container2:{
        width:width,
        flex:1,  
        flexWrap:"wrap",   
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
        textAlign:"center",
        width:"100%",
    }
})

export default MyAcount


