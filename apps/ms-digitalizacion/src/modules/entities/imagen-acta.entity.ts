import {Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';

@Entity({ name: 'imagenacta', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class ImagenActaEntity {

  
    @PrimaryGeneratedColumn({ name: 'acta_id'})
    acta_id: number;

    @Column({ name: 'nombre', type: 'character', length: 250, nullable: true })
    nombre: string;

    @Column({ name: 'pagina', type: 'integer', nullable: true })
    pagina: number;

    @Column({ name: 'hash', type: 'character', length: 250, nullable: true })
    hash: string;

    @Column({ name: 'pathipfs', type: 'character', length: 250, nullable: true })
    pathipfs: string;

    @Column({ name: "imagen", type: "bytea", nullable: false })
    imagen: Buffer;
}