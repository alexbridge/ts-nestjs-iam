import {
  ArgumentMetadata,
  Injectable,
  Logger,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PositiveNumberPipe } from './positive-number.pipe';

@Injectable()
export class IdToEntityPipe implements PipeTransform {
  private readonly logger = new Logger(IdToEntityPipe.name);
  private readonly positiveNumberPipe: PositiveNumberPipe;

  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    this.positiveNumberPipe = new PositiveNumberPipe();
  }

  async transform(value: string, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;

    const entityId = await this.positiveNumberPipe.transform(value, metadata);
    const entity = await this.entityManager.findOne(metatype, {
      where: { id: entityId },
    });
    if (!entity) {
      this.logger.log(`Id-to-entity not found: ${metatype} -> ${entityId}`);
      throw new NotFoundException(`${metatype} with id ${value} not found`);
    }

    this.logger.log(`Id-to-entity ${metatype} -> ${entity}`);
    return entity;
  }
}

export const FindOneEntityPipe = (property: string) => {
  @Injectable()
  class FindOneEntityPipe implements PipeTransform {
    readonly logger = new Logger(FindOneEntityPipe.name);

    constructor(@InjectEntityManager() readonly entityManager: EntityManager) {}

    async transform(value: string, metadata: ArgumentMetadata): Promise<any> {
      const { metatype } = metadata;

      const entity = await this.entityManager.findOne(metatype, {
        where: { [property]: value },
      });
      if (!entity) {
        this.logger.log(`Find-one-pipe not found: ${metatype} with ${property}:${value}`);
        throw new NotFoundException(`${metatype} with ${property}:${value} not found`);
      }

      this.logger.log(`Find-one-pipe ${metatype} with ${property}:${value} -> ${entity}`);
      return entity;
    }
  }

  return FindOneEntityPipe;
};
