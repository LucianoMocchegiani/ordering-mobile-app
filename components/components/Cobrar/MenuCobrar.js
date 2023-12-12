////////////////////////////////////////////////////
import React, {useEffect, useState } from "react";
import {Dimensions, FlatList, Alert, StyleSheet,TextInput,TouchableOpacity,View,Text,} from "react-native";
////////////////////////////////////////////////////
import {useAuth} from '../../context/authContext'
import {getFirestore,getDocs, collection,doc,Timestamp} from 'firebase/firestore';
import {postFirestore,putFirestore} from '../../functions/apiFunctions'
////////////////////////////////////////////////////
////////////////////////////////////////////////////
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-gradient-icon';
import { LinearGradient } from 'expo-linear-gradient';
////////////////////////////////////////////////////
////////////////////////////////////////////////////
import BarCodeIcon from '../BarCode/BarCodeIcon'
import BarCode from '../BarCode/BarCode'
import ModalConfirmation from '../Reutilizables/Modales'
////////////////////////////////////////////////////
////////////////////////////////////////////////////
const {width, height} = Dimensions.get('window');
////////////////////Colors//////////////////////////
const iconSize= 50;
const colorA = [ '#F8E9E9','#B9C7CA'] 
const colorB =[ '#206593','#25EADE']
const colorBackgroundModal=[ '#F1F4F4','#DADEDF']
const iconColorA="#206593"
const iconColorB="#25EADE"
////////////////////////////////////////////////////
import CardProducto from './Card-Product-In-Cart'
import ButtonNav from '../Reutilizables/ButtonNav'




const WayToPay = ({setStateModal, functionCheckOk})=> {
    const wayToPay=["Efectivo","Debito","Credito","Transferencia"]
    const [pay,setPay] = useState(null)
    function checkOk(){
        functionCheckOk(pay)
        setStateModal(false)
    }
    function exit(){
        setStateModal(false)
    }
    return (
        <View style={styles.modalContainer}>
        <LinearGradient 
          colors={colorA}
          start={{x:1,y:0}}
          end={{x:0,y:1}}
          style={styles.modal}>
          <Text style={{...styles.textTitle,marginTop:30,marginBottom:20}}>Selecciona una forma de pago</Text>
          <FlatList
                    data={wayToPay}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => {
                    return (
                        <View>    
                            <TouchableOpacity style={{margin:5}}onPress={()=>{setPay(item)}}>
                               <Text style={pay===item?{color:"black", fontWeight:"bold"}:{}}>{item}</Text>
                            </TouchableOpacity>
                        </View>   
                    );
                }}
                />
          <View style={styles.modalButtonsContainers}>
            <TouchableOpacity onPress={()=>checkOk()}><Icons name="checkbox-marked" size={35} color="green" /></TouchableOpacity> 
            <TouchableOpacity onPress={()=>exit()}><Icons name="close-box" size={35} color="red" /></TouchableOpacity> 
          </View> 
        </LinearGradient>
        </View>
    )
}
export default function MenuCobrar({route,navigation}){
    console.log("------------------------")
    console.log("MenuCobrar")
    const {userProfile} = useAuth()
    /////////////////////////////////////////////////////
    function existe(arrayDeObjetos,atributo,valor){
        for(let i=0;i<arrayDeObjetos.length;i++){
          if(arrayDeObjetos[i][atributo]===valor){
            return true
          }
        }
        return false
    }
    /////////////////////////////////////////////////////
    const[shopingCart,setShopingCart]=useState([]);
    const[shopingCartSave,setShopingCartSave]=useState([]);
    const[total,setTotal]= useState(0.00);
    const[venta,setVenta]= useState([])
    
    /////////////////////////////////////////////////////
    useEffect(() => {
        if (route.params?.products) {
            if(!existe(shopingCart,"id",route.params?.products.id)){
                setShopingCart([...shopingCart,route.params.products])
                setShopingCartSave([...shopingCartSave,route.params.products])
            }
        }
    }, [route.params?.products]);
   
    /////////////////////////////////////////////////////
    //////////////////////////registar///////////////////
    /////////////////////////////////////////////////////
    useEffect(() => {
        sumaProductos()
    },[venta])
    function sumaProductos(){
        let value = 0
        venta?.forEach(producto => value=(value+(producto.amount*producto.price)));
        setTotal(value)
    }
    const putProductsStock = (data)=>{
        data.forEach(product=>{
            const selected = doc(getFirestore(), "users/"+userProfile+"/products", product.id)
            putFirestore(selected,product)
        });
    }
    const postSale =(data)=>{
        const selectedCollection = collection(getFirestore(), "users/"+userProfile+"/sales")
        postFirestore(selectedCollection,data)
    }
    
    function registar(ventar=venta, productos=shopingCart){
        if(!ventar[0]){
            Alert.alert("No hay venta para registrar")
        }else{
            let postVentar =  {
                idClient:client?.id?client.id:null,
                client:client?.identifier?client.identifier:null,
                total:total,
                sellProducts:ventar,
                createdDate:Timestamp.now().toDate().toString(),
                wayToPay:wayToPays?wayToPays:null
            }
            postSale(postVentar)
            putProductsStock(productos)
            limpiar()
            navigation.navigate("MenuPrincipal")
            // arreglar esto nos tiene que llevar a las ventas o al resumen
        }
            
        }
       

  
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    //Funcion Filtro Scann
    const [scannOn,setScannOn]=useState(false)
    const [productsApi,setProductsApi]=useState(null)
    const getProducts =  ()=>{
      const selectedC = collection(getFirestore(), "users/"+userProfile+"/products")
        getDocs(selectedC)
        .then(res => setProductsApi(res.docs.map(sale=>({id:sale.id,...sale.data()}))))
    }
    function filterScann(code) {
        if (!productsApi){return} 
        if (!code){return setFilterScanned(null)}
        let filter = productsApi.filter((e) =>e.barCode && e.barCode.includes(code))  
        if (filter){
            return filter[0]
        }else{return null}
    }
    useEffect(() => {
        getProducts()
    },[]);
    const addToCarScanned = (code) => {
        let scan = filterScann(code)
        if (!scan){
            return  Alert.alert("No se encontraron productos")
        }
        if(!existe(shopingCart,"id",scan.id)){
                setShopingCart([...shopingCart,scan])
                setShopingCartSave([...shopingCartSave,scan])
            }
    }
    /////////////////////////////////////////////////////
    /////////////////////////////////////////////////////
    const [modalCancelar,setModalCancelar] = useState(false)
    const [modalRegistrar,setModalRegistrar] = useState(false)
    const [modalPay,setModalPay]= useState(false)
    const [wayToPays,setWayToPays] = useState(null)
    const [client,setClient] = useState(null)
    
    
    useEffect(() => {
        if(route.params?.client){
            setClient(route.params.client)
        }
    },[route.params?.client]);
    const limpiar = ()=> {
        setShopingCart([])
        setShopingCartSave([])
        setVenta([])
        setWayToPays(null)
        setClient(null)
    }
        //////////////////////////////////////////////////////////
    //hacer global
    function financial(x) {
        return Number.parseFloat(x).toFixed(2);
    }
    console.log("------------------------")
    /////////////////////////////////////////////////////
    return(
        <LinearGradient 
            colors={colorBackgroundModal}
            start={{x:1,y:0}}
            end={{x:0,y:1}}
            style={{width:width,height:height}}>
                {scannOn&&<BarCode codeFunction={addToCarScanned}setActive={setScannOn}/>}
                {modalCancelar&&<ModalConfirmation functionCheckOk={limpiar} setStateModal={setModalCancelar} mensaje={"Limpiar Carro"}/>}
                {modalRegistrar&&<ModalConfirmation functionCheckOk={registar} setStateModal={setModalRegistrar} mensaje={"Registrar Venta"}/>}
                {modalPay&&<WayToPay functionCheckOk={setWayToPays} setStateModal={setModalPay} />}
           <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.navigate("BucarProductos")} style={styles.botonPosition} >
                    <LinearGradient 
                    colors={colorB}
                    start={{x:1,y:0}}
                    end={{x:0,y:1}} 
                    style={styles.boton}><Icons name="plus-box" size={26} color={'white'}/>
                    </LinearGradient>
                </TouchableOpacity>
                <FlatList
                    data={shopingCart}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                    return (
                        <View>    
                            <CardProducto
                                key={item.id+"p"}
                                id={item.id}
                                nombre={item.name}
                                categoria={item.category}
                                precio={item.price?financial(item.price):null}
                                product={item} 
                                shopingCart={shopingCart}
                                shopingCartSave={shopingCartSave}
                                setShopingCart={setShopingCart} 
                                venta={venta}
                                setVenta={setVenta}
                            />
                            {}
                        </View>   
                    );
                }}
                />
             <LinearGradient 
                    colors={colorB}
                    start={{x:1,y:0}}
                    end={{x:0,y:1}} style={{height:height*0.04,flexDirection: "row",justifyContent:"space-around",}}>
                <View style={{width: '35%',}}><Text style={styles.text}>Total</Text></View>
                <View style={{width: '35%',}}><Text style={styles.text}>{total}</Text></View>
            </LinearGradient >
            <View style={{height:height*0.36,flexWrap:"wrap",justifyContent:"center",alignItems:"center",}}>
                <View style={{width: width,flexDirection: "row",justifyContent:"space-around",alignItems:"center"}}>
                <TouchableOpacity 
                   onPress={()=>navigation.navigate("Customers",{cobrar:true})}
                >
                    <LinearGradient 
                        colors={colorB}
                        start={{x:1,y:0}}
                        end={{x:0,y:1}} 
                        style={styles.boton2}><Text style={{...styles.text, fontSize:14}}>Asignar Cliente</Text>
                    </LinearGradient>   
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>setModalPay(true)}>
                    <LinearGradient 
                        colors={colorB}
                        start={{x:1,y:0}}
                        end={{x:0,y:1}} 
                        style={styles.boton2}><Text style={{...styles.text, fontSize:14}}>Forma de Pago</Text>
                    </LinearGradient>   
                </TouchableOpacity>
                </View>
                <View style={{width: width,flexDirection: "row",justifyContent:"space-around",alignItems:"center"}}>
                    
                    <LinearGradient 
                        colors={colorA}
                        start={{x:1,y:0}}
                        end={{x:0,y:1}} 
                        style={styles.boton2}><Text style={{...styles.text, fontSize:14 , color:"black"}}>{client?.identifier}</Text>
                    </LinearGradient>  
                    
                    
                    <LinearGradient 
                        colors={colorA}
                        start={{x:1,y:0}}
                        end={{x:0,y:1}} 
                        style={styles.boton2}><Text style={{...styles.text, fontSize:14, color:"black"}}>{wayToPays}</Text>
                    </LinearGradient>   
                    
                </View>
                <TouchableOpacity onPress={()=>{setScannOn(true)}}>
                    <BarCodeIcon size={100}/>
                </TouchableOpacity>
            </View>
            {/* NavBar() -------------------------------------------*/}
                    <View style = {styles.containerNavBar}>   
                            <ButtonNav 
                                functionNav={() => setModalCancelar(true)}
                                iconSelect={"autorenew"}
                                buttonSize={30}
                                buttonName={"Limpiar"}/>
                            <ButtonNav 
                                functionNav={()=>navigation.navigate("MenuPrincipal")}
                                iconSelect={"home"}
                                buttonSize={30}
                                buttonName={"Home"}/>
                            <ButtonNav 
                                functionNav={()=> setModalRegistrar(true)}
                                iconSelect={"cash-register"}
                                buttonSize={30}
                                buttonName={"Registrar"}/>
                    </View> 
               </View>  
        </LinearGradient>
    );
}
const styles = StyleSheet.create({
    container:{
        marginTop:-15,
        flex:1,
        width:width, height:height,
        alignItems:"center",
      },
    contenedorBtonones: {
        width:"100%",
        flexDirection: "row",
        justifyContent: "space-around",  
    },
    botonPosition:{
        zIndex:1,
        position: "absolute",
        bottom: height*0.30,
        right: width*0.1,
        width: width*0.15,
        height: height*0.07,
    },
    boton:{
        width: width*0.15,
        height: height*0.07,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginVertical: 15,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        backgroundColor: "aqua",
        
        
    },
    boton2:{
        width: width*0.30,
        height: height*0.03,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        // marginVertical: 15,
        // marginHorizontal: 10,
        // backgroundColor: "aqua",
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',   
        textAlign:"center",            
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


})
