////////////////////////////////////////////////////
import React, { useState } from "react";
import { ActivityIndicator, Dimensions, Alert, StyleSheet,TextInput,TouchableOpacity,View,Text,Modal, SafeAreaView} from "react-native";
////////////////////////////////////////////////////
import {useAuth} from '../../../context/authContext'
import {getFirestore, doc} from 'firebase/firestore';
import {putFirestore, deleteFirestore} from '../../../functions/apiFunctions'
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';
const {width, height} = Dimensions.get('window');
import ButtonNav from '../../Reutilizables/ButtonNav'
////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////
const Loading =()=>{
    return (
      <View style={[styles.Loading]}>
        <ActivityIndicator size="large" />
      </View>
    )
}
function ModalLoading(){
    return (
      <View style={styles.modalContainer}>
      <LinearGradient 
        colors={colorA}
        start={{x:1,y:0}}
        end={{x:0,y:1}}
        style={styles.modal}>
      <Loading/>
      </LinearGradient>
      </View>
    )
}

export default function ModificarVarios({estado,listaSeleccionados,setListaSeleccionados,listaCompleta,recargarLista,navigation}){
    const {userProfile} = useAuth()
    const [todos,setTodos]=useState(false)// check todos
    const [visible,setVisible]=useState(false)// modal on o off
    const [aumentar,setAumentar]=useState(true)// aumentar o bajar precios
    const [valor,setValor]=useState(0)// valor input
    const [listaFinalGuardada,setListaFinalGuardada]=useState(null)// lista modificada
    const [loading,setLoading]=useState(false)// Loading al guardar cambios
    
    function checkTodos(){
        if (!todos){
            setTodos(true)
            setListaSeleccionados(listaCompleta)
        }else{setTodos(false)
            setListaSeleccionados([])}
    }
    function listaFinal(){
        if(!valor){return}
        if(aumentar){
            return setListaFinalGuardada(listaSeleccionados.map(e=>e={...e,price:e.price+(e.price*(valor/100))}))
        }
        if(!aumentar){ 
            return setListaFinalGuardada(listaSeleccionados.map(e=>e={...e,price:e.price-(e.price*(valor/100))}))
        }
    }

    const putProducts = (data)=>{
        data.forEach(product=>{
            const selected = doc(getFirestore(), "users/"+userProfile+"/products", product.id)
            putFirestore(selected,product)
        });
    }
      
    function aplicar(){
        if (!valor){return}
        listaFinal()
        setValor(0)
        Alert.alert("Se aplicaron los cambios","Para confirmar los cambios presione el boton GUARDAR")
        
    }
    function salir(){
        setListaFinalGuardada(null)
        setValor(0)
        setVisible(false)
    }
    function guardar(){
        if (!listaFinalGuardada){return}
        setLoading(true)
        let productos = listaFinalGuardada
        setListaFinalGuardada(null)
        setValor(0)
        putProducts(productos)
        setTimeout(() => {recargarLista()
            setTodos(false)
            setListaSeleccionados([])
            setLoading(false)
            setVisible(false)
           Alert.alert("Cambios guardados")}, 1000);

    }

  
    return(
        <View style={styles.container}>
            {/* todos check() -------------------------------------*/}
             {estado&&
             <LinearGradient 
                colors={colorA}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={styles.buttonTodos}>
                <TouchableOpacity style={styles.buttonTodos} onPress={()=>checkTodos()}>
                    <Text style={styles.texto}>Todos</Text>
                    {!todos&&<Icons name="checkbox-blank-outline" size={26} color={'#212121'}/>}
                    {!!todos&&<Icons name="checkbox-outline" size={26} color={'green'}/>}
                </TouchableOpacity>
            </LinearGradient>}
            {/* Modificar boton() -------------------------------------*/}
            {!!listaSeleccionados.length&&
             <LinearGradient 
                colors={colorB}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={styles.buttonModificar}>
                <TouchableOpacity style={styles.buttonModificar} onPress={()=>setVisible(true)}>
                    <Text style={{...styles.texto,color:'white'}} >Modificar</Text>
                </TouchableOpacity>
            </LinearGradient>}
            <Modal visible={visible} animationType="slide">
            {loading&&<ModalLoading/>}
            <LinearGradient 
                colors={colorBackgroundModal}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={{width:width,height:height}}>
                <SafeAreaView style={{flex:1, width:width, height:height}}>
                    <View style={styles.cabezaModal}>
                        {/* Opciones aumentar bajar() -------------------------------------*/}
                        <View style={styles.container2}>               
                            <TouchableOpacity onPress={()=>setAumentar(true)}>
                                <LinearGradient 
                                    colors={!aumentar?colorA:colorB}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={styles.botonOpciones}><Text style={!!aumentar?{...styles.texto2, color:'white'}:styles.texto2}>Aumentar precios</Text>
                                </LinearGradient> 
                            </TouchableOpacity>      
                            
                            <TouchableOpacity onPress={()=>setAumentar(false)}>
                                <LinearGradient 
                                    colors={!!aumentar?colorA:colorB}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={styles.botonOpciones}><Text style={!aumentar?{...styles.texto2, color:'white'}:styles.texto2}>Bajar Precios</Text>
                                </LinearGradient> 
                            </TouchableOpacity>    
                        </View>
                        {/* entrada porcentaje() -------------------------------------*/}
                        <View style={styles.container3}>
                            <TextInput
                                style={styles.inputPorcentaje}
                                onChangeText={(e) =>setValor(e)}
                                value={valor}
                                placeholder="0"
                            />
                            <TouchableOpacity>
                            <LinearGradient 
                                    colors={[ '#F8E9E9','#B9C7CA']}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={styles.botonOpciones}>
                                    <Text style={styles.texto2}>%</Text>
                            </LinearGradient>  
                            </TouchableOpacity>
                        </View>
                        {/* button Aplicar() -------------------------------------*/}
                        <TouchableOpacity onPress={()=> aplicar()} style={styles.botonAplicar}>
                            <LinearGradient 
                                    colors={!valor?colorA:colorB}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={styles.botonOpciones}>
                                    <Text style={!valor?styles.texto2:{...styles.texto2, color:'white'}}>Aplicar</Text>
                            </LinearGradient> 
                        </TouchableOpacity>  
                        {/* button listaFinal() ---------------------------------*/}
                        <TouchableOpacity onPress={()=>console.log(listaFinalGuardada)}>
                            <LinearGradient 
                                    colors={!listaFinalGuardada?colorA:colorB}
                                    start={{x:1,y:0}}
                                    end={{x:0,y:1}}
                                    style={styles.botonOpciones}>
                                    <Text style={!valor?styles.texto2:{...styles.texto2, color:'white'}}>Ver Lista Final</Text>
                            </LinearGradient> 
                        </TouchableOpacity>
                        {/* NavBar() -------------------------------------------*/}
                        <View style = {styles.containerNavBar}>   
                            <ButtonNav 
                                functionNav={()=>salir()}
                                iconSelect={"delete-forever"}
                                buttonSize={30}
                                buttonName={"Salir"}/>
                            <ButtonNav 
                                functionNav={()=>navigation.navigate("MenuPrincipal")}
                                iconSelect={"home"}
                                buttonSize={30}
                                buttonName={"Home"}/>
                            <ButtonNav 
                                functionNav={()=>guardar()}
                                iconSelect={"content-save"}
                                buttonSize={30}
                                buttonName={"Guardar"}/>
                        </View>                  
                    </View>
                </SafeAreaView>
                </LinearGradient>
           </Modal>
       </View>
    )
}
const styles = StyleSheet.create({
    /* general() -----------*/
    container:{
        width:width*0.9,
        flexDirection:"row",
        justifyContent: 'space-between',
        paddingTop:5,
        paddingBottom:5,
    },
    texto:{
        marginRight:10,
        marginLeft:10,
        fontWeight: "bold",
        color:"#212121",
        textAlign:"center",
    },
    buttonTodos:{
        flexDirection:"row",
        alignItems:"center",
    },
    buttonModificar:{
        width:width*0.3,
        justifyContent:'center',
        borderRadius:15,
    },
    /* Modal() -----------*/
    cabezaModal:{
        borderBottomColor:'#eee',
        borderBottomWidth:3,
        flexDirection:"column",
        alignItems:"center",
        justifyContent: 'center',
        width:width, height:height,
    },
    texto2:{
        fontSize:20,
        fontWeight: "bold",
        color:"#212121",
        textAlign:"center",
    },
    botonOpciones:{
        marginTop:40,
        padding: 10,
        marginBottom: 40,
        alignItems:"center",
        textAlign: 'center',
        borderRadius:15,
    },
    /* Opciones aumentar bajar -------------------------------------*/
    container2: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    /* entrada porcentaje() -------------------------------------*/
    container3: {
        marginTop:5,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    inputPorcentaje: {
        marginTop:40,
        marginBottom: 40,
        textAlign: "center",
        width: 100,  
        backgroundColor:"#fff",
        borderRadius:15,
    },
    /* button Aplicar() -------------------------------------*/
    botonAplicar:{
        padding: 10,
        alignItems:"center",
        textAlign: 'center',
    },
    /* NavBar() -------------------------------------*/
    textNavBar : {
        textAlign: "center",
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',               
    } ,
    containerNavBar: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: 70,
         backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    /* Loading() -------------------------------------*/
    Loading: {
        flex: 1,
        justifyContent: "center"
    },
    modalContainer:{
        zIndex: 10,
        width: width,
        height: height,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

})
