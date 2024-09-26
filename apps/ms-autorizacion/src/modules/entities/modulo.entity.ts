import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';
import { MenuEntity } from './menu.entity';


/**
 * Clase con el mapeo de los campos de la tabla modulo con sus respectivas relaciones
 *
 * @export
 * @class ModuloEntity
 * @typedef {ModuloEntity}
 */
@Entity({ name: 'modulo', schema: ConstantesAutorizacion.SCHEMA_BSC })
export class ModuloEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'nombre', type: 'character', length: 50, nullable: false })
  nombre: string;

  @Column({ name: 'codigo', type: 'character', length: 10, nullable: false })
  codigo: string;

  @Column({ name: 'url', type: 'character', length: 100, nullable: false })
  url: string;

  @Column({ name: 'icono', type: 'character', length: 50, nullable: false })
  icono: string;

  @Column({ name: 'estado', type: 'boolean',  nullable: false })
  estado: boolean;

  @OneToMany(() => MenuEntity, (menu) => menu.modulo)
  menu: MenuEntity[];

  @Column({ name: 'color', type: 'character', length: 50, nullable: false })
  color: string;

  @Column({ name: 'activo', type: 'boolean',  nullable: false })
  activo: boolean;
  
}
