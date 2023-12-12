import { getFirestore, doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter} from 'firebase/firestore';
import { db } from '../firebase';
import algoliasearch from 'algoliasearch/lite'
// endpoint productos
//////////////////////////////////////////////////////////////////////////////
export const getProducts=  async (setLoading, setState, whereKey, whereValue)=>{
    let response = { error: 'Los productos no fueron obtenidos' };
    setLoading(true)
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/products`);
        let querySnapshot = null 
        if (whereKey && whereValue){
            querySnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(10),where(whereKey,'==',whereValue)));
            console.log(querySnapshot.docs)
        }else{
            querySnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(10)));
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
export const getProduct = async(id,setState)=>{
    let response = { error: 'El producto no fue obtenido' };
    try{
        const selectedDoc = doc(getFirestore(), "sections/y36IT96zUTZcNOZAGP5O/products", id)
        const docSnapshot = await getDoc(selectedDoc).then(res => setState({...res.data(), id:res.id}))
        if (docSnapshot.exists()) {
            const productData = { ...docSnapshot.data(), id: docSnapshot.id };
            setState(productData);
            response = { success: 'Producto obtenido con exito', productData };
        } else {
            response = { error: 'No existe el producto' };
        }
    }catch (error) {
        response = { error: error.message };
        console.log(response )
    }
    return response
}
export const deleteProduct = async(userProfile, id)=>{
    let response = { error: 'El producto no fue eliminado' };
    try{
        const selectedDoc = doc(getFirestore(), "productos", id)
        await deleteDoc(selectedDoc)
        response = { success: 'Producto eliminado con exito' };
    }catch (error) {
        response = { error: error.message };
        console.log(response )
    }
    return response;
}
export const putProduct= async(id, data)=>{
    let response = { error: 'El producto no fue actualizado' };
    try{
        const selectedDoc = doc(getFirestore(), "productos", id)
        await  setDoc(selectedDoc, data)
        response = { success: 'Producto actualizado con exito' };
    }catch (error) {
        response = { error: error.message };
        console.log(response )
    }
    return response;
}
export const postProduct = async(data)=>{
    let response = { error: 'El producto no fue creado'};
    try{
        const selectedCollection = collection(getFirestore(), "productos")
        await addDoc(selectedCollection, data)
        response = { success: 'Producto creado con exito' };
    }catch (error) {
        response = { error: error.message };
        console.log(response )
    }
    return response;
}