import type { Client } from '../../entities/Client';
import type { ClientRepository } from '../Client';

export class InMemoryClientRepository implements ClientRepository {
  private clients: Client[] = [];

  async create(data: Client): Promise<Client | null> {
    this.clients.push(data);
    return data;
  }

  async select(): Promise<Client[]> {
    return this.clients;
  }

  async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const index = this.clients.findIndex(client => client.id === id);
    if (index === -1) return null;

    const updatedClient = { ...this.clients[index], ...data };
    this.clients[index] = updatedClient;
    return updatedClient;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.clients.findIndex(client => client.id === id);
    if (index === -1) return false;

    this.clients.splice(index, 1);
    return true;
  }
}
