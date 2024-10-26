import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';


/**
 * Clase con el mapeo de los campos de la tabla listanegra con sus respectivas relaciones
 *
 * @export
 * @class ListaNegraTokenEntity
 * @typedef {ListaNegraTokenEntity}
 */
@Entity({ name: 'listanegratoken', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class ListaNegraTokenEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'token', type: 'character', length: 500, nullable: false })
  token: string;
}