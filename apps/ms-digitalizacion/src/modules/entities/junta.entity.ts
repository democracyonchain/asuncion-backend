import {Column, Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { ProvinciaEntity } from './provincia.entity';
import { CantonEntity } from './canton.entity';
import { ParroquiaEntity } from './parroquia.entity';
import { ActaEntity } from './acta.entity';



@Entity({ name: 'junta', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class JuntaEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'provincia_id', type: 'integer', nullable: false })
  provincia_id: number;

  @Column({ name: 'canton_id', type: 'integer', nullable: false })
  canton_id: number;

  @Column({ name: 'parroquia_id', type: 'integer', nullable: false })
  parroquia_id: number;

  @Column({ name: 'zona_id', type: 'integer', nullable: false })
  zona_id: number;

  @Column({ name: 'junta', type: 'integer', nullable: true })
  junta: number;

  @Column({ name: 'sexo', type: 'character', length: 50, nullable: false })
  sexo: string;

  @Column({ name: 'electores', type: 'integer', nullable: true })
  electores: number;

  @ManyToOne(() => ProvinciaEntity, (provincia) => provincia.junta)
  @JoinColumn([{ name: 'provincia_id', referencedColumnName: 'id' }])
  provincia: ProvinciaEntity;

  @ManyToOne(() => CantonEntity, (canton) => canton.junta)
  @JoinColumn([{ name: 'canton_id', referencedColumnName: 'id' }])
  canton: CantonEntity;

  @ManyToOne(() => ParroquiaEntity, (parroquia) => parroquia.junta)
  @JoinColumn([{ name: 'canton_id', referencedColumnName: 'id' }])
  parroquia: ParroquiaEntity;

  @OneToMany(() => ActaEntity, (acta) => acta.junta)
  acta: ActaEntity[];
  
}