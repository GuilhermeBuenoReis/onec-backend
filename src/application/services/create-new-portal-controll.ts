import { PortalControll } from '../../domain/entities/portal-controll';
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
      situation
    );

    return await this.portalControllRepository.create(portalControll);
  }
}
