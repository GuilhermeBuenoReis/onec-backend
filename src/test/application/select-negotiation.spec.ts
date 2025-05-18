import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryExelDataNegotiationRepository } from '../../domain/repositories/memory/InMemoryNegotiationRepository';
import { ExelDataNegotiation } from '../../domain/entities/Negotiations';

describe('Select Negotiations', () => {
  let repository: InMemoryExelDataNegotiationRepository;

  beforeEach(() => {
    repository = new InMemoryExelDataNegotiationRepository();
  });

  it('should be able to select all negotiations', async () => {
    const negotiationData = {
      title: 'Negotiation Title',
      client: 'Client A',
      user: 'User A',
      tags: 'tag1, tag2',
      status: 'Active',
      step: 'Initial',
      value: 1000,
      startsDate: '2025-03-07',
      observation: 'Observation text',
      partnerId: 'partner123',
      averageGuide: 500,
    };

    const negotiation1 = new ExelDataNegotiation(
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

    const negotiation2 = new ExelDataNegotiation(
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

    await repository.create(negotiation1);
    await repository.create(negotiation2);

    const result = await repository.select();

    expect(result).toHaveLength(2);
    expect(result).toEqual(
      expect.arrayContaining([negotiation1, negotiation2])
    );
  });
});
