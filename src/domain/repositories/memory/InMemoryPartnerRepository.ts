import type { Partner } from '../../entities/Partner';
import type { PartnerRepository } from '../Partner';

export class InMemoryPartnerRepository implements PartnerRepository {
  private partners: Partner[] = [];

  async create(partner: Partner): Promise<Partner | null> {
    this.partners.push(partner);
    return partner;
  }

  async select(): Promise<Partner[]> {
    return this.partners;
  }

  async update(
    id: string,
    partner: Partial<Omit<Partner, 'id'>>
  ): Promise<Partner | null> {
    if (!id || id.trim() === '') {
      throw new Error('Partner not found for update!');
    }
    const index = this.partners.findIndex(p => p.id === id);
    if (index === -1) {
      return null;
    }
    const updatedPartner = { ...this.partners[index], ...partner };
    this.partners[index] = updatedPartner;
    return updatedPartner;
  }

  async delete(id: string): Promise<boolean> {
    if (!id || id.trim() === '') {
      throw new Error('Partner not found for deletion!');
    }
    const index = this.partners.findIndex(p => p.id === id);
    if (index === -1) {
      return false;
    }
    this.partners.splice(index, 1);
    return true;
  }
}
