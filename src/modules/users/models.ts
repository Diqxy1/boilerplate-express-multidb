import { ObjectID } from 'typeorm';

export interface ResponseUserModel {
  id: ObjectID;
  name: string;
  dateOfBirth: Date;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserModel {
  name: string;
  dateOfBirth: Date;
  email: string;
}
