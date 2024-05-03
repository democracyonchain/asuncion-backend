/**
 * @ Author: Luis Núñez
 * @ Create Time: 2023-02-02
  */
import { stringWhereInput } from '@bsc/core';
import { Type } from 'class-transformer';
import { Allow } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateProveedorDto {

 @Allow()
  id?: number;

  @Allow()
  estado: number;

  @Allow()
  ctproveedor_id: number;

  @Allow()
  tipoproveedor: string;

  @Allow()
  nombre: string;

  @Allow()
  representantelegal: string;

  @Allow()
  ruc: string;

  @Allow()
  actividadeconomica: string;

  @Allow()
  direccion: string;

  @Allow()
  correo: string;

  @Allow()
  telefono: string;

}
export class UpdateProveedorDto extends PartialType(CreateProveedorDto) {
  id: number;
}

