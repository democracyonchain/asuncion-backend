import { CollectionTypeGql } from '@bsc/core';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RolUsuarioAuthType } from './rol-usuario.object';


@ObjectType('UsuarioAuth')
export class UsuarioAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    nombres: string;

    @Field({ nullable: false })
    apellidos: string;

    @Field({ nullable: false })
    email: string;

    @Field(() => [RolUsuarioAuthType], { nullable: true })
    rolusuario: RolUsuarioAuthType;
}

@ObjectType('UsuarioAuthGlobalMessage')
export class UsuarioAuthGlobalMessageType {
  @Field({ nullable: true })
  status: boolean;
  @Field({ nullable: true })
  message: string;
}