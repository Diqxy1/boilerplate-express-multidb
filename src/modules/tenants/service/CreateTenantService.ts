import AppErro from '@shared/errors/AppError';
import { postgres } from '@shared/typeorm';
import { CreateTenantModel, ResponseTenantModel } from '../models';
import Tentans from '../typeorm/entities/tenants';

export default class CreateTenantService {
  public async execute({
    code,
    domain,
    name,
  }: CreateTenantModel): Promise<ResponseTenantModel> {
    const tenantRepository = (await postgres.initialize()).getRepository(
      Tentans,
    );

    const codeExist = await tenantRepository.findOne({ where: { code: code } });

    if (codeExist) {
      throw new AppErro('Codigo do tenant já cadastrado', 400);
    }

    const createTenant = tenantRepository.create({
      code: code,
      domain: domain,
      name: name,
      is_active: true,
    });

    return await tenantRepository.save(createTenant);
  }
}
