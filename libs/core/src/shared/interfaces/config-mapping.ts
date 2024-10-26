import { AutoMappableProperties, ExplicitProperties, NormalizeIntersection } from '@dynamic-mapper/mapper/lib/interface';

export interface configMapping<ENTITY, DTO> {
  dtoMap: NormalizeIntersection<Partial<AutoMappableProperties<ENTITY, DTO>> & Required<ExplicitProperties<ENTITY, DTO>>>;
  entityMap: NormalizeIntersection<Partial<AutoMappableProperties<DTO, ENTITY>> & Required<ExplicitProperties<DTO, ENTITY>>>;
  entityToDtoIgnore?: Partial<keyof ENTITY>[];
  dtoToEntityIgnore?: Partial<keyof DTO>[];
}
