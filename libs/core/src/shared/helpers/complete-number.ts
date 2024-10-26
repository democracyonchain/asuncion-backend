export const completeNumber = (valor,longitud)=>{
    const numberOutput = Math.abs(valor); /* Valor absoluto del número */
    const length = valor.toString().length; /* Largo del número */ 
    const zero = "0"; /* String de cero */  
    if (longitud <= length) {
        if (valor < 0) {
            return ("-" + numberOutput.toString()); 
        } else {
            return numberOutput.toString(); 
        }
    } else {
        if (valor < 0) {
            return ("-" + (zero.repeat(longitud - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(longitud - length)) + numberOutput.toString()); 
        }
    }
  };