import type { Contestation } from '../entities/Contestation';

export interface ContestationRepository {
  create(data: Contestation): Promise<Contestation | null>;
  select(): Promise<Contestation[]>;
  update(id: string, data: Partial<Contestation>): Promise<Contestation | null>;
  delete(id: string): Promise<boolean>;
}
