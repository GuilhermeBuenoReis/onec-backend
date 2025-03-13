import { describe, it, expect } from 'vitest';
import { PortalControll } from '../../domain/entities/portal-controll';
import { InMemoryPortalControllRepository } from '../../domain/repositories/memory/InMemoryPortalControll';

describe('Create PortalControll', () => {
  it('should create a new portalcontroll with valid data', async () => {
    const portalcontrollData = {
      enterprise: 'clinix',
      product: 'app',
      percentageHonorary: 12,
      compensation: 5,
      honorary: 25000,
      tax: 1.5,
      value: 1,
      situation: 'pago',
    };

    const portalcontroll = new PortalControll(
      undefined,
      portalcontrollData.enterprise,
      portalcontrollData.product,
      portalcontrollData.percentageHonorary,
      portalcontrollData.compensation,
      portalcontrollData.honorary,
      portalcontrollData.tax,
      portalcontrollData.value,
      portalcontrollData.situation
    );

    const repository = new InMemoryPortalControllRepository();
    const createdPortalControll = await repository.create(portalcontroll);

    expect(createdPortalControll).toEqual(portalcontroll);
  });
});
