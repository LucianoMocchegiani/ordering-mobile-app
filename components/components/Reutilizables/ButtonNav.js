import React from 'react';
import {Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ButtonNav({functionNav,iconSelect,buttonSize=100,buttonName}){
const {width} = Dimensions.get('window');

return(
    <>
        {functionNav?
            <TouchableOpacity  onPress={() => functionNav()}>
            <LinearGradient 
                colors={[ '#206593','#25EADE']}
                start={{x:1,y:0}}
                end={{x:0,y:1}}
                style={buttonSize==30?{...styles.button,padding:buttonSize*0.2,width:width/5,alignItems:"center"}:{...styles.button,padding:buttonSize*0.2,alignItems:"center"}}
                >       
                <Icon name={iconSelect} size={buttonSize} color="white" />
                {buttonName&&<Text style={styles.text}>{buttonName}</Text>}
            </LinearGradient>
            </TouchableOpacity>:
              <LinearGradient 
              colors={[ '#206593','#25EADE']}
              start={{x:1,y:0}}
              end={{x:0,y:1}}
              style={{...styles.button,padding:buttonSize*0.2}}
              >       
              <Icon name={iconSelect} size={buttonSize} color="white" />
              {buttonName&&<Text style={styles.text}>{buttonName}</Text>}
          </LinearGradient>
        }
       
    </>     
)
}
const styles = StyleSheet.create({
    button:{
        borderRadius:20
    },

    text:{
       color: "white",
       fontWeight: "bold",
       textAlign: "center"
    },
})
