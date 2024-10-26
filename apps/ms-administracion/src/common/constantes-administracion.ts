import { Constantes } from '@bsc/core';

/**
 * Clase con las constantes del micro servicio de administración
 *
 * @export
 * @class ConstantesAdministracion
 * @typedef {ConstantesAdministracion}
 * @extends {Constantes}
 */
export class ConstantesAdministracion extends Constantes {
  
  public static readonly CT_ACTIVO = true;

  public static readonly BORRADO_LOGICO = false;

  //nombre del esquema de base de datos para las tablas de bsc
  public static readonly SCHEMA_BSC = 'public';


  public static ADMINISTRACION = {
    HOST: process.env.MS_ADMINISTRACION_HOST,
    PORT: parseInt(process.env.MS_ADMINISTRACION_PORT),
    NAME: 'ms-administracion',
    PATTERN: {

      USUARIO_COLLECTION: 'USUARIO_COLLECTION',
      USUARIO_BY_ID: 'USUARIO_BY_ID',
      USUARIO_CREATE: 'USUARIO_CREATE',
      USUARIO_UPDATE: 'USUARIO_UPDATE',
      USUARIO_DELETE: 'USUARIO_DELETE',
      
      SAVE_PROVEEDOR:'SAVE_PROVEEDOR',
      GET_PROVEEDOR:'GET_PROVEEDOR',
      GET_PROVEEDORID:'GET_PROVEEDORID',
      UPDATE_PROVEEDOR:'UPDATE_PROVEEDOR',

      MODULO_CREATE: 'MODULO_CREATE',
      MODULO_UPDATE: 'MODULO_UPDATE',
      MODULO_DELETE: 'MODULO_DELETE',
      MODULO_COLLECTION: 'MODULO_COLLECTION',
      MODULO_BY_ID: 'MODULO_BY_ID',

      MENU_CREATE: 'MENU_CREATE',
      MENU_UPDATE: 'MENU_UPDATE',
      MENU_DELETE: 'MENU_DELETE',
      MENU_COLLECTION: 'MENU_COLLECTION',
      MENU_BY_ID: 'MENU_BY_ID',

      ROL_CREATE: 'ROL_CREATE',
      ROL_UPDATE: 'ROL_UPDATE',
      ROL_DELETE: 'ROL_DELETE',
      ROL_COLLECTION: 'ROL_COLLECTION',
      ROL_BY_ID: 'ROL_BY_ID',

      ESTABLECIMIENTO_CREATE: 'ESTABLECIMIENTO_CREATE',
      ESTABLECIMIENTO_UPDATE: 'ESTABLECIMIENTO_UPDATE',
      ESTABLECIMIENTO_DELETE: 'ESTABLECIMIENTO_DELETE',
      ESTABLECIMIENTO_COLLECTION: 'ESTABLECIMIENTO_COLLECTION',
      ESTABLECIMIENTO_BY_ID: 'ESTABLECIMIENTO_BY_ID',

      PROVINCIA_COLLECTION: 'PROVINCIA_COLLECTION',
      PROVINCIA_BY_ID: 'PROVINCIA_BY_ID',

      CONFIGURACION_COLLECTION: 'CONFIGURACION_COLLECTION'
    },
  };

  public static readonly TYPEORM_CONFIG = 'database.config';
  public static readonly TYPEORM_MONGO_CONFIG = 'database.configMongo';
  public static readonly PINO_LOGGER_CONFIG = 'pino-logger.config';
}
