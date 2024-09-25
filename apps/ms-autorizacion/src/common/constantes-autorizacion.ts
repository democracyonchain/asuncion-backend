import { Constantes } from '@bsc/core';

/**
 * Clase con las constantes del micro servicio de autorización
 *
 * @export
 * @class ConstantesAutorizacion
 * @typedef {ConstantesAutorizacion}
 * @extends {Constantes}
 */
export class ConstantesAutorizacion extends Constantes {

  public static readonly CT_ACTIVO = true;

  public static readonly BORRADO_LOGICO = false;

  //nombre del esquema de base de datos para las tablas de BSC
  public static readonly SCHEMA_BSC = 'public';

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
  public static readonly TYPEORM_MONGO_CONFIG = 'database.configMongo';
  public static readonly PINO_LOGGER_CONFIG = 'pino-logger.config';
}
