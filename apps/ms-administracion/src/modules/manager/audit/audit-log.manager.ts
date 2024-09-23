import { Injectable } from '@nestjs/common';
import { AuditLog } from '../../entities/audit/audit-log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ManagerBase,diff } from '@bsc/core';
import { AuditLogRepository } from '../../repositories/audit/audit-log.repository';

/**
 * Clase manager para gestión del entity de auditoria
 *
 * @export
 * @class AuditLogManager
 * @typedef {AuditLogManager}
 * @extends {ManagerBase<AuditLog, AuditLogRepository>}
 */
@Injectable()
export class AuditLogManager extends ManagerBase<AuditLog, AuditLogRepository> {
  constructor(
    @InjectRepository(AuditLog, "mongodb")
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {
    super();
  }

  /**
   * Función para insertar datos de auditoria en mongoDB
   *
   * @async
   * @template T
   * @param {string} action
   * @param {string} entidad
   * @param {number} userId
   * @param {number} registroId
   * @param {T} oldEntity
   * @param {T} newEntity
   * @returns {*}
   */
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