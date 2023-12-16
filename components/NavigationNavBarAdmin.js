import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Store from './admin/store/Store'
import RecivedOrders from './admin/orders/RecivedOrders'
import ComfirmedOrders from './admin/orders/ConfirmedOrders'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function NavBarCustomer() {

  return (
    <Tab.Navigator 
      initialRouteName="tienda"
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
      <Tab.Screen name="Pendientes" component={RecivedOrders}
        options={{
          tabBarIcon: () => (
            <Icon name="text-box-outline" color={'#5c7ae3'} size={30} />
          ),
        }}    
      />
      <Tab.Screen name="Confirmados" component={ComfirmedOrders}
        options={{
          tabBarIcon: () => (
            <Icon name="text-box-check-outline" color={'#5c7ae3'} size={30} />
          ),
        }}    
      />
      {/* <Tab.Screen name="Cuenta" component={ComfirmedOrders}
        options={{
          tabBarIcon: () => (
            <Icon name="cog" color={'#5c7ae3'} size={30} />
          ),
        }}    
      /> */}
    </Tab.Navigator> 
  );
}

