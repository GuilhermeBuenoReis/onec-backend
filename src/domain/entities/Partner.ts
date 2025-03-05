import { createId } from '@paralleldrive/cuid2';

export class Partner {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public name: string,
    public cpfOrCnpj: string,
    public city: string | null,
    public state: string | null,
    public commission: number | null,
    public portal: string | null,
    public channelHead: string | null,
    public regional: string | null,
    public coordinator: string | null,
    public agent: string | null,
    public indicator: string | null,
    public contract: string | null,
    public phone: string | null,
    public email: string | null,
    public responsible: string | null
  ) {
    if (!name || !cpfOrCnpj) {
      throw new Error('Parceiro inválido');
    }
  }
}
