import { Modulo } from './modulo.dto';

/**
 * DTO de respuesta para entity de menu
 *
 * @export
 * @class Menu
 * @typedef {Menu}
 */
export class Menu {
    id: number;
    titulo: string;
    modulo: Modulo;
;
}