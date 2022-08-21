import { Request, Response } from 'express';

import CreateUserService from '../service/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, dateOfBirth } = request.body;

    const createUserService = new CreateUserService();

    const createUser = await createUserService.execute({
      name,
      email,
      dateOfBirth,
    });

    return response.status(201).json(createUser);
  }
}
