import { Constantes } from '@bsc/core';

/**
 * Clase con las constantes del micro servicio de digitalización
 *
 * @export
 * @class ConstantesDigitalizacion
 * @typedef {ConstantesDigitalizacion}
 * @extends {Constantes}
 */
export class ConstantesDigitalizacion extends Constantes {

  public static readonly CT_ACTIVO = true;

  public static readonly BORRADO_LOGICO = false;

  //nombre del esquema de base de datos para las tablas de bsc
  public static readonly SCHEMA_BSC = 'public';


  public static DIGITALIZACION = {
    HOST: process.env.MS_DIGITALIZACION_HOST,
    PORT: parseInt(process.env.MS_DIGITALIZACION_PORT),
    NAME: 'ms-digitalizacion',
    PATTERN: {
      PROVINCIA_DIGITALIZACION_COLLECTION: 'PROVINCIA_DIGITALIZACION_COLLECTION',
      PROVINCIA_DIGITALIZACION_BY_ID: 'PROVINCIA_DIGITALIZACION_BY_ID',
      CANTON_DIGITALIZACION_COLLECTION: 'CANTON_DIGITALIZACION_COLLECTION',
      PARROQUIA_DIGITALIZACION_COLLECTION: 'PARROQUIA_DIGITALIZACION_COLLECTION',
      ZONA_DIGITALIZACION_COLLECTION: 'ZONA_DIGITALIZACION_COLLECTION',
      JUNTA_DIGITALIZACION_COLLECTION: 'JUNTA_DIGITALIZACION_COLLECTION',
      ACTA_BY_JUNTA_DIGITALIZACION_LIST: 'ACTA_BY_JUNTA_DIGITALIZACION_LIST',
      DIGNIDAD_DIGITALIZACION_COLLECTION: 'DIGNIDAD_DIGITALIZACION_COLLECTION',
      ACTA_BY_DIGNIDAD_DIGITALIZACION_LIST: 'ACTA_BY_DIGNIDAD_DIGITALIZACION_LIST',
      ACTA_UPDATE_DIG_DIGITALIZACIION: 'ACTA_UPDATE_DIG_DIGITALIZACIION',

      VOTOS_UPDATE_DIG_DIGITALIZACION: 'VOTOS_UPDATE_DIG_DIGITALIZACION',
      ACTA_COLLECTION_DIGITALIZACION: 'ACTA_COLLECTION_DIGITALIZACION',
      ACTA_LIBERA_DIGITALIZACION: 'ACTA_LIBERA_DIGITALIZACION'
    },
  };

  public static readonly TYPEORM_CONFIG = 'database.config';
  public static readonly TYPEORM_MONGO_CONFIG = 'database.configMongo';
  public static readonly PINO_LOGGER_CONFIG = 'pino-logger.config';
}
