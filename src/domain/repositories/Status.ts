import type { Status } from '../entities/Status';

export interface StatusRepository {
  create(status: Status): Promise<Status | null>;
  select(): Promise<Status[]>;
  update(
    id: string,
    status: Partial<Omit<Status, 'id'>>
  ): Promise<Status | null>;
  delete(id: string): Promise<boolean>;
}
