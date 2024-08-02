import {Column, Entity,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { CantonEntity } from './canton.entity';
import { JuntaEntity } from './junta.entity';



@Entity({ name: 'provincia', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class ProvinciaEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @OneToMany(() => CantonEntity, (canton) => canton.provincia)
  canton: CantonEntity[];

  @OneToMany(() => JuntaEntity, (junta) => junta.provincia)
  junta: JuntaEntity[];
  
}