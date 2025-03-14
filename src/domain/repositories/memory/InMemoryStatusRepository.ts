import type { Status } from '../../entities/Status';
import type { StatusRepository } from '../../repositories/Status';

export class InMemoryStatusRepository implements StatusRepository {
  private statuss: Status[] = [];

  async create(status: Status): Promise<Status> {
    this.statuss.push(status);
    return status;
  }

  async select(): Promise<Status[]> {
    return this.statuss;
  }

  async update(
    id: string,
    data: Partial<Omit<Status, 'id'>>
  ): Promise<Status | null> {
    if (!id || id.trim() === '') {
      throw new Error('Não foi encontrado o status para atualizar!');
    }

    const statusIndex = this.statuss.findIndex(status => status.id === id);
    if (statusIndex === -1) {
      return null;
    }

    const updatedStatus = { ...this.statuss[statusIndex], ...data };
    this.statuss[statusIndex] = updatedStatus;

    return updatedStatus;
  }

  async delete(id: string): Promise<boolean> {
    if (!id || id.trim() === '') {
      throw new Error('Não foi encontrado o status para ser deletado!');
    }

    const statusIndex = this.statuss.findIndex(status => status.id === id);
    if (statusIndex === -1) {
      return false;
    }

    this.statuss.splice(statusIndex, 1);
    return true;
  }
}
