import AppErro from '@shared/errors/AppError';
import { postgres } from '@shared/typeorm';
import { CreateUserModel, ResponseUserModel } from '../models';
import Users from '../typeorm/Users';

export default class CreateUserService {
  public async execute({
    name,
    email,
    dateOfBirth,
  }: CreateUserModel): Promise<ResponseUserModel> {
    const userRepository = (await postgres.initialize()).getRepository(Users);

    const userExist = await userRepository.findOne({ where: { name: name } });

    if (userExist) {
      throw new AppErro('Usuário já existente', 400);
    }

    const create = userRepository.create({
      name: name,
      dateOfBirth: dateOfBirth,
      email: email,
      tenant: 'di01', // mock tenant
    });

    return await userRepository.save(create);
  }
}
