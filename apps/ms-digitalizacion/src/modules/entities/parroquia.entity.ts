import {Column, Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { CantonEntity } from './canton.entity';
import { ZonaEntity } from './zona.entity';
import { JuntaEntity } from './junta.entity';



/**
 * Clase con el mapeo de los campos de la tabla parroquia con sus respectivas relaciones
 *
 * @export
 * @class ParroquiaEntity
 * @typedef {ParroquiaEntity}
 */
@Entity({ name: 'parroquia', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class ParroquiaEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @Column({ name: 'canton_id', type: 'integer', nullable: false })
  canton_id: number;

  @ManyToOne(() => CantonEntity, (canton) => canton.parroquia)
  @JoinColumn([{ name: 'canton_id', referencedColumnName: 'id' }])
  canton: CantonEntity;

  @OneToMany(() => ZonaEntity, (zona) => zona.parroquia)
  zona: ZonaEntity[];

  @OneToMany(() => JuntaEntity, (junta) => junta.parroquia)
  junta: JuntaEntity[];
}