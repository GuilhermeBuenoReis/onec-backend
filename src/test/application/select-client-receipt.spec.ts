import { beforeEach, describe, expect, it } from 'vitest';
import { ClientReceipt } from '../../domain/entities/Client-Receipt';
import { InMemoryClientReceiptRepository } from '../../domain/repositories/memory/InMemoryClientReceipt';

describe('select client', () => {
  let repository: InMemoryClientReceiptRepository;

  beforeEach(() => {
    repository = new InMemoryClientReceiptRepository();
  });

  it('shoud be able selects all clients', async () => {
    const clientReceiptData = {
      id: '1',
      receiptDate: '2023-10-01',
      competence: '2023-10',
      cnpj: '00.000.000/0000-00',
      clientName: 'Client Exemplo',
      percentage: 10,
      compensationMonth: '2023-10',
      honorary: 100,
      tax: 10,
      status: 'Paid',
    };

    const client = new ClientReceipt(
      clientReceiptData.id,
      clientReceiptData.receiptDate,
      clientReceiptData.competence,
      clientReceiptData.cnpj,
      clientReceiptData.clientName,
      clientReceiptData.percentage,
      clientReceiptData.compensationMonth,
      clientReceiptData.honorary,
      clientReceiptData.tax,
      clientReceiptData.status
    );

    const response = await repository.create(client);

    expect(response).toEqual(client);
  });
});
