import { Constantes } from '@bsc/core';

export class ConstantesAutorizacion extends Constantes {
  //Constantes generales


  public static readonly CT_ACTIVO = 1;

  public static readonly BORRADO_LOGICO = 0;

  //nombre del esquema de base de datos para las tablas de BSC
  public static readonly SCHEMA_BSC = 'public';



  /*
    Nos indica si se graba el secuencial producto por insumo
  */
  public static readonly CT_TIPO_INSUMO = 69;
  public static readonly RECURSO_SECUENCIAL_PRODUCTO_ID = 1;

  public static AUTORIZACION = {
    HOST: process.env.MS_AUTORIZACION_HOST,
    PORT: parseInt(process.env.MS_AUTORIZACION_PORT),
    NAME: 'ms-autorizacion',
    PATTERN: {

      LOGIN:'LOGIN',
      PERFIL:'PERFIL',
      CAMBIO_PASSWORD:'CAMBIO_PASSWORD',
      MODULO_PERMISOS_ID:'MODULO_PERMISOS_ID',
      LOGOUT:'LOGOUT'
    },
  };

  public static readonly TYPEORM_CONFIG = 'database.config';
  public static readonly PINO_LOGGER_CONFIG = 'pino-logger.config';
}
