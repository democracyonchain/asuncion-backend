import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { AuditLog } from '../../entities/audit/audit-log.entity';

type EntityFields = keyof AuditLog;

/**
 * Clase donde se realizan consultas mediante builder o nativas para la entity de auditorias
 *
 * @export
 * @class AuditLogRepository
 * @typedef {AuditLogRepository}
 * @extends {RepositoryOrmBase<AuditLog>}
 */
@Injectable()
export class AuditLogRepository extends RepositoryOrmBase<AuditLog> {
  protected entity: Constructable<AuditLog> = AuditLog;
}