import { createId } from '@paralleldrive/cuid2';

export class Client {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public enterprise: string,
    public cnpj: string,
    public competenceMonth: string,
    public contestation: string,
    public returned: string
  ) {}
}
