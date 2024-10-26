import { RespuestaJWTToken } from "./respuesta-jwt.interface";

export interface PayloadData<DataType> {
    data: DataType;
    dataUser?: RespuestaJWTToken;
  }
  