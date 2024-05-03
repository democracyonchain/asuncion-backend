
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { RolAuthType } from './rol.object';


@ObjectType('RolUsuarioAuth')
export class RolUsuarioAuthType {

    @Field({ nullable: false })
    readonly id: number;

    @Field(() => RolAuthType, { nullable: true })
    rol: RolAuthType;
}