import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { RolEntity } from './rol.entity';
import { MenuEntity } from './menu.entity';


/**
 * Clase con el mapeo de los campos de la tabla permisos con sus respectivas relaciones
 *
 * @export
 * @class PermisosEntity
 * @typedef {PermisosEntity}
 */
@Entity({ name: 'permisos', schema: ConstantesAdministracion.SCHEMA_BSC })
export class PermisosEntity {
  
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

  @Column({ name: 'rol_id', type: 'integer', nullable: false })
  rol_id: number;

  @Column({ name: 'menu_id', type: 'integer', nullable: false })
  menu_id: number;

  @Column({ name: 'estado', type: 'boolean',  nullable: false })
  estado: boolean;

  @Column({ name: 'crear', type: 'boolean',  nullable: false })
  crear: boolean;

  @Column({ name: 'editar', type: 'boolean',  nullable: false })
  editar: boolean;

  @Column({ name: 'leer', type: 'boolean',  nullable: false })
  leer: boolean;

  @Column({ name: 'eliminar', type: 'boolean',  nullable: false })
  eliminar: boolean;

  @Column({ name: 'imprimir', type: 'boolean',  nullable: false })
  imprimir: boolean;

  @ManyToOne(() => RolEntity, (rol) => rol.permisos,{ onDelete: 'CASCADE', orphanedRowAction: 'delete'})
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol: RolEntity;

  @ManyToOne(() => MenuEntity, (menu) => menu.permisos)
  @JoinColumn([{ name: 'menu_id', referencedColumnName: 'id' }])
  menu: MenuEntity;

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
