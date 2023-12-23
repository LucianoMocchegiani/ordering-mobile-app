import React from "react";
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import CardProduct from './CardProduct';
const {height} = Dimensions.get('window');

export default function RenderProducts({data, onScrollFunction, navigation, discount}){
    return (
        <View>
            <FlatList
                onScrollEndDrag={() => onScrollFunction()}
                style={styles.container}
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                return (
                    <CardProduct 
                        key={item.id}
                        category={item.category_id}
                        image={item.image}
                        name={item.name}
                        description={item.description}
                        type={item.type}
                        stock={item.stock}
                        price={item.dolar_price}
                        product={item}
                        navigation = {navigation}
                        discount ={discount}

                    />
                );
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height:"auto", marginBottom:height*0.30,
    },
});