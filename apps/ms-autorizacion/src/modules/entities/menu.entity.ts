import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';
import { ModuloEntity } from './modulo.entity';
import { PermisosEntity } from './permisos.entity';


/**
 * Clase con el mapeo de los campos de la tabla menu con sus respectivas relaciones
 *
 * @export
 * @class MenuEntity
 * @typedef {MenuEntity}
 */
@Entity({ name: 'menu', schema: ConstantesAutorizacion.SCHEMA_BSC })
export class MenuEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'titulo', type: 'character', length: 50, nullable: false })
  titulo: string;

  @Column({ name: 'icono', type: 'character', length: 50, nullable: false })
  icono: string;

  @Column({ name: 'modulo_id', type: 'integer', nullable: false })
  modulo_id: number;

  @Column({ name: 'orden', type: 'integer', nullable: false })
  orden: number;
  
  @Column({ name: 'estado', type: 'boolean',  nullable: false })
  estado: boolean;

  @ManyToOne(() => ModuloEntity, (modulo) => modulo.menu)
  @JoinColumn([{ name: 'modulo_id', referencedColumnName: 'id' }])
  modulo: ModuloEntity;

  @OneToMany(() => PermisosEntity, (permisos) => permisos.menu)
  permisos: PermisosEntity[];

  @Column({ name: 'url', type: 'character', length: 100, nullable: false })
  url: string;

  @Column({ name: 'activo', type: 'boolean',  nullable: false })
  activo: boolean;
  
}
