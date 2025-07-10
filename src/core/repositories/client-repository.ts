import type { Client } from '../entities/client';

export interface ClientRepository {
  create(data: Client): Promise<void>;
  select(): Promise<Client[]>;
  update(id: string, data: Partial<Client>): Promise<void>;
  delete(id: string): Promise<void>;
}
