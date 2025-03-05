import type { ExelDataNegotiation } from '../../domain/entities/ExelDataNegotiation';

export interface ExelDataNegotiationRepository {
  create(
    data: Partial<ExelDataNegotiation>
  ): Promise<ExelDataNegotiation | null>;
  select(): Promise<ExelDataNegotiation[]>;
  update(
    id: string,
    data: Partial<ExelDataNegotiation>
  ): Promise<ExelDataNegotiation | null>;
  delete(id: string): Promise<boolean>;
}
