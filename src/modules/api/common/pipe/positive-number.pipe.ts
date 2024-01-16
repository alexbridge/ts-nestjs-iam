import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  ParseIntPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class PositiveNumberPipe implements PipeTransform {
  private readonly parseIntPipe: ParseIntPipe = new ParseIntPipe();

  async transform(value: string, metadata: ArgumentMetadata): Promise<number> {
    const parsed = await this.parseIntPipe.transform(value, metadata);
    if (parsed <= 0) {
      throw new BadRequestException(`Value  ${value} should be positive`);
    }

    return parsed;
  }
}
