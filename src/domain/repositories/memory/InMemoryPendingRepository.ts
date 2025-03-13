import type { Pending } from '../../entities/Pending';
import type { PendingRepository } from '../../repositories/Pending';

export class InMemoryPendingRepository implements PendingRepository {
  private pendings: Pending[] = [];

  async create(pending: Pending): Promise<Pending> {
    this.pendings.push(pending);
    return pending;
  }

  async select(): Promise<Pending[]> {
    return this.pendings;
  }

  async update(
    id: string,
    data: Partial<Omit<Pending, 'id'>>
  ): Promise<Pending | null> {
    if (!id || id.trim() === '') {
      throw new Error('Não foi encontrado o chamado para atualizar!');
    }

    const pendingIndex = this.pendings.findIndex(pending => pending.id === id);
    if (pendingIndex === -1) {
      return null;
    }

    const updatedPending = { ...this.pendings[pendingIndex], ...data };
    this.pendings[pendingIndex] = updatedPending;

    return updatedPending;
  }

  async delete(id: string): Promise<boolean> {
    if (!id || id.trim() === '') {
      throw new Error('Não foi encontrado o chamado para ser deletado!');
    }

    const pendingIndex = this.pendings.findIndex(pending => pending.id === id);
    if (pendingIndex === -1) {
      return false;
    }

    this.pendings.splice(pendingIndex, 1);
    return true;
  }
}
