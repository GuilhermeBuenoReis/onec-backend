import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPortalControllRepository } from '../../domain/repositories/memory/InMemoryPortalControll';
import { PortalControll } from '../../domain/entities/portal-controll';

describe('select contracs', () => {
  let repository: InMemoryPortalControllRepository;

  beforeEach(() => {
    repository = new InMemoryPortalControllRepository();
  });

  it('shoud be able selects all portalcontrolls', async () => {
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

    const portalcontroll1 = new PortalControll(
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
    const portalcontroll2 = new PortalControll(
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

    await repository.create(portalcontroll1);
    await repository.create(portalcontroll2);

    const result = await repository.select();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([portalcontroll1, portalcontroll2])
    );
  });
});
