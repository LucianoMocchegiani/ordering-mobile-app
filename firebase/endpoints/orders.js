import { getFirestore, doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter, Timestamp} from 'firebase/firestore';
import { db } from '../firebase';

//////////////////////////////////////////////////////////////////////////////

export const postOrder= async(data)=>{
    let response = { error: 'El pedido no fue creado'};
    data = {...data , created_date: Timestamp.now(), updated_date:Timestamp.now()}
    console.log(data)
    try{
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/orders`)
        await addDoc(selectedCollection, data)
        response = { success: 'Pedido enviado con exito' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
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

export const getProductsOnScroll =  async (setState, state , whereKey, whereValue)=>{
    let response = { error: 'Los productos no fueron obtenidos' };
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/products`);
        let querySnapshot = null 
        if (whereKey && whereValue){
            querySnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc'),where(whereKey,'==',whereValue), startAfter(state[state.length-1].name),limit(4)));
            console.log(querySnapshot.docs)
        }else{
            querySnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc'),startAfter(state[state.length-1].name),limit(4))); 
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