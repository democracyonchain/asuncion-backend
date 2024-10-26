import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import * as moment from 'moment';



/**
 * Type de scalar para validar que las fechas timestamp se transformen a formato 'YYYY-MM-DD'
 *
 * @export
 * @class DateScalar
 * @typedef {DateScalar}
 * @implements {CustomScalar<string, Date>}
 */
@Scalar('DateScalar', (type) => DateScalar)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue(value: number): Date {
    return new Date(value); 
  }

  serialize(value: Date): string {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
  }

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }
}