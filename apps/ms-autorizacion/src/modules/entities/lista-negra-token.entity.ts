import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesAutorizacion } from '../../common/constantes-autorizacion';


@Entity({ name: 'listanegratoken', schema: ConstantesAutorizacion.SCHEMA_BSC })
export class ListaNegraTokenEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'token', type: 'character', length: 500, nullable: false })
  token: string;
}