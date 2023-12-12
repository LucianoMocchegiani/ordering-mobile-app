export function exist(arrayDeObjetos,atributo,valor){
    for(let i=0;i<arrayDeObjetos.length;i++){
      if(arrayDeObjetos[i][atributo]===valor){
        return true
      }
    }
    return false
}