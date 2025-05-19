import { beforeEach, describe, expect, it } from 'vitest';
import { Client } from '../../domain/entities/Client';
import { InMemoryClientRepository } from '../../domain/repositories/memory/InMemoryClientRepostory';
import { ClientReceipt } from '../../domain/entities/Client-Receipt';
import { InMemoryClientReceiptRepository } from '../../domain/repositories/memory/InMemoryClientReceipt';

describe('update client', () => {
  let repository: InMemoryClientReceiptRepository;

  beforeEach(() => {
    repository = new InMemoryClientReceiptRepository();
  });

  it('shoud be able update a client', async () => {
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

    await repository.create(client);

    const updatedClientData = { clientName: 'Client Exemplo2' };
    const response = await repository.update('1', updatedClientData);

    expect(response).not.toBeNull();
    if (response) {
      expect(response.clientName).toEqual(updatedClientData.clientName);
    }
  });
});
