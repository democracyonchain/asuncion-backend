import { Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';


@Entity({ name: 'configuracion', schema: ConstantesAdministracion.SCHEMA_BSC })
export class ConfiguracionEntity {

    @PrimaryGeneratedColumn({ name: 'id'})
    id: number;

    @Column({ name: 'codigoproceso', type: 'character', length: 20, nullable: false })
    codigoproceso: string;

    @Column({ name: 'nombreproceso', type: 'character', length: 150, nullable: false })
    nombreproceso: string;

    @Column({ name: 'fechaproceso', type: 'date', nullable: false })
    fechaproceso: Date;

    @Column({ name: 'estado', type: 'boolean',  nullable: false })
    estado: boolean;
}