import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('ObjectScalar')
export class ObjectScalar implements CustomScalar<string, any> {
  description = 'Object custom scalar type';

  parseValue(value: string): any {
    return JSON.parse(value); // Convert from string to object
  }

  serialize(value: any): string {
    return JSON.stringify(value); // Convert from object to string
  }

  parseLiteral(ast: ValueNode): any {
    if (ast.kind === Kind.STRING) {
      return JSON.parse(ast.value); // Convert from string literal to object
    }
    return null;
  }
}