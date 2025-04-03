import type { Credential } from '../../entities/Credential';
import type { CredentialRepository } from '../Credentials';

export class InMemoryCredentialRepository implements CredentialRepository {
  private credentials: Credential[] = [];

  async createCredential(data: Credential): Promise<Credential | null> {
    this.credentials.push(data);
    return data;
  }

  async select(): Promise<Credential[]> {
    return this.credentials;
  }

  async update(
    id: string,
    data: Partial<Credential>
  ): Promise<Credential | null> {
    const index = this.credentials.findIndex(
      credential => credential.id === id
    );
    if (index === -1) return null;

    const updatedCredential = { ...this.credentials[index], ...data };
    this.credentials[index] = updatedCredential;
    return updatedCredential;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.credentials.findIndex(
      credential => credential.id === id
    );
    if (index === -1) return false;

    this.credentials.splice(index, 1);
    return true;
  }
}
