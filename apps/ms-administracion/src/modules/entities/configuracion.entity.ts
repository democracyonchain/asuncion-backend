import { Column, Entity,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';


/**
 * Clase con el mapeo de los campos de la tabla configuración con sus respectivas relaciones
 * @export
 * @class ConfiguracionEntity
 * @typedef {ConfiguracionEntity}
 */
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