import type { ContractRepository } from '../../../domain/repositories/Contract';
import { db } from '..';
import { contractTable, partnerTable } from '../schema';
import { eq, sql } from 'drizzle-orm';
import { Contract } from '../../../domain/entities/Contracts';

export class DrizzleContractRepository implements ContractRepository {
  async create(contractData: Omit<Contract, 'id'>): Promise<Contract | null> {
    const contract = new Contract(
      undefined,
      contractData.city,
      contractData.client,
      contractData.state,
      contractData.cnpj,
      contractData.sindic,
      contractData.year,
      contractData.matter,
      contractData.forecast,
      contractData.contractTotal,
      contractData.percentage,
      contractData.signedContract,
      contractData.status,
      contractData.averageGuide,
      contractData.partner,
      contractData.partnerCommission,
      contractData.counter,
      contractData.email
    );

    const response = await db
      .insert(contractTable)
      .values({
        id: contract.id,
        city: contract.city,
        client: contract.client,
        state: contract.state,
        cnpj: contract.cnpj,
        sindic: contract.sindic,
        year: contract.year,
        matter: contract.matter,
        forecast: contract.forecast,
        contractTotal: contract.contractTotal,
        percentage: contract.percentage,
        signedContract: contract.signedContract,
        status: contract.status,
        averageGuide: contract.averageGuide,
        partner: contract.partner,
        partnerCommission: contract.partnerCommission,
        counter: contract.counter,
        email: contract.email,
      })
      .returning();

    const createdContract = response[0];

    if (!createdContract) {
      throw new Error('Dados do parceiro incorretos!');
    }

    return createdContract;
  }

  async select(): Promise<Contract[]> {
    const response = await db
      .select({
        id: contractTable.id,
        city: contractTable.city,
        client: contractTable.client,
        state: contractTable.state,
        cnpj: contractTable.cnpj,
        sindic: contractTable.sindic,
        year: contractTable.year,
        matter: contractTable.matter,
        forecast: contractTable.forecast,
        contractTotal: contractTable.contractTotal,
        percentage: contractTable.percentage,
        signedContract: contractTable.signedContract,
        status: contractTable.status,
        averageGuide: contractTable.averageGuide,
        partner: contractTable.partner,
        partnerCommission: contractTable.partnerCommission,
        counter: contractTable.counter,
        email: contractTable.email,
      })
      .from(contractTable);

    return response;
  }
  async update(id: string, data: Partial<Contract>): Promise<Contract | null> {
    const response = await db
      .update(contractTable)
      .set(data)
      .where(eq(contractTable.id, id))
      .returning();

    return response[0] || null;
  }
  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(contractTable)
      .where(eq(contractTable.id, id))
      .returning();

    return response.length > 0;
  }
  async selectStatusCount(): Promise<{ status: string; count: number }[]> {
    const response = await db
      .select({
        status: contractTable.status,
        count: sql<number>`COUNT(*)`,
      })
      .from(contractTable)
      .groupBy(contractTable.status);

    return response.map(item => ({
      status: item.status ?? 'unknown',
      count: item.count,
    }));
  }
}
