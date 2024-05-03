import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAdministracion } from '../../common/constantes-administracion';
import { ModuloEntity } from './modulo.entity';
import { PermisosEntity } from './permisos.entity';


@Entity({ name: 'menu', schema: ConstantesAdministracion.SCHEMA_BSC })
export class MenuEntity {
  
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
