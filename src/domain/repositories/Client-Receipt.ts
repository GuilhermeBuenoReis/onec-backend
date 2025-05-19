import type { ClientReceipt } from '../entities/Client-Receipt';

export interface ClientReceiptRepository {
  create(data: ClientReceipt): Promise<ClientReceipt | null>;
  select(): Promise<ClientReceipt[]>;
  update(
    id: string,
    data: Partial<ClientReceipt>
  ): Promise<ClientReceipt | null>;
  delete(id: string): Promise<boolean>;
}
