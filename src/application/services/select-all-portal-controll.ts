import type { PortalControll } from '../../domain/entities/portal-controll';
import type { PortalControllRepository } from '../../domain/repositories/Portal-Controll';

export class SelectPortalControll {
  constructor(private portalcontrollRepository: PortalControllRepository) {}

  async execute(): Promise<PortalControll[]> {
    return await this.portalcontrollRepository.select();
  }
}
