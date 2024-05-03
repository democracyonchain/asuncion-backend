export interface RespuestaJWT {
  email: string;
  nombres:string,
  apellidos:string, 
  id:number
}

export interface RespuestaJWTToken {
  user: {};
  token:string,
}
