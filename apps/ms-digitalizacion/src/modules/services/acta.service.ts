import { Injectable } from '@nestjs/common';
import { FilterById, changeFalseToTrue} from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { Acta } from '../dto/acta';
import { ActaManager } from '../manager/acta.manager';

@Injectable()
export class ActaService {
  
  
  constructor(
      private readonly actaManager: ActaManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,

  ) {}


  async actaByJunta(filter: any): Promise<Acta> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const fields = changeFalseToTrue(filter.fields)
    const data = await this.actaManager.findByRelations({
      select: fields.dataTrue,
      where: {
        junta_id: filter.junta_id,
        dignidad_id: filter.dignidad_id,
      },
      relations:fields.relations,
      order:{
        votos:{
          candidato:{
            orden:'ASC'
          }
        }
      }
    });
    return plainToInstance(Acta, data[0]);
  }
}