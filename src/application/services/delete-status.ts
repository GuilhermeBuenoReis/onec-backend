import type { StatusRepository } from '../../domain/repositories/Status';

export class Deletestatus {
  constructor(private statusRepository: StatusRepository) {}

  async execute(id: string): Promise<boolean> {
    return await this.statusRepository.delete(id);
  }
}
