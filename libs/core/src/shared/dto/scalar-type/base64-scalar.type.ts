import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import * as moment from 'moment';

/**
 * Type de scalar para transformar Buffer a base64
 *
 * @export
 * @class Base64Scalar
 * @typedef {Base64Scalar}
 * @implements {CustomScalar<string, Date>}
 */
@Scalar('Base64Scalar', (type) => Base64Scalar)
export class Base64Scalar implements CustomScalar<string, Buffer> {
    description = 'Base64 custom scalar type';

    parseValue(value: string): Buffer {
      // Convert incoming base64 string to Buffer
      return Buffer.from(value, 'base64');
    }
  
    serialize(value: Buffer): string {
      // Convert outgoing Buffer to base64 string
      return value.toString('base64');
    }
  
    parseLiteral(ast: ValueNode): Buffer {
      if (ast.kind === Kind.STRING) {
        // Convert incoming literal base64 string to Buffer
        return Buffer.from(ast.value, 'base64');
      }
      return null;
    }
}