import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ConstantesDigitalizacion } from '../../common/constantes-digitalizacion';


@Entity({ name: 'listanegratoken', schema: ConstantesDigitalizacion.SCHEMA_BSC })
export class ListaNegraTokenEntity {
  
  @PrimaryGeneratedColumn({ name: 'id'})
  id: number;

  @Column({ name: 'token', type: 'character', length: 500, nullable: false })
  token: string;
}