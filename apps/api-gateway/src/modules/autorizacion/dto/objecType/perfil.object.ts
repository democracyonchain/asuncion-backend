
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RolUsuarioAuthType } from './rol-usuario.object';


@ObjectType('PerfilAuth')
export class PerfilAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field({ nullable: false })
    username: string;

    @Field({ nullable: false })
    nombres: string;

    @Field({ nullable: false })
    apellidos: string;

    @Field(() => [RolUsuarioAuthType], { nullable: false })
    rolusuario: RolUsuarioAuthType;   
}