import { Constructable, RepositoryOrmBase } from '@bsc/core';
import { Injectable } from '@nestjs/common';
import { AuditLog } from '../entities/audit/audit-log.entity';

type EntityFields = keyof AuditLog;

@Injectable()
export class AuditLogRepository extends RepositoryOrmBase<AuditLog> {
  protected entity: Constructable<AuditLog> = AuditLog;
}