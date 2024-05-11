import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';
import { RolUsuarioEntity } from './rol-usuario.entity';


@Entity({ name: 'usuario', schema: ConstantesAutorizacion.SCHEMA_BSC })
export class UsuarioEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'fechamodificacion', type: 'timestamp', nullable: true })
  fechamodificacion: Date;

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

  @OneToMany(() => RolUsuarioEntity, (rolusuario) => rolusuario.usuario)
  rolusuario: RolUsuarioEntity[];

  @Column({ name: 'ultimoacceso', type: 'timestamp', nullable: true })
  ultimoacceso: Date;

  @BeforeUpdate()
  async setUpdateDate() {
    this.fechamodificacion = new Date();
  }
}
