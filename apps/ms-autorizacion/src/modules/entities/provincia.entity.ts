import {Column, Entity,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';
import { UsuarioEntity } from './usuario.entity';


/**
 * Clase con el mapeo de los campos de la tabla provincia con sus respectivas relaciones
 *
 * @export
 * @class ProvinciaEntity
 * @typedef {ProvinciaEntity}
 */
@Entity({ name: 'provincia', schema: ConstantesAutorizacion.SCHEMA_BSC })
export class ProvinciaEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @OneToMany(() => UsuarioEntity, (usuario) => usuario.provincia)
  usuario: UsuarioEntity[];
}