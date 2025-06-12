import { PortalControll } from '../../domain/entities/Portal-Controlls';
import type { PortalControllRepository } from '../../domain/repositories/Portal-Controll';

export class PartnerService {
  constructor(private portalControllRepository: PortalControllRepository) {}

  async create({
    id,
    enterprise,
    product,
    percentageHonorary,
    compensation,
    honorary,
    tax,
    value,
    situation,
    competenceMonth,
    contract,
    monthOfCalculation,
    tj,
    partnerId,
  }: PortalControll): Promise<PortalControll | null> {
    const portalControll = new PortalControll(
      id,
      enterprise,
      product,
      percentageHonorary,
      compensation,
      honorary,
      tax,
      value,
      situation,
      competenceMonth,
      contract,
      monthOfCalculation,
      tj,
      partnerId
    );

    return await this.portalControllRepository.create(portalControll);
  }
}
