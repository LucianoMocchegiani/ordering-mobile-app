import { getFirestore, doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter} from 'firebase/firestore';
import { db } from '../firebase';
// endpoint productos
//////////////////////////////////////////////////////////////////////////////
export const getCategories=  async (setState)=>{
    let response = { error: 'Las categorias no fueron obtenidas' };
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/categories`);
        const querySnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(10)));
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