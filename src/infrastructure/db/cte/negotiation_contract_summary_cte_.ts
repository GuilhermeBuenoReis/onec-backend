import { eq, sql } from 'drizzle-orm';
import { db } from '..';
import { contracts, negotiations } from '../schema';

export async function negotiationContractSummaryCte() {
  const getAllInformationFromNegotiation = db
    .$with('get_all_information_from_negotiation')
    .as(
      db
        .select({
          id: negotiations.id,
          title: negotiations.title,
          client: negotiations.client,
          user: negotiations.user,
          tags: negotiations.tags,
          step: negotiations.step,
          status: negotiations.status,
          value: negotiations.value,
          startsDate: negotiations.startsDate,
          observation: negotiations.observation,
          partnerId: negotiations.partnerId,
          averageGuide: negotiations.averageGuide,
          createdAt: negotiations.createdAt,
          updatedAt: negotiations.updatedAt,
        })
        .from(negotiations)
    );

  const getAllInformationFromContract = db
    .$with('get_all_information_from_contract')
    .as(
      db
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
          createdAt: contracts.createdAt,
          updatedAt: contracts.updatedAt,
        })
        .from(contracts)
    );

  const result = await db
    .with(getAllInformationFromNegotiation, getAllInformationFromContract)
    .select({
      negotiationId: getAllInformationFromNegotiation.id,
      title: getAllInformationFromNegotiation.title,
      negotiationClient: getAllInformationFromNegotiation.client,
      user: getAllInformationFromNegotiation.user,
      tags: getAllInformationFromNegotiation.tags,
      step: getAllInformationFromNegotiation.step,
      negotiationStatus: getAllInformationFromNegotiation.status,
      value: getAllInformationFromNegotiation.value,
      startsDate: getAllInformationFromNegotiation.startsDate,
      observation: getAllInformationFromNegotiation.observation,
      partnerId: getAllInformationFromNegotiation.partnerId,
      negotiationAverageGuide: getAllInformationFromNegotiation.averageGuide,
      negotiationCreatedAt: getAllInformationFromNegotiation.createdAt,
      negotiationUpdatedAt: getAllInformationFromNegotiation.updatedAt,

      contractId: getAllInformationFromContract.id,
      city: getAllInformationFromContract.city,
      contractClient: getAllInformationFromContract.client,
      state: getAllInformationFromContract.state,
      cnpj: getAllInformationFromContract.cnpj,
      sindic: getAllInformationFromContract.sindic,
      year: getAllInformationFromContract.year,
      matter: getAllInformationFromContract.matter,
      forecast: getAllInformationFromContract.forecast,
      contractTotal:
        sql<number>`${getAllInformationFromContract.contractTotal}::double precision`.as(
          'contract_total'
        ),
      percentage: getAllInformationFromContract.percentage,
      signedContract: getAllInformationFromContract.signedContract,
      contractStatus: getAllInformationFromContract.status,
      contractAverageGuide: getAllInformationFromContract.averageGuide,
      partner: getAllInformationFromContract.partner,
      partnerCommission: getAllInformationFromContract.partnerCommission,
      counter: getAllInformationFromContract.counter,
      email: getAllInformationFromContract.email,
      contractCreatedAt: getAllInformationFromContract.createdAt,
      contractUpdatedAt: getAllInformationFromContract.updatedAt,
    })
    .from(getAllInformationFromNegotiation)
    .innerJoin(
      getAllInformationFromContract,
      eq(
        getAllInformationFromContract.partner,
        getAllInformationFromNegotiation.partnerId
      )
    );

  return {
    result,
  };
}
