import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { MenuEntity } from './menu.entity';


@Entity({ name: 'modulo', schema: ConstantesAdministracion.SCHEMA_BSC })
export class ModuloEntity {
  
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
