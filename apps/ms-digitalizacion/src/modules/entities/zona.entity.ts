import {Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ParroquiaEntity } from './parroquia.entity';



@Entity({ name: 'zona', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class ZonaEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @Column({ name: 'parroquia_id', type: 'integer', nullable: false })
  parroquia_id: number;

  @Column({ name: 'codigo', type: 'integer', nullable: false })
  codigo: number;

  @ManyToOne(() => ParroquiaEntity, (parroquia) => parroquia.zona)
  @JoinColumn([{ name: 'parroquia_id', referencedColumnName: 'id' }])
  parroquia: ParroquiaEntity;
}