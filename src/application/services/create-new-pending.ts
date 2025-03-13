import { Pending } from '../../domain/entities/Pending';
import type { PendingRepository } from '../../domain/repositories/Pending';

export class PartnerService {
  constructor(private pendingRepository: PendingRepository) {}

  async create({
    id,
    client,
    callReason,
    status,
    priority,
    responsible,
    category,
    description,
    createdAt,
    updatedAt,
  }: Pending): Promise<Pending | null> {
    const partner = new Pending(
      id,
      client,
      callReason,
      status,
      priority,
      responsible,
      category,
      description,
      createdAt,
      updatedAt
    );

    return await this.pendingRepository.create(partner);
  }
}
