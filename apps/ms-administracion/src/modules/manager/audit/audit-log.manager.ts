import { Injectable } from '@nestjs/common';
import { AuditLog } from '../../entities/audit/audit-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerBase } from '@bsc/core';
import { AuditLogRepository } from '../../repositories/audit/audit-log.repository';

@Injectable()
export class AuditLogManager extends ManagerBase<AuditLog, AuditLogRepository> {
  constructor(
    @InjectRepository(AuditLog, "mongodb")
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {
    super();
  }

  async logEvent(action: string, entidad: string, userId: number, data?:any, dataOld?:any): Promise<void> {
    const newAuditLog = new AuditLog();
    newAuditLog.userId = userId;
    newAuditLog.fechacreacion = new Date();
    newAuditLog.action = action;
    newAuditLog.entidad = entidad;
    if(data){
      newAuditLog.data = data;
    }
    if(dataOld){
      let indexUpdate = Object.keys(data);
      let indexExist = Object.keys(dataOld);
      const indexToAudit = indexExist.filter(x => indexUpdate.indexOf(x) === -1);
      indexToAudit.forEach(key => {
        delete dataOld[key];
      });
      newAuditLog.oldData = dataOld;
    }
    await this.insertMongo(newAuditLog,this.auditLogRepository);
  }
}