import { postgres } from '@shared/typeorm';
import Tentans from '@modules/tenants/typeorm/entities/tenants';
import AppErro from '@shared/errors/AppError';

export default class IdentifyTenantService {
  public async execute(labelCode: string) {
    const initializeConection = await postgres.initialize();

    const tenant = initializeConection.getRepository(Tentans);

    tenant.findOne({ where: { code: labelCode } });

    if (!tenant) {
      throw new AppErro('Tenant not found', 404);
    }

    return tenant;
  }
}
