
import { Field, ObjectType } from '@nestjs/graphql';
import { RolAdministracionType } from './rol.object';


/**
 * DTO con las variables que se van a exponer al momento de consultar servicios de rol por usuario
 *
 * @export
 * @class RolUsuarioAdministracionType
 * @typedef {RolUsuarioAdministracionType}
 */
@ObjectType('RolUsuarioAdministracion')
export class RolUsuarioAdministracionType {

    @Field({ nullable: false })
    readonly id: number;

    @Field(() => RolAdministracionType, { nullable: true })
    rol: RolAdministracionType;
}