import { Injectable } from '@nestjs/common';
import { AuditLog } from '../entities/audit/audit-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerBase } from '@bsc/core';
import { AuditLogRepository } from '../repositories/audit-log.repository';

@Injectable()
export class AuditLogManager extends ManagerBase<AuditLog, AuditLogRepository> {
  constructor(
    @InjectRepository(AuditLog, "mongodb")
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {
    super();
  }

  async logEvent(action: string, entidad: string, userId: number, data?:any): Promise<void> {
    const newAuditLog = new AuditLog();
    newAuditLog.userId = userId;
    newAuditLog.action = action;
    newAuditLog.entidad = entidad;
    newAuditLog.data = data;
    await this.insertMongo(newAuditLog,this.auditLogRepository);
  }
}