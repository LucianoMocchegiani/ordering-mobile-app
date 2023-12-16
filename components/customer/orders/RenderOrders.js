import React from "react";
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import {Timestamp} from 'firebase/firestore';
import CardOrders from './CardOrders';
const {height} = Dimensions.get('window');

export default function RenderOrders({data, navigation}){
   
    return (
        <View>
            <FlatList
                style={styles.container}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                return (
                    <CardOrders
                        id={item.id}
                        total={item.total}
                        createdDate={item.created_date.toDate().toString()}
                        status={item.status}
                        order={item}
                        navigation={navigation}
                    />
                ); 
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height:"auto", marginBottom:height*0.13,
    },
});