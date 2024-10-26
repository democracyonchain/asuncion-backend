import { Constantes } from '@bsc/core';

/**
 * Clase con las constantes del micro servicio de reportes
 *
 * @export
 * @class ConstantesReportes
 * @typedef {ConstantesReportes}
 * @extends {Constantes}
 */
export class ConstantesReportes extends Constantes {

  public static readonly CT_ACTIVO = true;

  public static readonly BORRADO_LOGICO = false;

  //nombre del esquema de base de datos para las tablas de bsc
  public static readonly SCHEMA_BSC = 'public';


  public static REPORTES = {
    HOST: process.env.MS_REPORTES_HOST,
    PORT: parseInt(process.env.MS_REPORTES_PORT),
    NAME: 'ms-reportes',
    PATTERN: {
      PROVINCIA_REPORTES_COLLECTION: 'PROVINCIA_REPORTES_COLLECTION',
      PROVINCIA_REPORTES_BY_ID: 'PROVINCIA_REPORTES_BY_ID'
    },
  };

  public static readonly TYPEORM_CONFIG = 'database.config';
  public static readonly TYPEORM_MONGO_CONFIG = 'database.configMongo';
  public static readonly PINO_LOGGER_CONFIG = 'pino-logger.config';
}
