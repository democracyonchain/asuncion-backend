/**
 * DTO para insertar o actualizar datos de permisos
 *
 * @export
 * @class PermisosDTO
 * @typedef {PermisosDTO}
 */
export class PermisosDTO {
    menu_id: number;
    crear: boolean;
    editar: boolean;
    leer: boolean;
    eliminar: boolean;
    imprimir: boolean;
}