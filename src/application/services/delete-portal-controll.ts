import type { PortalControllRepository } from '../../domain/repositories/Portal-Controll';

export class Deleteportalcontroll {
  constructor(private portalcontrollRepository: PortalControllRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.portalcontrollRepository.delete(id);
  }
}
