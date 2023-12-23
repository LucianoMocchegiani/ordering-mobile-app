export default function validate(input) {
    let errors = {};

    if (!input.name){
        errors.name = '*Ingresa un nombre'
    }
    else if (!input.name.length > 50){
        errors.name = '*Los caracteres no deben superar mas de 50'
    }

    if (!input.description.length > 300){
        errors.description = '*Los caracteres no deben superar mas de 300'
    }
    if (!input.type.length > 300){
        errors.type = '*Los caracteres no deben superar mas de 300'
    }


   if(isNaN(Number(input.dolar_price ))){
        errors.dolar_price = '*El precio debe incluir solo numeros'
    }


    if(isNaN(Number(input.stock))){
        errors.stock = '*El stock debe incluir solo numeros'
    }

    if (!input.type?.length > 50){
        errors.description = '*Los caracteres no deben superar mas de 50'
    }
     
    return errors;
};