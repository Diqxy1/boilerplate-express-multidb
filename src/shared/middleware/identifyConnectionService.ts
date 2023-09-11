import {
  BaseHTTPMiddleware,
  Request,
  Response,
} from 'https://deno.land/x/oak/mod.ts';

import IdentifyTenantService from '../middleware/ItendifyTenantService';

export default class ConnectTenantDatabaseMiddleware extends BaseHTTPMiddleware {
  async dispatch(
    context: { request: Request },
    next: () => Promise<void>,
  ): Promise<void> {
    const identifyConnectionService = new IdentifyTenantService();

    const labelCode = context.request.headers.get('LabelCode');

    if (labelCode) {
      await identifyConnectionService.execute(labelCode);
    }

    await next();
  }
}
