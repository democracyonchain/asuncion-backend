export const lowerCaseKeys = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});

export const deleteNullArray = (obj)=>{
  let claves = Object.keys(obj); 
  for(let i=0; i< claves.length; i++){
      let clave = claves[i];
      if(obj[clave]==null){
          delete obj[clave];
      }
  }
  return obj
}