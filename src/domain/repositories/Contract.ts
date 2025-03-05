import type { Contract } from '../../domain/entities/contracts';

export interface ExelDataNegotiationRepository {
  create(data: Partial<Contract>): Promise<Contract | null>;
  select(): Promise<Contract[]>;
  update(id: string, data: Partial<Contract>): Promise<Contract | null>;
  delete(id: string): Promise<boolean>;
}
