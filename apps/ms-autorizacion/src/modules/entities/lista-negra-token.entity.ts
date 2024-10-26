import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';


/**
 * Clase con el mapeo de los campos de la tabla listanegra con sus respectivas relaciones
 *
 * @export
 * @class ListaNegraTokenEntity
 * @typedef {ListaNegraTokenEntity}
 */
@Entity({ name: 'listanegratoken', schema: ConstantesAutorizacion.SCHEMA_BSC })
export class ListaNegraTokenEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'token', type: 'character', length: 500, nullable: false })
  token: string;
}