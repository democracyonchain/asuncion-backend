import { Constantes } from '@bsc/core';

/**
 * Clase con las constantes del micro servicio de verificación
 *
 * @export
 * @class ConstantesVerificacion
 * @typedef {ConstantesVerificacion}
 * @extends {Constantes}
 */
export class ConstantesVerificacion extends Constantes {

  public static readonly CT_ACTIVO = true;

  public static readonly BORRADO_LOGICO = false;

  //nombre del esquema de base de datos para las tablas de bsc
  public static readonly SCHEMA_BSC = 'public';


  public static VERIFICACION = {
    HOST: process.env.MS_VERIFICACION_HOST,
    PORT: parseInt(process.env.MS_VERIFICACION_PORT),
    NAME: 'ms-verificacion',
    PATTERN: {
      PROVINCIA_VERIFICACION_COLLECTION: 'PROVINCIA_VERIFICACION_COLLECTION',
      PROVINCIA_VERIFICACION_BY_ID: 'PROVINCIA_VERIFICACION_BY_ID'
    },
  };

  public static readonly TYPEORM_CONFIG = 'database.config';
  public static readonly TYPEORM_MONGO_CONFIG = 'database.configMongo';
  public static readonly PINO_LOGGER_CONFIG = 'pino-logger.config';
}
