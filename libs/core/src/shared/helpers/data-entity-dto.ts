import { MapperBase } from '../base-class';

export function setDatatoReturn<ENTITY,ENTITYINFRA,ENTITYDOMAIN>(mapperORM:MapperBase<ENTITY,ENTITYINFRA>,
    mapperDTO:MapperBase<ENTITYINFRA,ENTITYDOMAIN>,data:ENTITY){
    const resultInfra = mapperORM.asDTO(data);
    return mapperDTO.asDTO(resultInfra);
}