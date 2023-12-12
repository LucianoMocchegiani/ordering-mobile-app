import React from "react";
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import CardProduct from "./CardProducts";
const {height} = Dimensions.get('window');

export default function RenderProducts({data}){
    return (
        <View>
            <FlatList
                style={styles.container}
                data={data}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => {
                return (
                    <CardProduct
                        category={item.category_id}
                        image={null}
                        name={item.name}
                        description={item.description}
                        type={item.type}
                        stock={item.stock}
                        price={item.dolar_price}
                        amount={item.amount}
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