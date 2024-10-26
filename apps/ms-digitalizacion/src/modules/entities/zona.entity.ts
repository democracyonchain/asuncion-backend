import {Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ParroquiaEntity } from './parroquia.entity';



/**
 * Clase con el mapeo de los campos de la tabla zona con sus respectivas relaciones
 *
 * @export
 * @class ZonaEntity
 * @typedef {ZonaEntity}
 */
@Entity({ name: 'zona', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class ZonaEntity {
  
  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @PrimaryGeneratedColumn({ name: 'parroquia_id' })
  parroquia_id: number;

  @PrimaryGeneratedColumn({ name: 'zona_id' })
  zona_id: number;

  @ManyToOne(() => ParroquiaEntity, (parroquia) => parroquia.zona)
  @JoinColumn([{ name: 'parroquia_id', referencedColumnName: 'id' }])
  parroquia: ParroquiaEntity;
}