import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { PermisosEntity } from './permisos.entity';
import { RolUsuarioEntity } from './rol-usuario.entity';


@Entity({ name: 'rol', schema: ConstantesAdministracion.SCHEMA_BSC })
export class RolEntity {
  
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

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', type: 'character', length: 250, nullable: false })
  descripcion: string;
  
  @Column({ name: 'estado', type: 'boolean',  nullable: false })
  estado: boolean;

  @OneToMany(() => PermisosEntity, (permisos) => permisos.rol, { cascade: ['insert', 'update', 'remove'] })
  permisos: PermisosEntity[];

  @OneToMany(() => RolUsuarioEntity, (rolusuario) => rolusuario.rol)
  rolusuario: RolUsuarioEntity[];

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
