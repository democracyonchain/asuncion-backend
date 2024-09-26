import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesVerificacion } from '../../common/constantes-verificacion';


/**
 * Clase con el mapeo de los campos de la tabla listanegratoken con sus respectivas relaciones
 *
 * @export
 * @class ListaNegraTokenEntity
 * @typedef {ListaNegraTokenEntity}
 */
@Entity({ name: 'listanegratoken', schema: ConstantesVerificacion.SCHEMA_BSC })
export class ListaNegraTokenEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'token', type: 'character', length: 500, nullable: false })
  token: string;
}