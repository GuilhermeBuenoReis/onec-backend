import { Status } from '../../domain/entities/Status';
import type { StatusRepository } from '../../domain/repositories/Status';

export class CreateStatus {
  constructor(private statusRepository: StatusRepository) {}

  async create({ id, type, count }: Status): Promise<Status | null> {
    const status = new Status(id, type, count);

    return await this.statusRepository.create(status);
  }
}
