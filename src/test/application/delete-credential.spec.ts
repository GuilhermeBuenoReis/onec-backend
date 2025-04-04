import { beforeEach, describe, expect, it } from 'vitest';
import { Credential } from '../../domain/entities/Credential';
import { InMemoryCredentialRepository } from '../../domain/repositories/memory/InMemoryCredentialsRepository';

describe('delete credential', () => {
  let repository: InMemoryCredentialRepository;

  beforeEach(() => {
    repository = new InMemoryCredentialRepository();
  });

  it('shoud be able delete a credential', async () => {
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

    const response = await repository.delete(credential.id);

    expect(response).toEqual(true);
  });
});
