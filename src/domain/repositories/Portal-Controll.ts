import type { PortalControll } from '../entities/portal-controll';

export interface PortalControllRepository {
  create(portalcontroll: PortalControll): Promise<PortalControll | null>;
  select(): Promise<PortalControll[]>;
  update(
    id: string,
    portalcontroll: Partial<Omit<PortalControll, 'id'>>
  ): Promise<PortalControll | null>;
  delete(id: string): Promise<boolean>;
}
