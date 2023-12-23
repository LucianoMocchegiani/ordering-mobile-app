import { getFirestore, doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter, Timestamp} from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes } from 'firebase/storage';
import algoliasearch from 'algoliasearch/lite'
import {Alert} from 'react-native';
// endpoint productos
//////////////////////////////////////////////////////////////////////////////
export const getProducts=  async (setLoading, setState, atribute, value, value2 )=>{
    let response = { error: 'Los productos no fueron obtenidos' };
    setLoading(true)
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/products`);
        const queryOptions = {
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(10))),
            where:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(10),where('category_id','==',value))),
            whereArray:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(10),where('discount_codes', "array-contains", value))),
            whereArrayWhere: async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(10),where('category_id','==',value),where('discount_codes', "array-contains", value2)))
        }
        const querySnapshot = await queryOptions[atribute]()
        const productsData = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        response = { success: true, data:productsData };
        setState(productsData)
        setLoading(false)
    } catch (error) {
        response = { error: error.message };
    }
    return response
}

export const searchProductsAlgolia = async (setLoading, setState, search) =>{
    let response = { error: 'Los productos no fueron obtenidos' };
    // setLoading(true)
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
        // setLoading(false)
        return response
    } catch(error) {
        response = { error: error.message };
        setLoading(false)
        return response
    }
}

export const getProductsOnScroll =  async (setLoading, setState, atribute, value, value2)=>{
    let response = { error: 'Los productos no fueron obtenidos' };
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/products`);
        const queryOptions = {
            generic:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),startAfter(state[state.length-1].name),limit(4))),
            where:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('category_id','==',value),startAfter(state[state.length-1].name),limit(4))),
            whereArray:async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('discount_codes', "array-contains", value),startAfter(state[state.length-1].name),limit(4))),
            whereArrayWhere: async ()=> await getDocs(query(selectedCollection, orderBy("name",'asc'),where('category_id','==',value),where('discount_codes', "array-contains", value2),startAfter(state[state.length-1].name),limit(4)))
        }
        const querySnapshot = await queryOptions[atribute]()
        const productsData = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        response = { success: true, data:productsData };
        setState([...state,...productsData])
    } catch (error) {
        response = { error: error.message };
    }
    return response
}
export const getProduct = async(setLoading,id,setState)=>{
    let response = { error: 'El producto no fue obtenido' };
    setLoading(true)
    try{
        const selectedDoc = doc(getFirestore(), "sections/y36IT96zUTZcNOZAGP5O/products", id)
        const docSnapshot = await getDoc(selectedDoc)
        if (docSnapshot.exists()) {
            const productData = [{ ...docSnapshot.data(), id: docSnapshot.id }];
            setState(productData);
            response = { success: 'Producto obtenido con exito', productData };
            setLoading(false)
            onsole.log(productData)
        } else {
            response = { error: 'No existe el producto' };
            setLoading(false)
            console.log(response)
        }
    }catch (error) {
        response = { error: error.message };
        setLoading(false)
        console.log(error)
    }
    return response
}
export const deleteProduct = async(setLoading,id)=>{
    setLoading(true)
    try{
        const selectedDoc = doc(db, "sections/y36IT96zUTZcNOZAGP5O/products", id)
        await deleteDoc(selectedDoc)
        setLoading(false)
        Alert.alert('Notificacion', 'Producto eliminado')
        return true
    }catch (error) {
        setLoading(false)
        Alert.alert('Notificacion', error.message)
        return false
    }
}
const generateBlob = async(uri)=>{
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onerror = reject;
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState === 4){
                resolve(xhr.response);
            }
        };
        xhr.open("GET",uri);
        xhr.responseType = "blob";
        xhr.send();
    });
}

export const uploadImageFirebase = async(uri, name)=>{
    try{
        const blob = await generateBlob(uri)
        const imagesRef = ref(storage, 'images/'+name+'.jpg');
        uploadBytes(imagesRef , blob ).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

    }catch(error){
        console.log(error)
    }
}   
export const putProduct= async(setLoading, id, data)=>{
    setLoading(true)
    try{
        data = {...data , updated_date:Timestamp.now()}
        if(data.image != 'https://firebasestorage.googleapis.com/v0/b/cm-security-d6aa6.appspot.com/o/images%2F'+id+'.jpg?alt=media&token=7a059b24-6f82-4106-aa69-4e0ee41a5054'){
            console.log('la imagen no es igual')
            await uploadImageFirebase(data.image,id)
        }
        data = {...data, image:'https://firebasestorage.googleapis.com/v0/b/cm-security-d6aa6.appspot.com/o/images%2F'+id+'.jpg?alt=media&token=7a059b24-6f82-4106-aa69-4e0ee41a5054'}
        const selectedDoc = doc(db, "sections/y36IT96zUTZcNOZAGP5O/products", id)
        await  setDoc(selectedDoc, data)
        setLoading(false)
        return Alert.alert('Notificacion', 'Producto actualizado con exito')
    }catch (error) {
        response = { error: error.message };
        setLoading(false)
        return Alert.alert('Notificacion',error.message )
    }
}
export const postProduct= async(setLoading, data)=>{
    setLoading(true)
    data = {...data , created_date: Timestamp.now(), updated_date:Timestamp.now()}
    try{
        const selectedCollection = collection(db, "sections/y36IT96zUTZcNOZAGP5O/products")
        const responce = (await addDoc(selectedCollection, data)).id
        if(data.image && data.image !== ""){
            await uploadImageFirebase(data.image, responce )
            data = {...data, image:'https://firebasestorage.googleapis.com/v0/b/cm-security-d6aa6.appspot.com/o/images%2F'+responce+'.jpg?alt=media&token=7a059b24-6f82-4106-aa69-4e0ee41a5054'}
            const selectedDoc = doc(db, "sections/y36IT96zUTZcNOZAGP5O/products", responce)
            await setDoc(selectedDoc, data)
        }
        setLoading(false)
        Alert.alert('Notificacion', 'Producto registrado con exito')
        return true 
    }catch (error) {
        setLoading(false)
        Alert.alert('Notificacion',error.message )
        return false
    }
}

