// decimal.scalar.ts
import { Scalar } from '@nestjs/graphql';
import { CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Decimal', () => DecimalScalar)
export class DecimalScalar implements CustomScalar<string, number> {
  description = 'Custom scalar type for handling numbers with 4 decimal places';

  parseValue(value: string): number {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      throw new Error('Invalid decimal value');
    }
    return parseFloat(parsedValue.toFixed(8));
  }

  serialize(value: number): string {
    return value.toFixed(8);
  }

  parseLiteral(ast: ValueNode): number {
    if (ast.kind === Kind.FLOAT || ast.kind === Kind.INT) {
      return parseFloat(parseFloat(ast.value).toFixed(8));
    }
    throw new Error('Invalid Decimal format');
  }
}