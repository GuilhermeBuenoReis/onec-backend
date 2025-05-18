import { describe, it, expect } from 'vitest';
import { PortalControll } from '../../domain/entities/Portal-Controlls';
import { InMemoryPortalControllRepository } from '../../domain/repositories/memory/InMemoryPortalControll';

describe('Create PortalControll', () => {
  it('should create a new portalcontroll with valid data', async () => {
    const portalcontrollData = {
      monthOfCalculation: '2022-01-01',
      competenceMonth: '2022-01-01',
      contract: 1,
      enterprise: 'clinix',
      product: 'app',
      percentageHonorary: 12,
      compensation: 5,
      honorary: 25000,
      tax: 1.5,
      value: 1,
      situation: 'pago',
      partnerId: 'partnerId',
      tj: 1,
    };
    const portalControll = new PortalControll(
      undefined,
      portalcontrollData.monthOfCalculation,
      portalcontrollData.competenceMonth,
      portalcontrollData.contract,
      portalcontrollData.enterprise,
      portalcontrollData.product,
      portalcontrollData.percentageHonorary,
      portalcontrollData.compensation,
      portalcontrollData.honorary,
      portalcontrollData.tax,
      portalcontrollData.tj,
      portalcontrollData.value,
      portalcontrollData.situation,
      portalcontrollData.partnerId
    );

    const repository = new InMemoryPortalControllRepository();
    const createdPortalControll = await repository.create(portalControll);

    expect(createdPortalControll).toEqual(portalControll);
  });
});
