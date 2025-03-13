import type { PortalControll } from '../../domain/entities/portal-controll';
import type { PortalControllRepository } from '../../domain/repositories/Portal-Controll';

export class UpdatePortalControll {
  constructor(private portalcontrollRepository: PortalControllRepository) {}

  async execute(
    id: string,
    portalcontrollData: Partial<Omit<PortalControll, 'id'>>
  ): Promise<PortalControll | null> {
    return await this.portalcontrollRepository.update(id, portalcontrollData);
  }
}
