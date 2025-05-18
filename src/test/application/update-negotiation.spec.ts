import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryExelDataNegotiationRepository } from '../../domain/repositories/memory/InMemoryNegotiationRepository';
import { ExelDataNegotiation } from '../../domain/entities/Negotiations';

describe('Update Negotiation', () => {
  let repository: InMemoryExelDataNegotiationRepository;

  beforeEach(() => {
    repository = new InMemoryExelDataNegotiationRepository();
  });

  it('should be possible to update the negotiation', async () => {
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

    const negotiation = new ExelDataNegotiation(
      '1',
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

    await repository.create(negotiation);

    const updatedData = { client: 'Updated Client', title: 'Updated Title' };
    const result = await repository.update('1', updatedData);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.client).toBe('Updated Client');
      expect(result.title).toBe('Updated Title');
    }
  });

  it('should return null when trying to update a non-existent negotiation', async () => {
    const updatedData = { client: 'Non-existent Client' };
    const result = await repository.update('999', updatedData);
    expect(result).toBeNull();
  });

  it('should throw an error when trying to update a negotiation without an id', async () => {
    await expect(
      repository.update('', { client: 'Updated Client' })
    ).rejects.toThrowError('Negotiation not found for update!');
  });
});
