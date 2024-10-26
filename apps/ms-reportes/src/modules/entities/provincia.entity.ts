import {Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesReportes } from '../../common/constantes-reportes';



/**
 * Clase con el mapeo de los campos de la tabla provincia con sus respectivas relaciones
 *
 * @export
 * @class ProvinciaEntity
 * @typedef {ProvinciaEntity}
 */
@Entity({ name: 'provincia', schema: ConstantesReportes.SCHEMA_BSC })
export class ProvinciaEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;
}