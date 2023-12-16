import {  doc , collection, getDocs, query, orderBy, setDoc,  addDoc, Timestamp} from 'firebase/firestore';
import { db } from '../firebase';
import {Alert} from 'react-native';
// endpoint productos
//////////////////////////////////////////////////////////////////////////////
export const getCategories=  async (setState)=>{
    let response = { error: 'Las categorias no fueron obtenidas' };
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/categories`);
        const querySnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc')));
        const categoriesData = querySnapshot.docs.map((category) => ({
          ...category.data(),
          id:category.id,
        }));
        response = { success: true, data:categoriesData };
        setState(categoriesData)
    } catch (error) {
        response = { error: error.message };
        console.log(response )
    }
    return response
}
export const putCategory= async(setLoading, id, data)=>{
    setLoading(true)
    data = {...data , updated_date:Timestamp.now()}
    try{
        const selectedDoc = doc(db, "sections/y36IT96zUTZcNOZAGP5O/categories", id)
        await  setDoc(selectedDoc, data)
        setLoading(false)
        Alert.alert('Notificacion', 'Categoria actualizada con exito')
        return true
    }catch (error) {
        setLoading(false)
        Alert.alert('Notificacion',error.message )
        return false
    }
}

export const postCategory= async(setLoading, data)=>{
    setLoading(true)
    data = {...data , created_date: Timestamp.now(), updated_date:Timestamp.now()}
    try{
        const selectedCollection = collection(db, "sections/y36IT96zUTZcNOZAGP5O/categories")
        const a = await addDoc(selectedCollection, data)
        console.log(a)
        setLoading(false)
        Alert.alert('Notificacion', 'Categoria registrada con exito')
        return true 
    }catch (error) {
        setLoading(false)
        Alert.alert('Notificacion',error.message )
        return false
    }
}