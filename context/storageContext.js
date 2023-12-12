import { createContext , useContext, useEffect, useState, } from 'react';
import { Alert}  from 'react-native';
import { exist } from '../utils/exist';
import { getOrders } from '../firebase/endpoints/orders';

export const storageContext = createContext();
export function useStorage (){
    const context = useContext(storageContext)
    return context
}

export function StorageProvider({children}){
    const [dni, setDni] = useState(null)
    const [discountCode, setDiscountCode] = useState(null)
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState()
    function getOrdersStore(){
        getOrders(setLoading, setOrders, 'dni', dni)
    }

    function updateTotal(){
        if(cart.length){
            const total = cart.reduce(function (acc, obj) { return Number(acc) + (Number(obj.dolar_price)*Number(obj.amount)) }, 0)
            return total
        }
        else return 0
    }
    useEffect(()=>{
        setTotal(updateTotal())
    },[cart])

    function cleanCart(){
        setCart([])
        return(
            Alert.alert('Notificacion','El carro esta vacio.',[{
                text:'Ok', 
                style:'cancel'
            }])
        )
    }
    function removeProductFromCart(product){
        setCart([...cart.filter((e) => e.id != product.id)])
        Alert.alert('Notificacion','El producto fue eliminado del carro.',[{
            text:'Ok', 
            style:'cancel'
        }])
    }
    function addProductToCart(product, amount){
        if(!exist(cart,'id',product.id)){
            setCart([...cart, {...product, amount:amount}])
            Alert.alert('Notificacion','El producto fue agregado al carro.',[{
                text:'Ok', 
            }])
        }else{
            Alert.alert('Error','Este producto ya se encuentra en el carro.',[{
                text:'Ok', 
            }])
        }
    }
    function updateAmountProduct(product, amount){
        const updatedProduct = {...product, amount:amount}
        const updatedCart = cart.map((e) => {
            if(e.id === product.id){
               return updatedProduct
            }
            return e
        });
        setCart(updatedCart)
    }
    return (
        <storageContext.Provider value={{dni, setDni, discountCode, setDiscountCode, cart, total, orders, loading, setLoading, cleanCart, removeProductFromCart, addProductToCart, updateAmountProduct, getOrdersStore }}>
            {children}
        </storageContext.Provider>
    )
}


