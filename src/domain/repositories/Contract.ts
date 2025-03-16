import type { Contract } from '../../domain/entities/Contract';

export interface ContractRepository {
  create(data: Contract): Promise<Contract | null>;
  select(): Promise<Contract[]>;
  update(id: string, data: Partial<Contract>): Promise<Contract | null>;
  delete(id: string): Promise<boolean>;
  selectStatusCount(): Promise<{ status: string; count: number }[]>;
}
