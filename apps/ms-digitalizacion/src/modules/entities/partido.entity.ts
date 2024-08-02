import {Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';



@Entity({ name: 'partido', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class PartidoEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 1000, nullable: false })
  nombre: string;

  @Column({ name: 'siglas', type: 'character', length: 150, nullable: false })
  siglas: string;

  @Column({ name: 'lista', type: 'character', length: 50, nullable: false })
  lista: string;

  @Column({ name: 'orden', type: 'integer', nullable: false })
  orden: number;

  @Column({ name: "imagen", type: "bytea", nullable: true })
  imagen: Buffer;

}