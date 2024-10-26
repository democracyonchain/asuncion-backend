import { numberWhereInput, stringWhereInput } from '@bsc/core';
import { Provincia } from './provincia.dto';
import { Canton } from './canton.dto';
import { Parroquia } from './parroquia.dto';
import { Zona } from './zona.dto';

/**
 * DTO para filtrar la coleccioń de junta
 *
 * @export
 * @class JuntaFilterInput
 * @typedef {JuntaFilterInput}
 */
export class JuntaFilterInput {
  readonly provincia_id?: numberWhereInput;
  readonly canton_id?: numberWhereInput;
  readonly parroquia_id?: numberWhereInput;
  readonly zona_id?: numberWhereInput;
  readonly sexo?: stringWhereInput;
}


/**
 * DTO para devolver información de la junta
 *
 * @export
 * @class Junta
 * @typedef {Junta}
 */
export class Junta{

    id: number;
    junta: number;
    sexo: string;
    electores: number;
    provincia: Provincia;
    canton: Canton;
    parroquia: Parroquia;
    zona: Zona;
}