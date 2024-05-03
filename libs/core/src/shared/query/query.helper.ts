import { HttpStatus, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { SelectQueryBuilder } from 'typeorm';

import { FilterDto } from '../dto/filter.dto';
import { StringOrderInput } from '../dto/input-type';
import { Operaciones } from './operaciones-query.helper';


export function manageFilterArgs(
  aliasEntity: string,
  query: SelectQueryBuilder<any>,
  where?: any,
  order?: StringOrderInput,
) {

  if (where) {
    query = handleWhereArgs(query, where, aliasEntity);
  }
  if (order) {
    query = handleOrderArgs(query, order, aliasEntity);
  }
  return query;
}

export async function managePaginationArgs(aliasEntity: string, qb: any, dataForpagination: FilterDto<any>) {
  const queryFull = manageFilterArgs(aliasEntity, qb, dataForpagination.where, dataForpagination.order);
  if (!queryFull) {
    throw new RpcException({
      statusCode: HttpStatus.NOT_FOUND,
      message: `No se pudo establecer los filtros de busqueda`,
    });
  }
  let offset;
  let limit;
  offset = dataForpagination.pagination.offset
  limit = dataForpagination.pagination.limit
  if (!limit) {
    limit = 100
  }
  if (!offset) {
    offset = 0
  }
  const [data, count] = await queryFull.skip(offset).take(limit).getManyAndCount();
  const totalPages = Math.ceil(count / limit);
  const hasPreviousPage = offset > 1;
  const hasNextPage = offset < totalPages;
  return { data, pageInfo: { count, limit, offset, hasPreviousPage, hasNextPage } }
}


function handleWhereArgs(query: SelectQueryBuilder<any>, where: any, aliasEntity: string) {
  const whereArgs = Object.entries(where);
  for (const whereArg of whereArgs) {
    const [fieldName, filters] = whereArg;
    const listaKeysFilters = Object.keys(filters);
    const esOperacionWhere = Operaciones.CT_OPERACIONES_WHERE_QUERY.find((op) => op == listaKeysFilters[0]);
    if (esOperacionWhere) {
      const ops = Object.entries(filters);
      for (const parameters of ops) {
        let fieldNameOk = fieldName;
        let aliasEntityOK = aliasEntity;

        if (fieldName.startsWith('joinentity_')) {
          const fieldArray = fieldNameOk.split('_');
          if (fieldArray.length != 3)
            Logger.warn(
              `La propiedad '${fieldName}' debe tener el siguiente formato: 'joinentity_nombreEntidad_nombreCampo'`,
            );
          fieldNameOk = fieldArray[2];
          aliasEntityOK = fieldArray[1];
        }
        const [operation, value] = parameters;

        query = operateWhereArgs(operation, query, aliasEntityOK, fieldNameOk, value);
      }
    } else {
      query = handleWhereArgs(query, filters, fieldName);
    }
  }
  return query;
}

function operateWhereArgs(
  operation: string,
  query: SelectQueryBuilder<any>,
  aliasEntity: string,
  fieldName: string,
  value: any,
) {

  const fieldNameFull = `${aliasEntity}.${fieldName}`;
  const param = {};
  switch (operation) {
    case Operaciones.IS: {
      const paramKey = Operaciones.IS + fieldName;
      param[paramKey] = value;
      query.andWhere(`${fieldNameFull} = :${paramKey}`, param);
      return query;
    }
    case Operaciones.IS_DATE: {

      query.andWhere(`TRUNC(${fieldNameFull}) = TO_DATE('${value}','YYYY-MM-DD')`);
      return query;
    }

    case Operaciones.BETWEEN: {
      query.andWhere(`TRUNC(${fieldNameFull}) BETWEEN TO_DATE('${value[0]}','YYYY-MM-DD') AND TO_DATE('${value[1]}','YYYY-MM-DD') `);
      return query;
    }
    case Operaciones.LT_DATE: {
      query.andWhere(`TRUNC(${fieldNameFull}) < TO_DATE('${value}','YYYY-MM-DD')`);
      return query;
    }
    case Operaciones.LTE_DATE: {
      query.andWhere(`TRUNC(${fieldNameFull}) <= TO_DATE('${value}','YYYY-MM-DD')`);
      return query;
    }
    case Operaciones.GT_DATE: {
      query.andWhere(`TRUNC(${fieldNameFull}) > TO_DATE('${value}','YYYY-MM-DD')`);
      return query;
    }
    case Operaciones.GTE_DATE: {
      query.andWhere(`TRUNC(${fieldNameFull}) => TO_DATE('${value}','YYYY-MM-DD')`);
      return query;
    }
    case Operaciones.ISNULL: {
      const paramKey = Operaciones.ISNULL + fieldName;
      param[paramKey] = value;
      if (value == true) {
        query.andWhere(`${fieldNameFull} IS NULL `);
      } else {
        query.andWhere(`${fieldNameFull}  IS NOT NULL `);
      }
      return query;
    }
    case Operaciones.NOT: {
      const paramKey = Operaciones.NOT + fieldName;
      param[paramKey] = value;
      query.andWhere(`${fieldNameFull} != :${paramKey}`, param);
      return query;
    }
    case Operaciones.IN: {
      const paramKey = Operaciones.IN + fieldName;
      param[paramKey] = value;
      query.andWhere(`${fieldNameFull} IN (:...${paramKey})`, param);
      return query;
    }
    case Operaciones.NOT_IN: {
      const paramKey = Operaciones.NOT_IN + fieldName;
      param[paramKey] = value;
      query.andWhere(`${fieldNameFull} NOT IN (:...${paramKey})`, param);
      return query;
    }
    case Operaciones.LT: {
      const paramKey = Operaciones.LT + fieldName;
      param[paramKey] = value;
      query.andWhere(`${fieldNameFull} < :${paramKey}`, param);
      return query;
    }
    case Operaciones.LTE: {
      const paramKey = Operaciones.LTE + fieldName;
      param[paramKey] = value;
      query.andWhere(`${fieldNameFull} <= :${paramKey}`, param);
      return query;
    }
    case Operaciones.GT: {
      const paramKey = Operaciones.GT + fieldName;
      param[paramKey] = value;
      query.andWhere(`${fieldNameFull} > :${paramKey}`, param);
      return query;
    }
    case Operaciones.GTE: {
      const paramKey = Operaciones.GTE + fieldName;
      param[paramKey] = value;
      query.andWhere(`${fieldNameFull} >= :${paramKey}`, param);
      return query;
    }
    case Operaciones.CONTAINS: {
      const paramKey = Operaciones.CONTAINS + fieldName;
      param[paramKey] = `${(value as string).toLowerCase()}`;
      query.andWhere(`POSITION('${param[paramKey]}' in LOWER(${fieldNameFull})) > 0`);
      return query;
    }
    case Operaciones.NOT_CONTAINS: {
      const paramKey = Operaciones.NOT_CONTAINS + fieldName;
      param[paramKey] = `%${(value as string).toLowerCase()}%`;
      query.andWhere(`LOWER(${fieldNameFull}) NOT LIKE :${paramKey}`, param);
      return query;
    }
    case Operaciones.STARTS_WITH: {
      const paramKey = Operaciones.STARTS_WITH + fieldName;
      param[paramKey] = `${(value as string).toLowerCase()}%`;
      query.andWhere(`LOWER(${fieldNameFull}) LIKE :${paramKey}`, param);
      return query;
    }
    case Operaciones.ENDS_WITH: {
      const paramKey = Operaciones.ENDS_WITH + fieldName;
      param[paramKey] = `%${(value as string).toLowerCase()}`;
      query.andWhere(`LOWER(${fieldNameFull}) LIKE :${paramKey}`,);
      return query;
    }
    default: {
      return query;
    }
  }
}

function handleOrderArgs(query: SelectQueryBuilder<any>, order: StringOrderInput, aliasEntity: string) {
  const orderArgs = Object.entries(order);
  if (Array.isArray(orderArgs) && orderArgs.length >= 1) {
    const orderArg = orderArgs[0];
    const [direction, fieldName] = orderArg;
    let nameField = "";
    const splitFieldName = fieldName.split(".")
    if (splitFieldName.length > 1) {
      nameField = `"${splitFieldName[0]}_${splitFieldName[1].toUpperCase()}"`
    }
    else {
      nameField = `"${aliasEntity}_${fieldName.toUpperCase()}"`
    }
    query.orderBy(nameField, direction.toUpperCase() as any);
  }
  return query;
}

export function manageFilterQueryBuilderArgs(
  aliasEntity: string,
  query: SelectQueryBuilder<any>,
  where?: any,
  order?: StringOrderInput,
) {

  if (where) {
    query = handleWhereArgs(query, where, aliasEntity);
  }
  if (order) {
    query = handleOrderQueryBuilderArgs(query, order, aliasEntity);
  }
  return query;
}

function handleOrderQueryBuilderArgs(query: SelectQueryBuilder<any>, order: StringOrderInput, aliasEntity: string) {
  const orderArgs = Object.entries(order);
  if (Array.isArray(orderArgs) && orderArgs.length >= 1) {
    const orderArg = orderArgs[0];
    const [direction, fieldName] = orderArg;
    let nameField = `"${aliasEntity}"."${fieldName.toUpperCase()}"`;
    query.orderBy(nameField, direction.toUpperCase() as any);
  }
  return query;
}

export async function managePaginationQueryBuilderArgs(aliasEntity: string, qb: any, dataForpagination: FilterDto<any>,qbCount:any) {
  const queryFull = manageFilterQueryBuilderArgs(aliasEntity, qb, dataForpagination.where, dataForpagination.order);
  const queryFullCount = manageFilterQueryBuilderArgs(aliasEntity, qbCount, dataForpagination.where, dataForpagination.order);
  if (!queryFull) {
    throw new RpcException({
      statusCode: HttpStatus.NOT_FOUND,
      message: `No se pudo establecer los filtros de busqueda`,
    });
  }
  if (!queryFullCount) {
    throw new RpcException({
      statusCode: HttpStatus.NOT_FOUND,
      message: `No se pudo establecer los filtros de busqueda`,
    });
  }
  let offset;
  let limit;
  offset = dataForpagination.pagination.offset
  limit = dataForpagination.pagination.limit
  if (!limit) {
    limit = 100
  }
  if (!offset) {
    offset = 0
  }
  const data = await queryFull.offset(offset).limit(limit).getRawMany();
  const dataCount = await queryFullCount.getRawOne();
  const count = dataCount['COUNT'];
  const totalPages = Math.ceil(count / limit);
  const hasPreviousPage = offset > 1;
  const hasNextPage = offset < totalPages;
  return { data, pageInfo: { count, limit, offset, hasPreviousPage, hasNextPage } }
}
