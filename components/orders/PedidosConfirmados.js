import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { StatusBar } from 'react-native';
const heigtStatusBar = StatusBar.currentHeight
const {width, height} = Dimensions.get('window');

export default function PedidosConfirmados(){
    return (
        <View style={styles.container}>
            <Text>pedidosConfirmados</Text>
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