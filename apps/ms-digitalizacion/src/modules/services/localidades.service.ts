import { Injectable } from '@nestjs/common';
import { CollectionType, FilterById, changeFalseToTrue} from '@bsc/core';
import { plainToInstance } from 'class-transformer';
import { ListaNegraTokenManager } from '../manager/lista-negra-token.manager';
import { ProvinciaManager } from '../manager/provincia.manager';
import { Provincia } from '../dto/provincia.dto';
import { Canton } from '../dto/canton.dto';
import { CantonManager } from '../manager/canton.manager';
import { Parroquia } from '../dto/parroquia.dto';
import { ParroquiaManager } from '../manager/parroquia.manager';
import { ZonaManager } from '../manager/zona.manager';
import { Zona } from '../dto/zona.dto';
import { Junta } from '../dto/junta.dto';
import { JuntaManager } from '../manager/junta.manager';

@Injectable()
export class LocalidadesService {
  
  
  constructor(
      private readonly provinciaManager: ProvinciaManager,
      private readonly listaNegraTokenManager: ListaNegraTokenManager,
      private readonly cantonManager: CantonManager,
      private readonly parroquiaManager: ParroquiaManager,
      private readonly zonaManager: ZonaManager,
      private readonly juntaManager: JuntaManager,
  ) {}

  async getCollectionProvincia(paginacion: any): Promise<CollectionType<Provincia>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.provinciaManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Provincia>, data);
  }

  async findByIdProvincia(filter: FilterById): Promise<Provincia> {
    await this.listaNegraTokenManager.validarToken(filter.usuarioAuth.token);
    const fields = changeFalseToTrue(filter.fields)
    const data = await this.provinciaManager.findByRelations({
      select:fields.dataTrue,
      where: {
        id: filter.id,
      },
      relations: fields.relations,
    });
    return plainToInstance(Provincia, data[0]);
  }

  async getCollectionCanton(paginacion: any): Promise<CollectionType<Canton>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.cantonManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Canton>, data);
  }

  async getCollectionParroquia(paginacion: any): Promise<CollectionType<Parroquia>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.parroquiaManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Parroquia>, data);
  }

  async getCollectionZona(paginacion: any): Promise<CollectionType<Zona>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.zonaManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Zona>, data);
  }

  async getCollectionJunta(paginacion: any): Promise<CollectionType<Junta>> {
    await this.listaNegraTokenManager.validarToken(paginacion.usuarioAuth.token);
    const data = await this.juntaManager.getCollection(paginacion);
    return plainToInstance(CollectionType<Junta>, data);
  }
}