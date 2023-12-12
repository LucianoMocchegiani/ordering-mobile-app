import { getFirestore, doc , getDoc, collection, getDocs, query, orderBy, where, limit, setDoc, deleteDoc, addDoc, getDocFromCache, getDocsFromCache, startAfter} from 'firebase/firestore';
import { db } from './firebase';
// endpoint pedidos
//////////////////////////////////////////////////////////////////////////////
export const getPedidos =  async ()=>{
    let response = { error: 'Los pedidos no fueron obtenidos' };
    try {
        const selectedCollection = collection(getFirestore(), `pedidos`);
        const querySnapshot = await getDocs(query(selectedCollection, orderBy("nombre",'asc')));
        const pedidosData = querySnapshot.docs.map((pedido) => ({
          ...pedido.data(),
          id: sale.id,
        }));
        setState(pedidosData);
        response = { success: 'Pedidos obtenidos con exito', data:pedidosData };
        setTimeout(loadingOff, 500)
    } catch (error) {
        response = { error: error.message };
    }
    return response
}
export const getPedido = async (id,setState)=>{
    let response = { error: 'El pedido no fue obtenido' };
    try{
        const selectedDoc = doc(getFirestore(), `pedidos`, id)
        const docSnapshot = await getDoc(selectedDoc)
        if (docSnapshot.exists()) {
            const pedidosData = { ...docSnapshot.data(), id: docSnapshot.id };
            setState(pedidosData);
            response = { success: 'Pedido obtenido con exito', pedidosData };
        } else {
            response = { error: 'No existe el pedido' };
        }
    }catch (error) {
        response = { error: error.message };
    }
    return response
}
export const postPedido = async (data) => {
    let response = { error: 'El pedido no fue creado'};
    try {
      const selectedCollection = collection(getFirestore(), `pedidos`);
      await addDoc(selectedCollection, data);
      response = { success:'Pedido creado con exito'};
    } catch (error) {
        response = { error: error.message };
    }
    return response
};
export const deletePedido = async (id)=>{
    let response = { error: 'El pedido no fue eliminado' };
    try{
        const selectedDoc = doc(getFirestore(), "pedidos", id)
        await deleteDoc(selectedDoc)
        response = { success: 'Pedido eliminado con exito' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}
export const putPedido= async(id, data)=>{
    let response = { error: 'El pedido no fue actualizado' };
    try{
        const selectedDoc = doc(getFirestore(), "pedidos", id)
        await  setDoc(selectedDoc, data)
        response = { success: 'Pedido actualizado con exito' };
    }catch (error) {
        response = { error: error.message };
    }
    return response;
}


// endpoint productos
//////////////////////////////////////////////////////////////////////////////
export const getProducts=  async (setState)=>{
    let response = { error: 'Los productos no fueron obtenidos' };
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/products`);
        // const querySnapshot = await getDocsFromCache(query(selectedCollection, orderBy("name",'asc')));  
        const querySnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc'),limit(10))); 
        console.log(querySnapshot.docs.length)
        const productsData = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        response = { success: true, data:productsData };
        setState(productsData)
    } catch (error) {
        response = { error: error.message };
    }
    return response
}
export const getProductsOnScroll=  async (setState, state)=>{
    let response = { error: 'Los productos no fueron obtenidos' };
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/products`);
        const querySnapshot = await getDocs(query(selectedCollection, orderBy("name",'asc'),startAfter(state[state.length-1].name),limit(5))); 
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
    }
    return response;
}
export const getCategories = async(setState)=>{
    let response = { error: 'Las categorias no fueron obtenidas' };
    try {
        const selectedCollection = collection(db, `sections/y36IT96zUTZcNOZAGP5O/categories`);
        const querySnapshot = await getDocsFromCache(query(selectedCollection, orderBy("name",'asc')));      
        const productsData = querySnapshot.docs.map((product) => ({
          ...product.data(),
          id: product.id,
        }));
        response = { success: true, data:productsData };
        setState(productsData)
    } catch (error) {
        response = { error: error.message };
    }
    return response
}


const putProductsStock = async (userProfile, data)=>{
    //cancel sale
    // restablece el stock de los productos 
    let response = { error: 'los productos no fueron actualizados' };
    try {
      await Promise.all(
        data.map(async (product) => {
          const selected = doc(getFirestore(), `productos`, product.id);
          const obtainDoc = await getDoc(selected)
          const descomprimedDoc = {...obtainDoc.data(), id:obtainDoc.id}
          const updatedDoc = {...descomprimedDoc,stock: Number(descomprimedDoc.stock)+Number(product.amount)}
          await setDoc(selected,(updatedDoc))
        })
      );
      response = { success: 'Productos actualizados correctamente ' };
    } catch (error) {
      response = { error: error.message };
    }
    return response;
}
