import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { StatusBar } from 'react-native';
const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

export default function Productos(){
    return (
        <View style={styles.container}>
            <Text>productos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop:heigtStatusBar,
      flex: 1,
      width:width,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
});