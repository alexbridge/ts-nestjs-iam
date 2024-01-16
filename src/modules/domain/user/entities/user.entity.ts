import { Column, Entity, Index } from 'typeorm';
import { DomainEntity } from '../../common/entities/common.entities';

@Entity('user')
export class UserEntity extends DomainEntity<UserEntity> {
  @Index('user_id')
  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'full_name' })
  fullName: string;
}
