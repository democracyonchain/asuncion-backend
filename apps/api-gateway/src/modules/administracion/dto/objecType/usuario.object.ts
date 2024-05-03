
import { CollectionTypeGql } from '@bsc/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';


@ObjectType('UsuarioAdministracion')
export class UsuarioAdministracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    nombres: string;

    @Field({ nullable: false })
    apellidos: string;


}


@ObjectType()
export default class UsuarioCollectionType extends CollectionTypeGql<UsuarioAdministracionType>(UsuarioAdministracionType) { }


@ObjectType('UsuarioDelete')
export class UsuarioDeleteType {
  @Field({ nullable: true })
  status: boolean;
  @Field({ nullable: true })
  message: string;
}