import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';
import { UsuarioEntity } from './usuario.entity';
import { RolEntity } from './rol.entity';


@Entity({ name: 'rolusuario', schema: ConstantesAutorizacion.SCHEMA_BSC })
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

  @ManyToOne(() => RolEntity, (rol) => rol.rolusuario)
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol: RolEntity;

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