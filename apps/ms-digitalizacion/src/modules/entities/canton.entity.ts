import {Column, Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ProvinciaEntity } from './provincia.entity';
import { ParroquiaEntity } from './parroquia.entity';
import { JuntaEntity } from './junta.entity';



@Entity({ name: 'canton', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class CantonEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @Column({ name: 'provincia_id', type: 'integer', nullable: false })
  provincia_id: number;

  @ManyToOne(() => ProvinciaEntity, (provincia) => provincia.canton)
  @JoinColumn([{ name: 'provincia_id', referencedColumnName: 'id' }])
  provincia: ProvinciaEntity;

  @OneToMany(() => ParroquiaEntity, (parroquia) => parroquia.canton)
  parroquia: ParroquiaEntity[];

  @OneToMany(() => JuntaEntity, (junta) => junta.canton)
  junta: JuntaEntity[];
}