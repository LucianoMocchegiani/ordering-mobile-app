import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './customer/cart/Cart'
import Store from './customer/store/Store'
import RecivedOrders from './customer/orders/RecivedOrders'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function NavBarCustomer() {

  return (
    <Tab.Navigator 
      initialRouteName="Tienda"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Tienda" component={Store} 
        options={{
          tabBarIcon: () => (
            <Icon name="storefront" color={'#5c7ae3'} size={30} />
          ),
        }}
      />
      <Tab.Screen name="Carro" component={Cart}
          options={{
            tabBarIcon: () => (
              <Icon name="cart" color={'#5c7ae3'} size={30} />
            ),
          }}
      />
      <Tab.Screen name="Pedidos" component={RecivedOrders}
        options={{
          tabBarIcon: () => (
            <Icon name="text-box-outline" color={'#5c7ae3'} size={30} />
          ),
        }}    
      />
    </Tab.Navigator> 
  );
}

