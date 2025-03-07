import { createId } from '@paralleldrive/cuid2';

export class Contract {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public city: string | null,
    public client: string,
    public state: string | null,
    public cnpj: string | null,
    public sindic: string | null,
    public year: string | null,
    public matter: string | null,
    public forecast: string | null,
    public contractTotal: string | null,
    public percentage: number | null,
    public signedContract: string | null,
    public status: string | null,
    public averageGuide: number | null,
    public partner: string | null,
    public partnerCommission: number | null,
    public counter: string | null,
    public email: string | null
  ) {
    if (!this.client) {
      throw new Error('Erro ao encontrar o cliente!');
    }

    if (!id || id.trim() === '') {
      throw new Error('Não foi encontrado o contrato para ser deletado!');
    }
  }
}
