import {doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter, Timestamp} from 'firebase/firestore';
import { db } from '../firebase';
import {Alert} from 'react-native';

//////////////////////////////////////////////////////////////////////////////

export const postOrder= async(setLoading, data)=>{
    data = {...data , created_date: Timestamp.now(), updated_date:Timestamp.now()}
    try{
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/orders`)
        await addDoc(selectedCollection, data)
        setLoading(false)
        Alert.alert('Notificacion','Pedido enviado con exito.')
        return true
    }catch (error) {
        response = { error: error.message };
        setLoading(false)
        Alert.alert('Notificacion',error.message )
        return false
    }
}
export const deleteOrder= async(id, setLoading)=>{
    let response = { error: 'El pedido no fue eliminado'};
    setLoading(true)
    try{
        const selectedDoc = doc(db, `sections/y36IT96zUTZcNOZAGP5O/orders`, id)
        await deleteDoc(selectedDoc)
        response = { success: 'Pedido eliminado con exito' };
        setLoading(false)
        return response;
    }catch (error) {
        response = { error: error.message };
        setLoading(false)
        return response;
    }
}
export const comfirmedPutOrder = async(setLoading, id, data, email)=>{
    setLoading(true)
    data = {...data ,seller:email, status:'Confirmado', updated_date:Timestamp.now()}
    try{
        await Promise.all(
            data.order.map(async (product) => {
                const selected = doc(db, `sections/y36IT96zUTZcNOZAGP5O/products`, product.id);
                const obtainDoc = await getDoc(selected)
                const descomprimedDoc = {...obtainDoc.data(), id:obtainDoc.id}
                const updatedDoc = {...descomprimedDoc,stock: Number(descomprimedDoc.stock)-Number(product.amount)}
                await setDoc(selected,(updatedDoc))
            })
        );
        const selectedDoc = doc(db, "sections/y36IT96zUTZcNOZAGP5O/orders", id)
        await  setDoc(selectedDoc, data)
        setLoading(false)
        return true
    }catch (error) {
        setLoading(false)
        Alert.alert('Notificacion',error.message )
        return false
    }
}
export const getOrders=  async (setLoading, setState, whereKey, whereValue)=>{
    let response = { error: 'Los pedidos no fueron obtenidos' };
    setLoading(true)
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/orders`);
        let querySnapshot = null 
        if (whereKey && whereValue){
            querySnapshot = await getDocs(query(selectedCollection, orderBy("created_date",'asc'),limit(10),where(whereKey,'==',whereValue)));
            console.log(querySnapshot.docs)
        }else{
            querySnapshot = await getDocs(query(selectedCollection, orderBy("created_date",'asc'),limit(10)));
        }
        const productsData = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        response = { success: true, data:productsData };
        setState(productsData)
        setLoading(false)
    } catch (error) {
        response = { error: error.message };
        console.log(response )
    }
    return response
}
export const searchProductsAlgolia = async (setLoading, setState, search) =>{
    let response = { error: 'Los productos no fueron obtenidos' };
    setLoading(true)
    const APPLICATION_ID = 'LFA4TZIVY9'
    const SEARCH_API_KEY = '04aa1f68be712a2b86f3106f3183abc8'
    const ALGOLIA_INDEX = 'cm_security_products'
    try {
        const client = algoliasearch(APPLICATION_ID, SEARCH_API_KEY)
        const index = client.initIndex(ALGOLIA_INDEX)
        const {hits} = await index.search(search, {
            hitsPerPage: 5
        })
        const results = hits
        setState(results)
        setLoading(false)
        return response
    } catch(error) {
        response = { error: error.message };
        console.log(response )
        setLoading(false)
        return response
    }
}

export const getOrdersOnScroll =  async (setState, state , whereKey, whereValue)=>{
    let response = { error: 'Los productos no fueron obtenidos' };
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/orders`);
        let querySnapshot = null 
        if (whereKey && whereValue){
            querySnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc'),where(whereKey,'==',whereValue), startAfter(state[state.length-1].name),limit(10)));
            console.log(querySnapshot.docs)
        }else{
            querySnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc'),startAfter(state[state.length-1].name),limit(10))); 
        }
        const productsData = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        response = { success: true, data:productsData };
        setState([...state,...productsData])
    } catch (error) {
        response = { error: error.message };
        console.log(response )
    }
    return response
}