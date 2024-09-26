import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';
import { UsuarioEntity } from './usuario.entity';
import { RolEntity } from './rol.entity';


/**
 * Clase con el mapeo de los campos de la tabla rol-usuario con sus respectivas relaciones
 *
 * @export
 * @class RolUsuarioEntity
 * @typedef {RolUsuarioEntity}
 */
@Entity({ name: 'rolusuario', schema: ConstantesAutorizacion.SCHEMA_BSC })
export class RolUsuarioEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'estado', type: 'boolean',  nullable: false })
  estado: boolean;

  @Column({ name: 'usuario_id', type: 'integer', nullable: false })
  usuario_id: number;

  @Column({ name: 'rol_id', type: 'integer', nullable: false })
  rol_id: number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.rolusuario)
  @JoinColumn([{ name: 'usuario_id', referencedColumnName: 'id' }])
  usuario: UsuarioEntity;

  @ManyToOne(() => RolEntity, (rol) => rol.rolusuario)
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol: RolEntity;

  @Column({ name: 'activo', type: 'boolean',  nullable: false })
  activo: boolean;

}