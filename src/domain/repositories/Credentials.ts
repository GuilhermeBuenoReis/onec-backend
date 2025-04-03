import type { Credential } from '../entities/Credential';

export interface CredentialRepository {
  createCredential(data: Credential): Promise<Credential | null>;
  select(): Promise<Credential[]>;
  update(id: string, data: Partial<Credential>): Promise<Credential | null>;
  delete(id: string): Promise<boolean>;
}
