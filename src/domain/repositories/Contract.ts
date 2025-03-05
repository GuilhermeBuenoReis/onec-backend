import type { Contract } from '../../domain/entities/contracts';

export interface ContractRepository {
  create(data: Partial<Contract>): Promise<Contract | null>;
  select(): Promise<Contract[]>;
  update(id: string, data: Partial<Contract>): Promise<Contract | null>;
  delete(id: string): Promise<boolean>;
}
