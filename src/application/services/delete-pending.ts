import type { PendingRepository } from '../../domain/repositories/Pending';

export class Deletepending {
  constructor(private pendingRepository: PendingRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.pendingRepository.delete(id);
  }
}
