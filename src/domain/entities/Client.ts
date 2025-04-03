import { createId } from '@paralleldrive/cuid2';

export class Client {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public enterprise: string | null,
    public cnpj: string | null,
    public competenceMonth: string | null,
    public product: string | null,
    public contestation: string | null,
    public returned: string | null
  ) {}
}
