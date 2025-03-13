import { describe, it, expect, beforeEach } from 'vitest';
import { PortalControll } from '../../domain/entities/portal-controll';
import { InMemoryPortalControllRepository } from '../../domain/repositories/memory/InMemoryPortalControll';

describe('Delete PortalControll', () => {
  let repository: InMemoryPortalControllRepository;

  beforeEach(() => {
    repository = new InMemoryPortalControllRepository();
  });

  it('should be possible to delete the portalcontroll', async () => {
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

    const deletionResult = await repository.delete('1');
    expect(deletionResult).toBe(true);

    const portalcontrolls = await repository.select();
    const found = portalcontrolls.find(p => p.id === '1');
    expect(found).toBeUndefined();
  });

  it('should return false when trying to delete a non-existent portalcontroll', async () => {
    const deletionResult = await repository.delete('999');
    expect(deletionResult).toBe(false);
  });

  it('should throw an error when trying to delete a portalcontroll without an id', async () => {
    await expect(repository.delete('')).rejects.toThrowError(
      'Não foi encontrado o chamado para ser deletado!'
    );
  });
});
