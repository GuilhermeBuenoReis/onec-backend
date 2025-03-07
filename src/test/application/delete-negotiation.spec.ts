import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryExelDataNegotiationRepository } from '../../domain/repositories/memory/InMemoryExelDataNegotiationRepository';
import { ExelDataNegotiation } from '../../domain/entities/ExelDataNegotiation';

describe('Delete Negotiation', () => {
  let repository: InMemoryExelDataNegotiationRepository;

  beforeEach(() => {
    repository = new InMemoryExelDataNegotiationRepository();
  });

  it('should be possible to delete the negotiation', async () => {
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

    // Usando id fixo para o teste
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

    const deletionResult = await repository.delete('1');
    expect(deletionResult).toBe(true);

    const negotiations = await repository.select();
    const found = negotiations.find(n => n.id === '1');
    expect(found).toBeUndefined();
  });

  it('should return false when trying to delete a non-existent negotiation', async () => {
    const deletionResult = await repository.delete('999');
    expect(deletionResult).toBe(false);
  });

  it('should throw an error when trying to delete a negotiation without an id', async () => {
    await expect(repository.delete('')).rejects.toThrowError(
      'Negotiation not found for deletion!'
    );
  });
});
