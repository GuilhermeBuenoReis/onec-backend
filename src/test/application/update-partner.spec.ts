import { describe, it, expect, beforeEach } from 'vitest';
import { Partner } from '../../domain/entities/Partner';
import { InMemoryPartnerRepository } from '../../domain/repositories/memory/InMemoryPartnerRepository';

describe('Update Partner', () => {
  let repository: InMemoryPartnerRepository;

  beforeEach(() => {
    repository = new InMemoryPartnerRepository();
  });

  it('should be possible to update the partner', async () => {
    const partnerData = {
      name: 'Partner Name',
      cpfOrCnpj: '12345678901',
      city: 'City',
      state: 'State',
      commission: 10,
      portal: 'Portal',
      channelHead: 'Channel Head',
      regional: 'Regional',
      coordinator: 'Coordinator',
      agent: 'Agent',
      indicator: 'Indicator',
      contract: 'Contract',
      phone: '123456789',
      email: 'partner@example.com',
      responsible: 'Responsible Person',
    };

    const partner = new Partner(
      '1',
      partnerData.name,
      partnerData.cpfOrCnpj,
      partnerData.city,
      partnerData.state,
      partnerData.commission,
      partnerData.portal,
      partnerData.channelHead,
      partnerData.regional,
      partnerData.coordinator,
      partnerData.agent,
      partnerData.indicator,
      partnerData.contract,
      partnerData.phone,
      partnerData.email,
      partnerData.responsible
    );

    await repository.create(partner);

    const updatedData = { name: 'Updated Partner', city: 'New City' };
    const result = await repository.update('1', updatedData);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.name).toBe('Updated Partner');
      expect(result.city).toBe('New City');
    }
  });

  it('should return null when trying to update a non-existent partner', async () => {
    const updatedData = { name: 'Non-existent Partner' };
    const result = await repository.update('999', updatedData);
    expect(result).toBeNull();
  });

  it('should throw an error when trying to update a partner without an id', async () => {
    await expect(
      repository.update('', { name: 'Updated Partner' })
    ).rejects.toThrowError('Partner not found for update!');
  });
});
