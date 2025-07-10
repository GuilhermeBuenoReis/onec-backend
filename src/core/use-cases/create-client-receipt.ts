import type { ClientReceiptRepository } from '../repositories/client-receipt-repository';
import { ClientReceipt } from '../entities/client-receipt';

interface CreateClientReceiptInput {
  receiptDate: string | null;
  competence: string | null;
  cnpj: string | null;
  clientName: string | null;
  percentage: number | null;
  compensationMonth: string | null;
  honorary: number | null;
  tax: number | null;
  status: string | null;
}

export class CreateClientReceiptUseCase {
  constructor(private repository: ClientReceiptRepository) {}

  async execute(data: CreateClientReceiptInput): Promise<void> {
    const receipt = new ClientReceipt(
      undefined,
      data.receiptDate,
      data.competence,
      data.cnpj,
      data.clientName,
      data.percentage,
      data.compensationMonth,
      data.honorary,
      data.tax,
      data.status
    );

    await this.repository.create(receipt);
  }
}
