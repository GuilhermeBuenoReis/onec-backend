// /tests/exelDataNegotiation/createExelDataNegotiation.test.ts
import { describe, expect, it, beforeEach } from 'vitest';
import { ExelDataNegotiation } from '../../domain/entities/ExelDataNegotiation';
import { InMemoryExelDataNegotiationRepository } from '../../domain/repositories/memory/InMemoryExelDataNegotiationRepository';

describe('Create ExelDataNegotiation', () => {
  let repository: InMemoryExelDataNegotiationRepository;

  beforeEach(() => {
    repository = new InMemoryExelDataNegotiationRepository();
  });

  it('should create a new negotiation', async () => {
    const negotiationData = {
      title: 'Negotiation Title',
      client: 'Client Name',
      user: 'User Name',
      tags: 'tag1, tag2',
      status: 'Active',
      step: 'Initial',
      value: 1000,
      startsDate: '2025-03-07',
      observation: 'Initial negotiation',
      partnerId: 'partner123',
      averageGuide: 500,
    };

    const negotiation = new ExelDataNegotiation(
      undefined,
      negotiationData.title,
      negotiationData.client,
      negotiationData.user,
      negotiationData.tags,
      negotiationData.status,
      negotiationData.step,
      negotiationData.value,
      negotiationData.startsDate,
      negotiationData.observation,
      negotiationData.partnerId,
      negotiationData.averageGuide
    );

    const result = await repository.create(negotiation);

    expect(result).toEqual(negotiation);
    expect(await repository.select()).toHaveLength(1);
  });

  it('should not create a negotiation without a title', () => {
    expect(() => {
      new ExelDataNegotiation(
        undefined,
        '',
        'Client Name',
        'User Name',
        'tag1, tag2',
        'Active',
        'Initial',
        1000,
        '2025-03-07',
        'Initial negotiation',
        'partner123',
        500
      );
    }).toThrowError('O título é obrigatório!');
  });

  it('should not create a negotiation without a client', () => {
    expect(() => {
      new ExelDataNegotiation(
        undefined,
        'cliente',
        '',
        'User Name',
        'tag1, tag2',
        'Active',
        'Initial',
        1000,
        '2025-03-07',
        'Initial negotiation',
        'partner123',
        500
      );
    }).toThrowError('O cliente é obrigatório!');
  });
  it('should not create a negotiation without a user', () => {
    expect(() => {
      new ExelDataNegotiation(
        undefined,
        'cliente',
        'Cliente',
        '',
        'tag1, tag2',
        'Active',
        'Initial',
        1000,
        '2025-03-07',
        'Initial negotiation',
        'partner123',
        500
      );
    }).toThrowError('O usuário é obrigatório!');
  });

  it('should not create a negotiation without a tags', () => {
    expect(() => {
      new ExelDataNegotiation(
        undefined,
        'Client',
        'Client Name',
        'User Name',
        '',
        'Active',
        'Initial',
        1000,
        '2025-03-07',
        'Initial negotiation',
        'partner123',
        500
      );
    }).toThrowError('As tags é obrigatório!');
  });

  it('should not create a negotiation without a status', () => {
    expect(() => {
      new ExelDataNegotiation(
        undefined,
        'Client',
        'Client Name',
        'User Name',
        'tag1, tag2',
        '',
        'Initial',
        1000,
        '2025-03-07',
        'Initial negotiation',
        'partner123',
        500
      );
    }).toThrowError('O Status é obrigatório!');
  });
});
