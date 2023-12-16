import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('window');

function ButtonDetail({navigation, order}){
    return(
        <TouchableOpacity 
            style={ButtonDetailStyle.button}
            onPress={()=>navigation.navigate('orderDetailAdmin',order)}
        >
            <Text style={ButtonDetailStyle.text}>Ver detalle</Text>
        </TouchableOpacity>
    )
}
const  ButtonDetailStyle = StyleSheet.create({
    text:{
        textTransform:'uppercase',
    },
    button:{
        width:'50%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#fff",
        borderColor:"#5c7ae3",
        borderWidth:1.5,
        borderRadius:8,
        height:'25%',

    }
})
export default function CardOrders({id, total, createdDate, status, order, navigation}){
    console.log(createdDate)
    return(
        <View style={ CardOrdersStyle.container}>
             <View style={{width:'100%', alignItems:'flex-end'}}>
                <Text style={status=='confirmado'?{...CardOrdersStyle.status,color:'#08631C'}:{...CardOrdersStyle.status, color:'#CB6100'}}>{status}</Text>
            </View>
            <View style={{flexDirection:'row', width:'100%', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={ CardOrdersStyle.order}>Pedido</Text>
                <Text style={ CardOrdersStyle.id}>{id}</Text>
            </View>
            <View style={{flexDirection:'row', width:'100%', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={ CardOrdersStyle.total}>Total  USD {total}</Text>
            </View>
            <View style={{width:'100%'}}>
                <Text style={ CardOrdersStyle.date}>{createdDate}</Text>
            </View>
            <ButtonDetail navigation={navigation}  order={ order}/>
        </View>
    )
}

const  CardOrdersStyle = StyleSheet.create({
    container: {
        width:width*0.95,
        height:height*0.2,
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth:1,
        borderColor:'black',
        paddingHorizontal:20,
        paddingTop:10,
        marginBottom:10,
    },
    order:{
        color:"#867f7f",
        textTransform:'uppercase',
        marginRight:10
    },
    id:{
        color:"#867f7f",
    },
    total:{
        fontSize:14,
        textTransform:'uppercase',
    },
    status:{
        fontSize:14,
        marginRight:30,
        textTransform:'uppercase',
    },
    date:{
        color:"#867f7f",
        fontSize:12,
    },
    price:{
        color:'#08631c',
    },
});
