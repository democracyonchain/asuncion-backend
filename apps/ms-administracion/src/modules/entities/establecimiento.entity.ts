import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConstantesAdministracion } from "../../common/constantes-administracion";
import { UsuarioEntity } from "./usuario.entity";

@Entity({ name: 'establecimiento', schema: ConstantesAdministracion.SCHEMA_BSC })
export class EstablecimientoEntity {

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

    @Column({ name: 'nombre', type: 'character', length: 200, nullable: false })
    nombre: string;

    @Column({ name: "logo", type: "bytea", nullable: false })
    logo: Buffer;

    @OneToMany(() => UsuarioEntity, (usuario) => usuario.establecimiento)
    usuario: UsuarioEntity[];

    @Column({ name: 'estado', type: 'boolean',  nullable: false })
    estado: boolean;


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