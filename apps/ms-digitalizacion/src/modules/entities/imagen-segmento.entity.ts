import {Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';


/**
 * Clase con el mapeo de los campos de la tabla imagensegmento con sus respectivas relaciones
 *
 * @export
 * @class ImagenSegmentoEntity
 * @typedef {ImagenSegmentoEntity}
 */
@Entity({ name: 'imagensegmento', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class ImagenSegmentoEntity {

    @PrimaryGeneratedColumn({ name: 'junta_id'})
    junta_id: number;

    @PrimaryGeneratedColumn({ name: 'dignidad_id'})
    dignidad_id: number;

    @PrimaryGeneratedColumn({ name: 'candidato_id'})
    candidato_id: number;

    @Column({ name: 'nombre', type: 'character', length: 250, nullable: true })
    nombre: string;

    @Column({ name: 'hash', type: 'character', length: 250, nullable: true })
    hash: string;

    @Column({ name: 'pathipfs', type: 'character', length: 250, nullable: true })
    pathipfs: string;

    @Column({ name: "imagen", type: "bytea", nullable: false })
    imagen: Buffer;
}