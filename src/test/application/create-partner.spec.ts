import { describe, it, expect } from 'vitest';
import { Partner } from '../../domain/entities/Partner';
import { InMemoryPartnerRepository } from '../../domain/repositories/memory/InMemoryPartnerRepository';

describe('Create Partner', () => {
  it('should create a new partner with valid data', async () => {
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

    const repository = new InMemoryPartnerRepository();
    const createdPartner = await repository.create(partner);

    expect(createdPartner).toEqual(partner);
  });

  it('should throw an error when partner name is missing', () => {
    expect(() => {
      new Partner(
        undefined,
        '',
        '12345678901',
        'City',
        'State',
        10,
        'Portal',
        'Channel Head',
        'Regional',
        'Coordinator',
        'Agent',
        'Indicator',
        'Contract',
        '123456789',
        'partner@example.com',
        'Responsible Person'
      );
    }).toThrowError('Parceiro inválido');
  });

  it('should throw an error when cpfOrCnpj is missing', () => {
    expect(() => {
      new Partner(
        undefined,
        'Partner Name',
        '',
        'City',
        'State',
        10,
        'Portal',
        'Channel Head',
        'Regional',
        'Coordinator',
        'Agent',
        'Indicator',
        'Contract',
        '123456789',
        'partner@example.com',
        'Responsible Person'
      );
    }).toThrowError('Parceiro inválido');
  });
});
