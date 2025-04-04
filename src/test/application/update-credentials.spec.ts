import { beforeEach, describe, expect, it } from 'vitest';
import { Credential } from '../../domain/entities/Credential';
import { InMemoryCredentialRepository } from '../../domain/repositories/memory/InMemoryCredentialsRepository';

describe('updated credentials', () => {
  let repository: InMemoryCredentialRepository;

  beforeEach(() => {
    repository = new InMemoryCredentialRepository();
  });

  it('shoud be able update a new credentials', async () => {
    const credentialData = {
      id: '1',
      channelHead: 'Channel Head Exemplo',
      partner: 'Partner Exemplo',
      cnpj: '00.000.000/0000-00',
      agentIndicator: 'Agent Indicator Exemplo',
    };

    const credential = new Credential(
      credentialData.id,
      credentialData.channelHead,
      credentialData.partner,
      credentialData.cnpj,
      credentialData.agentIndicator
    );

    await repository.createCredential(credential);

    const updatedCredentialData = { channelHead: 'Channel Head Exemplo 2' };
    const response = await repository.update('1', updatedCredentialData);

    expect(response).not.toBeNull();
    if (response) {
      expect(response.channelHead).toEqual(updatedCredentialData.channelHead);
    }
  });
});
