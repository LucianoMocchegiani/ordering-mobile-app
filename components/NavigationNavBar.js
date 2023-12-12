import React, {useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from './cart/Cart'
import Productos from './productos/Productos'
import Store from './store/Store'
import PedidosConfirmados from './orders/PedidosConfirmados'
import RecivedOrders from './orders/RecivedOrders'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createBottomTabNavigator();

export default function NavBarCustomer() {

  return (
    <Tab.Navigator 
      initialRouteName="tienda"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="tienda" component={Store} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="storefront" color={'#5c7ae3'} size={30} />
          ),
          
        }}
      />
      

      <Tab.Screen name="carro" component={Cart}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="cart" color={'#5c7ae3'} size={30} />
            ),
          }}
      />
      <Tab.Screen name="orders" component={RecivedOrders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="text-box-outline" color={'#5c7ae3'} size={30} />
          ),
        }}    
      />
    </Tab.Navigator> 
  );
}

function NavBarAdmin() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="prducto" component={Productos}/>
      <Tab.Screen name="carro" component={Carro}/>
      <Tab.Screen name="pedidosRecividos" component={RecivedOrders}/>
      <Tab.Screen name="pedidosConfirmados" component={PedidosConfirmados}/>
    </Tab.Navigator> 
  );
}                                                    

