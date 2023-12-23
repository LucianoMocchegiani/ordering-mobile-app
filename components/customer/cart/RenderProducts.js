import React from "react";
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import CardProduct from './CardProduct';
const {height} = Dimensions.get('window');

export default function RenderProducts({data}){
    return (
        <View>
            <FlatList
                style={styles.container}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                return (
                    <CardProduct
                        category={item.category_id}
                        image={item.image}
                        name={item.name}
                        description={item.description}
                        type={item.type}
                        stock={item.stock}
                        price={item.dolar_price}
                        product={item}
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