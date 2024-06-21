import {Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesVerificacion } from '../../common/constantes-verificacion';



@Entity({ name: 'provincia', schema: ConstantesVerificacion.SCHEMA_BSC })
export class ProvinciaEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;
}