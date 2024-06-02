import {Column, Entity,OneToMany,PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { UsuarioEntity } from './usuario.entity';


@Entity({ name: 'provincia', schema: ConstantesAdministracion.SCHEMA_BSC })
export class ProvinciaEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @OneToMany(() => UsuarioEntity, (usuario) => usuario.provincia)
  usuario: UsuarioEntity[];
}