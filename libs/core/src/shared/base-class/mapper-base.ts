import { Mapper, MapperConfiguration, MappingPair } from '@dynamic-mapper/mapper';
import { configMapping } from '../interfaces';

/**
 * Clase abstracta para manejo generico de mappers
 *
 * @export
 * @abstract
 * @class MapperBase
 * @typedef {MapperBase}
 * @template ENTITY
 * @template DTO
 */
export abstract class MapperBase<ENTITY, DTO> {
  private mapperEntityToDto: Mapper;
  private mapperDtoToEntity: Mapper;
  private entityToDto: MappingPair<ENTITY, DTO>;
  private dtoToEntity: MappingPair<DTO, ENTITY>;

  constructor() {
    this.entityToDto = new MappingPair<ENTITY, DTO>();
    this.dtoToEntity = new MappingPair<DTO, ENTITY>();
    const configMapping: configMapping<ENTITY, DTO> = this.configMapping();

    const configEntityToDto = new MapperConfiguration(cfg => {
      const automap = cfg.createAutoMap(this.entityToDto, configMapping.dtoMap);
      if (configMapping.entityToDtoIgnore != undefined) {
        configMapping.entityToDtoIgnore.forEach(i => automap.forSourceMember(i, opt => opt.ignore()));
      }
    });

    this.mapperEntityToDto = configEntityToDto.createMapper();

    const configDtoToEntity = new MapperConfiguration(cfg => {
      const automap = cfg.createAutoMap(this.dtoToEntity, configMapping.entityMap);
      if (configMapping.dtoToEntityIgnore != undefined) {
        configMapping.dtoToEntityIgnore.forEach(i => automap.forSourceMember(i, opt => opt.ignore()));
      }
    });
    this.mapperDtoToEntity = configDtoToEntity.createMapper();
  }

  abstract configMapping(): configMapping<ENTITY, DTO>;

  asDTO = (entity: ENTITY): DTO => {
    return this.mapperEntityToDto.map(this.entityToDto, entity);
  };

  asDTOList = (entity: ENTITY[]): DTO[] => {
    return this.mapperEntityToDto.map(this.entityToDto, entity);
  };

  asEntity = (dto: DTO): ENTITY => {
    return this.mapperDtoToEntity.map(this.dtoToEntity, dto);
  };

  asEntityList = (dto: DTO[]): ENTITY[] => {
    return this.mapperDtoToEntity.map(this.dtoToEntity, dto);
  };
}

export abstract class MapperBaseBridge<ENTITY, DTO> {
  constructor(public entityMapper: MapperBase<ENTITY, any>, public dtoMapper: MapperBase<any, DTO>) {}

  asDTO = (entity: ENTITY): DTO => {
    return this.dtoMapper.asDTO(this.entityMapper.asDTO(entity));
  };

  asDTOList = (entity: ENTITY[]): DTO[] => {
    return this.dtoMapper.asDTOList(this.entityMapper.asDTOList(entity));
  };

  asEntity = (dto: DTO): ENTITY => {
    return this.entityMapper.asEntity(this.dtoMapper.asEntity(dto));
  };

  asEntityList = (dto: DTO[]): ENTITY[] => {
    return this.entityMapper.asEntityList(this.dtoMapper.asEntityList(dto));
  };
}
