import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPortalControllRepository } from '../../domain/repositories/memory/InMemoryPortalControll';
import { PortalControll } from '../../domain/entities/Portal-Controlls';

describe('select portall-controlls', () => {
  let repository: InMemoryPortalControllRepository;

  beforeEach(() => {
    repository = new InMemoryPortalControllRepository();
  });

  it('shoud be able selects all portalcontrolls by partner', async () => {
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
      tj: 1.5,
      value: 1,
      situation: 'pago',
      partnerId: 'partnerId',
    };

    const portalcontroll1 = new PortalControll(
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
    const portalcontroll2 = new PortalControll(
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

    await repository.create(portalcontroll1);
    await repository.create(portalcontroll2);
    const partner = 'partnerId';

    const result = await repository.selectByPartner(partner);

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([portalcontroll1, portalcontroll2])
    );
    expect(result[0].partnerId).toEqual(partner);
  });
});
