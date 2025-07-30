import type { ExelDataNegotiation } from '../../domain/entities/Negotiations';

export interface ExelDataNegotiationRepository {
  create(data: ExelDataNegotiation): Promise<ExelDataNegotiation | null>;
  select(): Promise<ExelDataNegotiation[]>;
  update(
    id: string,
    data: Partial<ExelDataNegotiation>
  ): Promise<ExelDataNegotiation | null>;
  delete(id: string): Promise<boolean>;
}
