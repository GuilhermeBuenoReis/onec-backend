import type { ClientReceipt } from '../../entities/Client-Receipt';
import type { ClientReceiptRepository } from '../Client-Receipt';

export class InMemoryClientReceiptRepository
  implements ClientReceiptRepository
{
  private clientReceipts: ClientReceipt[] = [];

  async create(data: ClientReceipt): Promise<ClientReceipt | null> {
    this.clientReceipts.push(data);
    return data;
  }

  async select(): Promise<ClientReceipt[]> {
    return this.clientReceipts;
  }

  async update(
    id: string,
    data: Partial<ClientReceipt>
  ): Promise<ClientReceipt | null> {
    const index = this.clientReceipts.findIndex(
      clientReceipt => clientReceipt.id === id
    );
    if (index === -1) return null;

    const updatedClientReceipt = { ...this.clientReceipts[index], ...data };
    this.clientReceipts[index] = updatedClientReceipt;
    return updatedClientReceipt;
  }

  async delete(id: string): Promise<boolean> {
    const index = this.clientReceipts.findIndex(
      clientReceipt => clientReceipt.id === id
    );
    if (index === -1) return false;

    this.clientReceipts.splice(index, 1);
    return true;
  }
}
