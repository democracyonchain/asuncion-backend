import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'auditAutorizacion' })
export class AuditLog {
  
  @ObjectIdColumn()
  id: string;

  @Column()
  registroId: number;

  @Column()
  fechacreacion: Date;

  @Column()
  userId: number;

  @Column()
  action: string;

  @Column()
  entidad: string;

  @Column()
  datachange: any;

}