import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { RolUsuarioEntity } from './rol-usuario.entity';
import { ProvinciaEntity } from './provincia.entity';
import { EstablecimientoEntity } from './establecimiento.entity';


@Entity({ name: 'usuario', schema: ConstantesAdministracion.SCHEMA_BSC })
export class UsuarioEntity {
  
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

  @Column({ name: 'username', type: 'character', length: 150, nullable: false })
  username: string;

  @Column({ name: 'nombres', type: 'character', length: 150, nullable: false })
  nombres: string;

  @Column({ name: 'apellidos', type: 'character', length: 150, nullable: false })
  apellidos: string;

  @Column({ name: 'email', type: 'character', length: 150, nullable: false })
  email: string;

  @Column({ name: 'password', type: 'character', length: 150, nullable: false })
  password: string;

  @Column({ name: 'estado', type: 'boolean',  nullable: false })
  estado: boolean;

  @Column({ name: 'provincia_id', type: 'integer', nullable: false })
  provincia_id: number;

  @Column({ name: 'activo', type: 'boolean',  nullable: false })
  activo: boolean;

  @Column({ name: 'establecimiento_id', type: 'integer', nullable: false })
  establecimiento_id: number;

  //relaciones
  @OneToMany(() => RolUsuarioEntity, (rolusuario) => rolusuario.usuario)
  rolusuario: RolUsuarioEntity[];

  @ManyToOne(() => ProvinciaEntity, (provincia) => provincia.usuario)
  @JoinColumn([{ name: 'provincia_id', referencedColumnName: 'id' }])
  provincia: ProvinciaEntity;

  @ManyToOne(() => EstablecimientoEntity, (establecimiento) => establecimiento.usuario)
  @JoinColumn([{ name: 'establecimiento_id', referencedColumnName: 'id' }])
  establecimiento: EstablecimientoEntity;

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
