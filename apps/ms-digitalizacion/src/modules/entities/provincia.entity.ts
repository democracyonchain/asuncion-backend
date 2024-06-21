import {Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';



@Entity({ name: 'provincia', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class ProvinciaEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;
}