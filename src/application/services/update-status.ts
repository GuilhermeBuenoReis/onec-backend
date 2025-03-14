import type { Status } from '../../domain/entities/Status';
import type { StatusRepository } from '../../domain/repositories/Status';

export class UpdateStatus {
  constructor(private statusRepository: StatusRepository) {}

  async execute(
    id: string,
    statusData: Partial<Omit<Status, 'id'>>
  ): Promise<Status | null> {
    return await this.statusRepository.update(id, statusData);
  }
}
