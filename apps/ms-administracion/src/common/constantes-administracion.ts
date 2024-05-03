
import { Constantes } from '@bsc/core';

export class ConstantesAdministracion extends Constantes {
  //Constantes generales

  // Id del registro catalogo de antecedentes familiares
  public static readonly CT_ANTECEDENTES_FAMILIARES_ID = 237;

  // Id del registro catalogo de antecedentes personales
  public static readonly CT_ANTECEDENTES_PERSONALES_ID = 237;

  // Id del tipo de catalogo con atención finalizada
  public static readonly CT_ATENCIONFINALIZADA = 222;

  public static readonly CT_ACTIVO = 1;

  public static readonly BORRADO_LOGICO = 0;

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
    },
  };

  public static readonly TYPEORM_CONFIG = 'database.config';
  public static readonly TYPEORM_MONGO_CONFIG = 'database.configMongo';
  public static readonly PINO_LOGGER_CONFIG = 'pino-logger.config';
}
