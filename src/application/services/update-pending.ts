import type { Pending } from '../../domain/entities/Pending';
import type { PendingRepository } from '../../domain/repositories/Pending';

export class UpdatePending {
  constructor(private pendingRepository: PendingRepository) {}

  async execute(
    id: string,
    pendingData: Partial<Omit<Pending, 'id'>>
  ): Promise<Pending | null> {
    return await this.pendingRepository.update(id, pendingData);
  }
}
