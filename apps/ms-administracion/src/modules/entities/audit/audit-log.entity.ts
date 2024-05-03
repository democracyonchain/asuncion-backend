import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity({ name: 'auditAdministracion' })
export class AuditLog {
  
  @ObjectIdColumn()
  id: string;

  @Column()
  userId: number;

  @Column()
  action: string;

  @Column()
  entidad: string;

  @Column()
  data: any;

}