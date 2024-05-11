import { RespuestaJWT } from "../interfaces";

export function setDataUser<ENTITY>(entity:ENTITY,dataKeyCloak:RespuestaJWT,create:boolean=true){
    
    let dataUser:any = {'usuariocreacion_id':dataKeyCloak.id};
    if(!create){
      dataUser = {'usuariomodificacion_id':dataKeyCloak.id};
    }
    Object.assign(entity, dataUser);
    return entity;
}