import { createId } from '@paralleldrive/cuid2';

export class Status {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public type: string | null,
    public count: number | null
  ) {}
}
