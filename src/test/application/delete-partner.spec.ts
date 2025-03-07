import { describe, it, expect, beforeEach } from 'vitest';
import { Partner } from '../../domain/entities/Partner';
import { InMemoryPartnerRepository } from '../../domain/repositories/memory/InMemoryPartnerRepository';

describe('Delete Partner', () => {
  let repository: InMemoryPartnerRepository;

  beforeEach(() => {
    repository = new InMemoryPartnerRepository();
  });

  it('should be possible to delete the partner', async () => {
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

    const deletionResult = await repository.delete('1');
    expect(deletionResult).toBe(true);

    const partners = await repository.select();
    const found = partners.find(p => p.id === '1');
    expect(found).toBeUndefined();
  });

  it('should return false when trying to delete a non-existent partner', async () => {
    const deletionResult = await repository.delete('999');
    expect(deletionResult).toBe(false);
  });

  it('should throw an error when trying to delete a partner without an id', async () => {
    await expect(repository.delete('')).rejects.toThrowError(
      'Partner not found for deletion!'
    );
  });
});
