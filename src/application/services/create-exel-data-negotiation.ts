import { ExelDataNegotiation } from '../../domain/entities/ExelDataNegotiation';
import type { ExelDataNegotiationRepository } from '../../domain/repositories/ExelDataNegotiation';

export class PartnerService {
  constructor(
    private exelDataNegotiationRepository: ExelDataNegotiationRepository
  ) {}

  async create({
    title,
    client,
    user,
    tags,
    step,
    status,
    value,
    startsDate,
    observation,
    partnerId,
    averageGuide,
  }: ExelDataNegotiation): Promise<ExelDataNegotiation | null> {
    const exelDataNegotiation = new ExelDataNegotiation(
      title,
      client,
      user,
      tags,
      step,
      status,
      value,
      startsDate,
      observation,
      partnerId,
      averageGuide
    );

    return await this.exelDataNegotiationRepository.create(exelDataNegotiation);
  }
}
