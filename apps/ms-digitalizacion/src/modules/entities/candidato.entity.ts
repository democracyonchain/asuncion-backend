import {Column, Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { VotosEntity } from './votos.entity';
import { PartidoEntity } from './partido.entity';
import { DignidadEntity } from './dignidad.entity';



@Entity({ name: 'candidato', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class CandidatoEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'cedula', type: 'character', length: 10, nullable: true })
  cedula: string;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @Column({ name: 'partido_id', type: 'integer', nullable: true })
  partido_id: number;

  @Column({ name: 'dignidad_id', type: 'integer', nullable: true })
  dignidad_id: number;

  @OneToMany(() => VotosEntity, (votos) => votos.candidato)
  votos: VotosEntity[];

  @ManyToOne(() => PartidoEntity, (partido) => partido.candidato)
  @JoinColumn([{ name: 'partido_id', referencedColumnName: 'id' }])
  partido: PartidoEntity;

  @ManyToOne(() => DignidadEntity, (dignidad) => dignidad.candidato)
  @JoinColumn([{ name: 'dignidad_id', referencedColumnName: 'id' }])
  dignidad: DignidadEntity;

  @Column({ name: 'orden', type: 'integer', nullable: true })
  orden: number;
}