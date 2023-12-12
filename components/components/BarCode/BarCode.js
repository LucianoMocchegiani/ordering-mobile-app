import { Camera, FlashMode} from 'expo-camera';
import { Image,Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Loading from '../../functions/Loading'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
const {width, height} = Dimensions.get('window');

export default function BarCode({codeFunction, setActive}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(true);
    const [torch,setTorch] = useState(FlashMode.off);
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
      getBarCodeScannerPermissions();
    }, []);

   
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(false);
      codeFunction(data)
      setActive(false)     
    };
    const functionTorch = ()=>{
      if(torch===FlashMode.off){
        return setTorch(FlashMode.torch)
      }
      if(torch===FlashMode.torch){
        return setTorch(FlashMode.off)
      }

    }
    // 5901234123457
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
    

   
    return(
      <View style={styles.container}>
        {scanned?
        <Camera
            onBarCodeScanned={handleBarCodeScanned}
            style={[StyleSheet.absoluteFill, styles.container]}
            flashMode={torch}
            // barCodeScannerSettings={{barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]}}
        >   
            <View style={styles.containerButtons}>
              <Text style={{...styles.text,marginTop:"20%"}}>Escaner</Text>
            </View>
            <Image
            style={styles.focus}
            source={require('../../assets/Auto-focus.png')}
            />
            <View style={styles.containerButtons}>
              <TouchableOpacity
                onPress={() => functionTorch()}>
                {torch===FlashMode.off?<Icons name="flashlight" size={50} color="white" />
                :<Icons name="flashlight-off" size={50} color="white" />}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setActive(false)}>
                <Icons name="close" size={60} color="white" />
              </TouchableOpacity>
            </View>
        </Camera>:<Loading/>}
        </View>
        

    )
}

const styles = StyleSheet.create({
    container:{    
        alignItems:"center",
        flex:1,
        width:width, height:height,
        zIndex: 10,
    },
    focus:{
      width:width*0.98,
      resizeMode: "center",
    },
    text:{
      color:"white",
      fontSize:24
    },
    containerButtons:{
      width:width,
      height:height*0.3,
      alignItems:"center",
      justifyContent:"space-around",
      flex:1,
      width:width, height:height,
      flexDirection: 'row',
      backgroundColor:"black",
    }
  });