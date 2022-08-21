import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Users {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  tenant: string;

  @Column()
  name: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
