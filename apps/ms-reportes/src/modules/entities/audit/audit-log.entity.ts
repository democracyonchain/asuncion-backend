import { Entity, Column, ObjectIdColumn } from 'typeorm';

/**
 * Clase con el mapeo de los campos de las tablas de auditoria
 *
 * @export
 * @class AuditLog
 * @typedef {AuditLog}
 */
@Entity({ name: 'auditReportes' })
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