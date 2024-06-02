import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';
import { PermisosEntity } from './permisos.entity';
import { RolUsuarioEntity } from './rol-usuario.entity';


@Entity({ name: 'rol', schema: ConstantesAutorizacion.SCHEMA_BSC })
export class RolEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;


  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @Column({ name: 'descripcion', type: 'character', length: 250, nullable: false })
  descripcion: string;
  
  @Column({ name: 'estado', type: 'boolean',  nullable: false })
  estado: boolean;

  @OneToMany(() => PermisosEntity, (permisos) => permisos.rol)
  permisos: PermisosEntity[];

  @OneToMany(() => RolUsuarioEntity, (rolusuario) => rolusuario.rol)
  rolusuario: RolUsuarioEntity[];

  @Column({ name: 'activo', type: 'boolean',  nullable: false })
  activo: boolean;
  
}
