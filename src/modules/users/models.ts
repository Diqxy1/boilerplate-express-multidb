export interface ResponseUserModel {
  id: string;
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
