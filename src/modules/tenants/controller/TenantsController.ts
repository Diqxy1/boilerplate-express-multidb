import { Request, Response } from 'express';
import CreateTenantService from '../service/CreateTenantService';

export default class TenantsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { code, domain, name } = request.body;

    const createTenantService = new CreateTenantService();

    const createTenant = await createTenantService.execute({
      code,
      domain,
      name,
    });

    return response.status(201).json(createTenant);
  }
}
