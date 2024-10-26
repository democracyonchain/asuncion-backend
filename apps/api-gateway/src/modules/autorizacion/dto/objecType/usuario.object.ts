import { Field, ObjectType } from '@nestjs/graphql';
import { RolUsuarioAuthType } from './rol-usuario.object';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de usuario para autorización
 *
 * @export
 * @class UsuarioAuthType
 * @typedef {UsuarioAuthType}
 */
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