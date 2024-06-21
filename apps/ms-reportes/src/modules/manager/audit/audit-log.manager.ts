import { Injectable } from '@nestjs/common';
import { AuditLog } from '../../entities/audit/audit-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerBase,diff } from '@bsc/core';
import { AuditLogRepository } from '../../repositories/audit/audit-log.repository';

@Injectable()
export class AuditLogManager extends ManagerBase<AuditLog, AuditLogRepository> {
  constructor(
    @InjectRepository(AuditLog, "mongodb")
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {
    super();
  }

  async logEvent<T>(action: string, entidad: string, userId: number,registroId:number, oldEntity: T, newEntity: T) {
    const changes = diff(oldEntity, newEntity);
    const newAuditLog = new AuditLog();
    newAuditLog.registroId = registroId;
    newAuditLog.userId = userId;
    newAuditLog.fechacreacion = new Date();
    newAuditLog.action = action;
    newAuditLog.entidad = entidad;
    newAuditLog.datachange = changes;
    if(Object.keys(changes).length>0){
      await this.insertMongo(newAuditLog,this.auditLogRepository);
    } 
  }
}