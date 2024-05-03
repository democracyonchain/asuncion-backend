export function resetFilds(data,alias,values=[]) {
    if(!values){
        values = []
    }
    for (let clave in data){
      const nombreClave = clave
      const valorClave = data[clave]
      if(valorClave==false && nombreClave!='__typename'){
        values.push(`${alias}.${nombreClave}`)
      }
      else{
        resetFilds(valorClave,nombreClave,values)
      }
    }
    return values
}

export function changeFalseToTrue(data,descartar=null) {
  if(descartar){
    for (let valueDescartar in descartar){
      const valorParaDescartar = descartar[valueDescartar];
      delete data[valorParaDescartar];
    }
  }
  let relations = [];
  const dataTrue = JSON.parse(
      JSON.stringify(data, (key, value) => {
          if (value === false && key !='__typename') {
              return true;
          }
          return value;
      }),
  );
  relations = setRelations(data,relations)
  return {dataTrue,relations}
}

function setRelations(data,relations,alias=""){
  if(!relations){
    relations = []
  }
  for (let clave in data){
    let nombreClave = clave
    const valorClave = data[clave]
    if(valorClave!=false && nombreClave!='__typename'){
      if(alias){
        relations.push(`${alias}.${nombreClave}`)
        nombreClave = `${alias}.${nombreClave}`
      }
      else{
        relations.push(`${nombreClave}`)
      }
      setRelations(valorClave,relations,nombreClave)      
    }
  }
  return relations
}

export function resetFildsRelations(data,alias,values=[]) {
  let relations = [];
  if(!values){
      values = []
  }
  for (let clave in data){
    const nombreClave = clave
    const valorClave = data[clave]
    if(valorClave==false && nombreClave!='__typename'){
      values.push(`${alias}.${nombreClave}`)
    }
    else{
      resetFilds(valorClave,nombreClave,values)
           
    }  
  }
  relations = setRelations(data,relations)
  return {values,relations}
}