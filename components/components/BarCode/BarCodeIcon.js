
import React from 'react';

import ButtonNav from '../Reutilizables/ButtonNav'
export default function BarCodeIcon({size=70}){
    
    return(
        
            <ButtonNav 
           
            iconSelect={"barcode-scan"}
            buttonSize={size}
            />
    )
}