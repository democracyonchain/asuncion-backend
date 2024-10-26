export interface RespuestaJWT {
  email: string;
  nombres:string,
  apellidos:string, 
  id:number,
  provincia_id:number
}

export interface RespuestaJWTToken {
  user: RespuestaJWT;
  token:string,
}
