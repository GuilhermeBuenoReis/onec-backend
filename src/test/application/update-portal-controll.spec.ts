import { describe, it, expect, beforeEach } from 'vitest';
import { PortalControll } from '../../domain/entities/portal-controll';
import { InMemoryPortalControllRepository } from '../../domain/repositories/memory/InMemoryPortalControll';

describe('Update PortalControll', () => {
  let repository: InMemoryPortalControllRepository;

  beforeEach(() => {
    repository = new InMemoryPortalControllRepository();
  });

  it('should be possible to update the portalcontroll', async () => {
    const portalcontrollData = {
      id: '1',
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
      '1',
      portalcontrollData.enterprise,
      portalcontrollData.product,
      portalcontrollData.percentageHonorary,
      portalcontrollData.compensation,
      portalcontrollData.honorary,
      portalcontrollData.tax,
      portalcontrollData.value,
      portalcontrollData.situation
    );

    await repository.create(portalcontroll);

    const updatedData = {
      enterprise: 'Updated PortalControll',
      product: 'site',
    };
    const result = await repository.update('1', updatedData);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.enterprise).toBe('Updated PortalControll');
      expect(result.product).toBe('site');
    }
  });

  it('should return null when trying to update a non-existent portalcontroll', async () => {
    const updatedData = { enterprise: 'Non-existent PortalControll' };
    const result = await repository.update('999', updatedData);
    expect(result).toBeNull();
  });

  it('should throw an error when trying to update a portalcontroll without an id', async () => {
    await expect(
      repository.update('', { enterprise: 'Updated PortalControll' })
    ).rejects.toThrowError('Não foi encontrado o chamado para atualizar!');
  });
});
