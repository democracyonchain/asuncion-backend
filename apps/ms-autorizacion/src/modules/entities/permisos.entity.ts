import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';
import { RolEntity } from './rol.entity';
import { MenuEntity } from './menu.entity';


@Entity({ name: 'permisos', schema: ConstantesAutorizacion.SCHEMA_BSC })
export class PermisosEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

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

  @ManyToOne(() => RolEntity, (rol) => rol.permisos)
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol: RolEntity;

  @ManyToOne(() => MenuEntity, (menu) => menu.permisos)
  @JoinColumn([{ name: 'menu_id', referencedColumnName: 'id' }])
  menu: MenuEntity;

  @Column({ name: 'activo', type: 'boolean',  nullable: false })
  activo: boolean;
  
}
