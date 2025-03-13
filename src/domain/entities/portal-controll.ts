import { createId } from '@paralleldrive/cuid2';

export class PortalControll {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public enterprise: string | null,
    public product: string | null,
    public percentageHonorary: number | null,
    public compensation: number | null,
    public honorary: number | null,
    public tax: number | null,
    public value: number | null,
    public situation: string | null
  ) {}
}
