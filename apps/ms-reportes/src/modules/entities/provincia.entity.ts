import {Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesReportes } from '../../common/constantes-reportes';



@Entity({ name: 'provincia', schema: ConstantesReportes.SCHEMA_BSC })
export class ProvinciaEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;
}