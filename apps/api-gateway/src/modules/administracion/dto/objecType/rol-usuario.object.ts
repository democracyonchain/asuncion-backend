
import { Field, ObjectType } from '@nestjs/graphql';
import { RolAdministracionType } from './rol.object';


@ObjectType('RolUsuarioAdministracion')
export class RolUsuarioAdministracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field(() => RolAdministracionType, { nullable: true })
    rol: RolAdministracionType;
}