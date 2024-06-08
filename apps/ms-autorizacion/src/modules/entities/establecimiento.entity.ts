import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ConstantesAutorizacion } from "../../common/constantes-autorizacion";
import { UsuarioEntity } from "./usuario.entity";

@Entity({ name: 'establecimiento', schema: ConstantesAutorizacion.SCHEMA_BSC })
export class EstablecimientoEntity {

    @PrimaryGeneratedColumn({ name: 'id'})
    id: number;

    @Column({ name: 'nombre', type: 'character', length: 200, nullable: false })
    nombre: string;

    @Column({ name: "logo", type: "bytea", nullable: false })
    logo: Buffer;

    @OneToMany(() => UsuarioEntity, (usuario) => usuario.establecimiento)
    usuario: UsuarioEntity[];
}