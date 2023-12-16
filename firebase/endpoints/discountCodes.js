import {  doc , getDoc, collection, getDocs, query, orderBy, setDoc, deleteDoc, addDoc, Timestamp} from 'firebase/firestore';
import { db } from '../firebase';
import {Alert} from 'react-native';
export const getDiscountCodes=  async (setState)=>{
    let response = { error: 'Los codigos no fueron obtenidos' };
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/discount_codes`);
        const querySnapshot = await getDocs(query(selectedCollection, orderBy("discount",'asc')));
        const codesData = querySnapshot.docs.map((category) => ({
          ...category.data(),
          id:category.id,
        }));
        response = { success: true, data:codesData};
        setState(codesData)
        return response
    } catch (error) {
        response = { error: error.message };
        return response
    }
}
export const getDiscountCode= async( setLoading, setState, id )=>{
    setLoading(true)
    let response = { error: 'El codigo no fue obtenido' };
    try{
        const selectedDoc = doc(db, "sections/y36IT96zUTZcNOZAGP5O/discount_codes", id)
        const docSnapshot = await getDoc(selectedDoc)
        if (docSnapshot.exists()) {
            const codeData = { ...docSnapshot.data(), id: docSnapshot.id };
            setState(codeData);
            response = { success: 'Codigo obtenido con exito', codeData };
            setLoading(false)
            return response
        } else {
            response = { error: 'No existe el codigo' };
            setLoading(false)
            return response
        }
    }catch (error) {
        response = { error: error.message };
        setLoading(false)
        return response
    }
}

export const postDiscountCode = async(setLoading, id, data)=>{
    setLoading(true)
    data = {...data , created_date: Timestamp.now(), updated_date:Timestamp.now()}
    try{
        const selectedDoc = doc(db, "sections/y36IT96zUTZcNOZAGP5O/discount_codes", id)
        await  setDoc(selectedDoc, data)
        setLoading(false)
        Alert.alert('Notificacion', 'Codigo registrado con exito')
        return true 
    }catch (error) {
        setLoading(false)
        Alert.alert('Notificacion',error.message )
        return false
    }
}
export const putDiscountCode = async(setLoading, id, data)=>{
    setLoading(true)
    data = {...data , updated_date:Timestamp.now()}
    try{
        const selectedDoc = doc(db, "sections/y36IT96zUTZcNOZAGP5O/discount_codes", id)
        await  setDoc(selectedDoc, data)
        setLoading(false)
        Alert.alert('Notificacion', 'Codigo actualizado con exito')
        return true
    }catch (error) {
        setLoading(false)
        Alert.alert('Notificacion',error.message )
        return false
    }
}
export const deleteDiscountCode= async(id, setLoading)=>{
    let response = { error: 'El codigo no fue eliminado'};
    setLoading(true)
    try{
        const selectedDoc = doc(db, `sections/y36IT96zUTZcNOZAGP5O/discount_codes`, id)
        await deleteDoc(selectedDoc)
        response = { success: 'Codigo eliminado con exito' };
        setLoading(false)
        return response;
    }catch (error) {
        response = { error: error.message };
        setLoading(false)
        return response;
    }
}
