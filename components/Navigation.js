import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {AuthProvider, } from '../context/authContext'
import { StorageProvider } from '../context/storageContext';
//-------components
import Login from './login/Login'
import LoginAccount from './login/LoginAccount'
import Register from './login/Register'
import NavBar from './NavigationNavBar'
import NavBarAdmin from './NavigationNavBarAdmin'
import NewOrder from './customer/orders/NewOrder'
import OrderDetail from './customer/orders/OrderDetail'
import OrderDetailAdmin from './admin/orders/OrderDetail'
import ProductDetail from '../components/admin/product/ProductoDetail'
import NewProduct from '../components/admin/product/NewProduct'
import NewDiscountCode from '../components/admin/codes/NewDiscountCode'
import NewCategory from '../components/admin/categories/NewCategory'
import CodesScreen from '../components/admin/codes/CodesScreen'
import DiscountCodeDetail from '../components/admin/codes/DiscountCodeDetail'
import CategoryDetail from '../components/admin/categories/CategoryDetail'
import CategoryScreen from '../components/admin/categories/CategoriesScreen'
import Notifications from './Notifications'
const Stack = createNativeStackNavigator();

export default function Navigation(){
   
    return( 
        <NavigationContainer>  
            <AuthProvider>
            <StorageProvider>
            <Stack.Navigator 
                initialRouteName="login"
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="login" component={Login}/>
                <Stack.Screen name="loginAccount" component={LoginAccount}/>
                <Stack.Screen name="register" component={Register}/>
                <Stack.Screen name="notifications" component={Notifications}/>
                {/* //-----------------------Ingreso Admin------------------------------------ */}
                <Stack.Screen name="navBar" component={NavBar} />
                <Stack.Screen name="navBarAdmin" component={NavBarAdmin} />
                <Stack.Screen name="newProduct" component={NewProduct}/>
                <Stack.Screen name="productDetail" component={ProductDetail}/>
                <Stack.Screen name="newDiscountCode" component={NewDiscountCode}/>
                <Stack.Screen name="newCategory" component={NewCategory}/>
                <Stack.Screen name="codesScreen" component={CodesScreen}/>
                <Stack.Screen name="discountCodeDetail" component={DiscountCodeDetail}/>
                <Stack.Screen name="categoryScreen" component={CategoryScreen}/>
                <Stack.Screen name="categoryDetail" component={CategoryDetail}/>
                <Stack.Screen name="orderDetailAdmin" component={OrderDetailAdmin}/>   
                {/* //-----------------------Ingreso Cliente------------------------------------ */}
                <Stack.Screen name="newOrder" component={NewOrder}/>
                <Stack.Screen name="orderDetail" component={OrderDetail}/>                   
            </Stack.Navigator>
            </StorageProvider>
            </AuthProvider>  
        </NavigationContainer>
    )
}
