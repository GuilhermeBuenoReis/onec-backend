import type { ExelDataNegotiation } from '../../entities/Negotiations';

export class InMemoryExelDataNegotiationRepository {
  private negotiations: ExelDataNegotiation[] = [];

  async create(negotiation: ExelDataNegotiation): Promise<ExelDataNegotiation> {
    this.negotiations.push(negotiation);
    return negotiation;
  }

  async select(): Promise<ExelDataNegotiation[]> {
    return this.negotiations;
  }

  async update(
    id: string,
    data: Partial<ExelDataNegotiation>
  ): Promise<ExelDataNegotiation | null> {
    if (!id || id.trim() === '') {
      throw new Error('Negotiation not found for update!');
    }
    const index = this.negotiations.findIndex(n => n.id === id);
    if (index === -1) {
      return null;
    }
    const updatedNegotiation = { ...this.negotiations[index], ...data };
    this.negotiations[index] = updatedNegotiation;
    return updatedNegotiation;
  }

  async delete(id: string): Promise<boolean> {
    if (!id || id.trim() === '') {
      throw new Error('Negotiation not found for deletion!');
    }
    const index = this.negotiations.findIndex(n => n.id === id);
    if (index === -1) {
      return false;
    }
    this.negotiations.splice(index, 1);
    return true;
  }
}
