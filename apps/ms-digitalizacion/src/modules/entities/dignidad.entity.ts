import {Column, Entity,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ActaEntity } from './acta.entity';
import { CandidatoEntity } from './candidato.entity';



@Entity({ name: 'dignidad', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class DignidadEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @Column({ name: 'ambito', type: 'character', length: 1, nullable: true })
  ambito: string;

  @Column({ name: 'estado', type: 'smallint', nullable: true })
  estado: number;

  @Column({ name: 'orden', type: 'integer', nullable: true })
  orden: number;

  @OneToMany(() => ActaEntity, (acta) => acta.dignidad)
  acta: ActaEntity[];

  @OneToMany(() =>CandidatoEntity, (candidato) => candidato.dignidad)
  candidato: CandidatoEntity[];
}