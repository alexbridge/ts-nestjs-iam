import { Exclude } from 'class-transformer';
import { CreateDateColumn, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CommonClass } from '../../../libs/common/model/common-class';

export abstract class DomainEntity<T> extends CommonClass<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  toString = (): string => {
    return `${this.constructor.name} (id: ${this.id})`;
  };
}

export abstract class DomainTimesEntity<T> extends DomainEntity<T> {
  @Index('created')
  @CreateDateColumn({ name: 'created_at', precision: null })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at', precision: null })
  updatedAt!: Date;
}
