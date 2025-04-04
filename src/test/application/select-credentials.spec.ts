import { beforeEach, describe, expect, it } from 'vitest';
import { Credential } from '../../domain/entities/Credential';
import { InMemoryCredentialRepository } from '../../domain/repositories/memory/InMemoryCredentialsRepository';

describe('select credentials', () => {
  let repository: InMemoryCredentialRepository;

  beforeEach(() => {
    repository = new InMemoryCredentialRepository();
  });

  it('shoud be able selects all credentials', async () => {
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

    const response = await repository.createCredential(credential);

    expect(response).toEqual(credential);
  });
});
