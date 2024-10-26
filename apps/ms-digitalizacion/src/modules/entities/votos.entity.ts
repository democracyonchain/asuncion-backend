import {Column, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';
import { CandidatoEntity } from './candidato.entity';
import { ActaEntity } from './acta.entity';



/**
 * Clase con el mapeo de los campos de la tabla votos con sus respectivas relaciones
 *
 * @export
 * @class VotosEntity
 * @typedef {VotosEntity}
 */
@Entity({ name: 'votos', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class VotosEntity {
    @PrimaryGeneratedColumn({ name: 'acta_id' })
    acta_id: number;

    @PrimaryGeneratedColumn({ name: 'candidato_id' })
    candidato_id: number;

    @Column({ name: 'votosicr', type: 'integer', nullable: true })
    votosicr: number;

    @Column({ name: 'votosdigitacion', type: 'integer', nullable: true })
    votosdigitacion: number;

    @Column({ name: 'votoscontrol', type: 'integer', nullable: true })
    votoscontrol: number;

    @Column({ name: 'votos', type: 'integer', nullable: true })
    votos: number;

    @Column({ name: 'usuariodigitacion', type: 'integer', nullable: true })
    usuariodigitacion: number;

    @Column({ name: 'usuariocontrol', type: 'integer', nullable: true })
    usuariocontrol: number;

    @Column({ name: 'cifrado', type: 'text', nullable: true })
    cifrado: string;

    @Column({ name: 'cifrado', type: 'text', nullable: true })
    hash: string;

    @ManyToOne(() => CandidatoEntity, (candidato) => candidato.votos)
    @JoinColumn([{ name: 'candidato_id', referencedColumnName: 'id' }])
    candidato: CandidatoEntity;

    @ManyToOne(() => ActaEntity, (acta) => acta.votos)
    @JoinColumn([{ name: 'acta_id', referencedColumnName: 'id' }])
    acta: ActaEntity;
}