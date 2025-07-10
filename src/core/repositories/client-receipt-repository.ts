import type { ClientReceipt } from '../entities/client-receipt';

export interface ClientReceiptRepository {
  create(data: ClientReceipt): Promise<void>;
  findAll(): Promise<ClientReceipt[]>;
  update(id: string, data: Partial<ClientReceipt>): Promise<void>;
  delete(id: string): Promise<void>;
}
