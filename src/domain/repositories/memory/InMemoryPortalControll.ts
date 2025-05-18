import type { PortalControll } from '../../entities/Portal-Controlls';
import type { PortalControllRepository } from '../../repositories/Portal-Controll';

export class InMemoryPortalControllRepository
  implements PortalControllRepository
{
  private portalcontrolls: PortalControll[] = [];

  async create(portalcontroll: PortalControll): Promise<PortalControll> {
    this.portalcontrolls.push(portalcontroll);
    return portalcontroll;
  }

  async select(): Promise<PortalControll[]> {
    return this.portalcontrolls;
  }

  async update(
    id: string,
    data: Partial<Omit<PortalControll, 'id'>>
  ): Promise<PortalControll | null> {
    if (!id || id.trim() === '') {
      throw new Error('Não foi encontrado o chamado para atualizar!');
    }

    const portalcontrollIndex = this.portalcontrolls.findIndex(
      portalcontroll => portalcontroll.id === id
    );
    if (portalcontrollIndex === -1) {
      return null;
    }

    const updatedPortalControll = {
      ...this.portalcontrolls[portalcontrollIndex],
      ...data,
    };
    this.portalcontrolls[portalcontrollIndex] = updatedPortalControll;

    return updatedPortalControll;
  }

  async delete(id: string): Promise<boolean> {
    if (!id || id.trim() === '') {
      throw new Error('Não foi encontrado o chamado para ser deletado!');
    }

    const portalcontrollIndex = this.portalcontrolls.findIndex(
      portalcontroll => portalcontroll.id === id
    );
    if (portalcontrollIndex === -1) {
      return false;
    }

    this.portalcontrolls.splice(portalcontrollIndex, 1);
    return true;
  }

  selectByPartner(partnerId: string): Promise<PortalControll[]> {
    return new Promise(resolve => {
      const portalcontrolls = this.portalcontrolls.filter(
        portalcontroll => portalcontroll.partnerId === partnerId
      );
      resolve(portalcontrolls);
    });
  }
}
