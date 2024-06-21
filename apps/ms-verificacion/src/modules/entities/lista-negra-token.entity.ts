import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesVerificacion } from '../../common/constantes-verificacion';


@Entity({ name: 'listanegratoken', schema: ConstantesVerificacion.SCHEMA_BSC })
export class ListaNegraTokenEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'token', type: 'character', length: 500, nullable: false })
  token: string;
}