import { describe, it, expect, beforeEach } from 'vitest';
import { Partner } from '../../domain/entities/Partner';
import { InMemoryPartnerRepository } from '../../domain/repositories/memory/InMemoryPartnerRepository';

describe('Select Partners', () => {
  let repository: InMemoryPartnerRepository;

  beforeEach(() => {
    repository = new InMemoryPartnerRepository();
  });

  it('should be able to select all partners', async () => {
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

    const partner1 = new Partner(
      undefined,
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

    const partner2 = new Partner(
      undefined,
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

    await repository.create(partner1);
    await repository.create(partner2);

    const result = await repository.select();
    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([partner1, partner2]));
  });
});
