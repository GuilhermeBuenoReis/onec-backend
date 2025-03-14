import type { Status } from '../../domain/entities/Status';
import type { StatusRepository } from '../../domain/repositories/Status';

export class SelectStatus {
  constructor(private statusRepository: StatusRepository) {}

  async execute(): Promise<Status[]> {
    return await this.statusRepository.select();
  }
}
