import {Column, Entity,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ActaEntity } from './acta.entity';
import { CandidatoEntity } from './candidato.entity';



/**
 * Clase con el mapeo de los campos de la tabla dignidad con sus respectivas relaciones
 *
 * @export
 * @class DignidadEntity
 * @typedef {DignidadEntity}
 */
@Entity({ name: 'dignidad', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class DignidadEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @Column({ name: 'ambito', type: 'character', length: 1, nullable: true })
  ambito: string;

  @Column({ name: 'estado', type: 'smallint', nullable: true })
  estado: number;

  @Column({ name: 'orden', type: 'integer', nullable: true })
  orden: number;

  @OneToMany(() => ActaEntity, (acta) => acta.dignidad)
  acta: ActaEntity[];

  @OneToMany(() =>CandidatoEntity, (candidato) => candidato.dignidad)
  candidato: CandidatoEntity[];
}