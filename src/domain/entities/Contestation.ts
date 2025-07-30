import { createId } from '@paralleldrive/cuid2';

export class Contestation {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public product: string | null,
    public competence: string | null,
    public cnpj: string | null,
    public client: string | null,
    public percentage: number | null,
    public compensation: number | null,
    public honorary: number | null,
    public tax: number | null,
    public valueTj: number | null,
    public toPay: number | null,
    public status: string | null,
    public observation: string | null,
    public createdAt: Date | null = null,
    public updatedAt: Date | null = null
  ) {}
}
