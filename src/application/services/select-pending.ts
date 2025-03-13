import type { Pending } from '../../domain/entities/Pending';
import type { PendingRepository } from '../../domain/repositories/Pending';

export class SelectPending {
  constructor(private pendingRepository: PendingRepository) {}

  async execute(): Promise<Pending[]> {
    return await this.pendingRepository.select();
  }
}
