function validate(input) {
    let errors = {};

    if (!input.ciente){
        errors.cliente = '*Ingresa un nombre'
    }
    else if (!input.cliente.length > 50){
        errors.cliente= '*Los caracteres no deben superar mas de 50'
    }

    if (!input.location){
        errors.description = '*Ingresa un nombre'
    }
    else if (!input.location.length > 300){
        errors.description = '*Los caracteres no deben superar mas de 300'
    }

    if (!input.dni){
        errors.dni = '*Ingresa un dni'
    }else if(isNaN(Number(input.dni))){
        errors.dolar_price = '*El dni debe incluir solo numeros'
    }

    return errors;
};