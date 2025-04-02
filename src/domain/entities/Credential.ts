import { createId } from '@paralleldrive/cuid2';

export class Credential {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public channelHead: string | null,
    public partner: string | null,
    public cnpj: string | null,
    public agentIndicator: string | null
  ) {}
}
