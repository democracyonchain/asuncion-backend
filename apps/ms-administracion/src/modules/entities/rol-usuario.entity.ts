import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { UsuarioEntity } from './usuario.entity';
import { RolEntity } from './rol.entity';


/**
 * Clase con el mapeo de los campos de la tabla rolusuario con sus respectivas relaciones
 *
 * @export
 * @class RolUsuarioEntity
 * @typedef {RolUsuarioEntity}
 */
@Entity({ name: 'rolusuario', schema: ConstantesAdministracion.SCHEMA_BSC })
export class RolUsuarioEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'fechacreacion', type: 'timestamp', nullable: false })
  fechacreacion: Date;

  @Column({ name: 'fechamodificacion', type: 'timestamp', nullable: true })
  fechamodificacion: Date;

  @Column({ name: 'usuariocreacion_id', type: 'integer', nullable: false })
  usuariocreacion_id: number;

  @Column({ name: 'usuariomodificacion_id', type: 'integer', nullable: true })
  usuariomodificacion_id: number;

  @Column({ name: 'estado', type: 'boolean',  nullable: false })
  estado: boolean;

  @Column({ name: 'usuario_id', type: 'integer', nullable: false })
  usuario_id: number;

  @Column({ name: 'rol_id', type: 'integer', nullable: false })
  rol_id: number;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.rolusuario)
  @JoinColumn([{ name: 'usuario_id', referencedColumnName: 'id' }])
  usuario: UsuarioEntity;

  @ManyToOne(() => RolEntity, (rol) => rol.rolusuario,{ onDelete: 'CASCADE', orphanedRowAction: 'delete'})
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol: RolEntity;

  @Column({ name: 'activo', type: 'boolean',  nullable: false })
  activo: boolean;

  @BeforeInsert()
  async setCreateDate() {
    this.fechacreacion = new Date();
    this.estado = true;
  }

  @BeforeUpdate()
  async setUpdateDate() {
    this.fechamodificacion = new Date();
  }
}