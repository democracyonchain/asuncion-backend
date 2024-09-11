import {Column, Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { VotosEntity } from './votos.entity';
import { DignidadEntity } from './dignidad.entity';
import { JuntaEntity } from './junta.entity';



@Entity({ name: 'acta', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class ActaEntity {

  
    @PrimaryGeneratedColumn({ name: 'id'})
    id: number;

    @Column({ name: 'dignidad_id', type: 'integer', nullable: true })
    dignidad_id: number;

    @Column({ name: 'junta_id', type: 'integer', nullable: true })
    junta_id: number;

    @Column({ name: 'seguridad', type: 'integer', nullable: true })
    seguridad: number;

    @Column({ name: 'estado', type: 'integer', nullable: true })
    estado: number;

    @Column({ name: 'usuarioescaneo', type: 'integer', nullable: true })
    usuarioescaneo: number;

    @Column({ name: 'fechaescaneo', type: 'date', nullable: true })
    fechaescaneo: number;

    @Column({ name: 'usuariodigitacion', type: 'integer', nullable: true })
    usuariodigitacion: number;

    @Column({ name: 'fechadigitacion', type: 'date', nullable: true })
    fechadigitacion: number;

    @Column({ name: 'usuariocontrol', type: 'integer', nullable: true })
    usuariocontrol: number;

    @Column({ name: 'fechacontrol', type: 'date', nullable: true })
    fechacontrol: number;

    @Column({ name: 'peticion', type: 'integer', nullable: true })
    peticion: number;

    @Column({ name: 'sufragantesicr', type: 'integer', nullable: true })
    sufragantesicr: number;

    @Column({ name: 'sufragantesdigitacion', type: 'integer', nullable: true })
    sufragantesdigitacion: number;

    @Column({ name: 'sufragantescontrol', type: 'integer', nullable: true })
    sufragantescontrol: number;

    @Column({ name: 'sufragantes', type: 'integer', nullable: true })
    sufragantes: number;

    @Column({ name: 'blancosicr', type: 'integer', nullable: true })
    blancosicr: number;

    @Column({ name: 'blancosdigitacion', type: 'integer', nullable: true })
    blancosdigitacion: number;

    @Column({ name: 'blancoscontrol', type: 'integer', nullable: true })
    blancoscontrol: number;

    @Column({ name: 'blancos', type: 'integer', nullable: true })
    blancos: number;

    @Column({ name: 'nulosicr', type: 'integer', nullable: true })
    nulosicr: number;

    @Column({ name: 'nulosdigitacion', type: 'integer', nullable: true })
    nulosdigitacion: number;

    @Column({ name: 'nulos', type: 'integer', nullable: true })
    nulos: number;

    @OneToMany(() => VotosEntity, (votos) => votos.acta)
    votos: VotosEntity[];

    @ManyToOne(() => DignidadEntity, (dignidad) => dignidad.acta)
    @JoinColumn([{ name: 'dignidad_id', referencedColumnName: 'id' }])
    dignidad: DignidadEntity;

    @ManyToOne(() => JuntaEntity, (junta) => junta.acta)
    @JoinColumn([{ name: 'junta_id', referencedColumnName: 'id' }])
    junta: JuntaEntity;

    @Column({ name: 'bloqueo', type: 'boolean',  nullable: false })
    bloqueo: boolean;
}