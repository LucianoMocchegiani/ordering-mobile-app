import {View, Text, StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export default function CardProduct({category, name, description, price, amount }){
    return(
        <View style={CardProductStyle.container}>
            <View style={{flexDirection:'row', width:'100%', justifyContent:'flex-start', alignItems:'center'}}>
                <Text style={CardProductStyle.category}>{category}</Text>
                <Text style={CardProductStyle.name}>{name}</Text>
            </View>
            <View style={{width:'100%'}}>
                <Text style={CardProductStyle.description}>{description}</Text>
                <Text style={CardProductStyle.description}>{price}</Text>
            </View>
            <View style={{width:'100%', alignContent:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                <Text style={CardProductStyle.amount}>Cantidad {amount}</Text>
                <Text style={CardProductStyle.price}>Total producto   USD {price*amount}</Text>
            </View>
        </View>
    )
}
const CardProductStyle = StyleSheet.create({
    container: {
        width:width*0.95,
        height:height*0.2,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderWidth:1,
        borderColor:'black',
        paddingHorizontal:20,
        marginBottom:10,
    },
    category:{
        color:"#867f7f",
    },
    name:{
        fontSize:14,
    },
    amount:{
        fontSize:14,
        marginRight:30,
    },
    description:{
        color:"#867f7f",
        fontSize:12,
    },
    price:{
        color:'#08631c',
    },
});
