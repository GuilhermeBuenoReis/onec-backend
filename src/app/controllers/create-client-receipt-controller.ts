import { DrizzleClientReceiptRepository } from '@/infra/db/repositories/drizzle-client-receipt-repository.js';
import { CreateClientReceiptUseCase } from '@/core/use-cases/create-client-receipt.js';

interface CreateClientReceiptControllerInput {
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

export async function createClientReceiptController(
  input: CreateClientReceiptControllerInput
) {
  try {
    const repository = new DrizzleClientReceiptRepository();
    const useCase = new CreateClientReceiptUseCase(repository);

    await useCase.execute(input);
    return null;
  } catch (error) {
    return { error: 'Erro ao criar recibo de cliente' };
  }
}
