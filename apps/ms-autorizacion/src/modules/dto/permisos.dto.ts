
import { Menu } from './menu.dto';


/**
 * DTO de respuesta para entity de permisos
 *
 * @export
 * @class Permisos
 * @typedef {Permisos}
 */
export class Permisos {
    id: number;
    crear: boolean;
    editar: boolean;
    leer: boolean;
    eliminar: boolean;
    imprimir: boolean;
    menu: Menu;
}