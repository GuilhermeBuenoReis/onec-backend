import type { ContractRepository } from '../../../domain/repositories/Contract';
import { db } from '..';
import { contracts } from '../schema';
import { eq, sql } from 'drizzle-orm';
import { Contract } from '../../../domain/entities/Contract';

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
      .insert(contracts)
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
        id: contracts.id,
        city: contracts.city,
        client: contracts.client,
        state: contracts.state,
        cnpj: contracts.cnpj,
        sindic: contracts.sindic,
        year: contracts.year,
        matter: contracts.matter,
        forecast: contracts.forecast,
        contractTotal: contracts.contractTotal,
        percentage: contracts.percentage,
        signedContract: contracts.signedContract,
        status: contracts.status,
        averageGuide: contracts.averageGuide,
        partner: contracts.partner,
        partnerCommission: contracts.partnerCommission,
        counter: contracts.counter,
        email: contracts.email,
      })
      .from(contracts);

    return response;
  }
  async update(id: string, data: Partial<Contract>): Promise<Contract | null> {
    const response = await db
      .update(contracts)
      .set(data)
      .where(eq(contracts.id, id))
      .returning();

    return response[0] || null;
  }
  async delete(id: string): Promise<boolean> {
    const response = await db
      .delete(contracts)
      .where(eq(contracts.id, id))
      .returning();

    return response.length > 0;
  }

  async selectCountStatus(): Promise<
    { status: string | null; count: number }[]
  > {
    const result = await db
      .select({
        status: contracts.status,
        count: sql<number>`COUNT(*)`.as('count'),
      })
      .from(contracts)
      .groupBy(contracts.status);

    return result;
  }

  async selectStatusFilter(filter: string) {
    const response = await db
      .select({
        status: contracts.status,
      })
      .from(contracts)
      .where(sql`TRIM(${contracts.status}) ILIKE ${filter.trim()}`);
    return response;
  }

  async selectById(id: string): Promise<Contract | null> {
    const response = await db
      .select({
        id: contracts.id,
        city: contracts.city,
        client: contracts.client,
        state: contracts.state,
        cnpj: contracts.cnpj,
        sindic: contracts.sindic,
        year: contracts.year,
        matter: contracts.matter,
        forecast: contracts.forecast,
        contractTotal: contracts.contractTotal,
        percentage: contracts.percentage,
        signedContract: contracts.signedContract,
        status: contracts.status,
        averageGuide: contracts.averageGuide,
        partner: contracts.partner,
        partnerCommission: contracts.partnerCommission,
        counter: contracts.counter,
        email: contracts.email,
      })
      .from(contracts)
      .where(eq(contracts.id, id));

    return response[0] || null;
  }
}
