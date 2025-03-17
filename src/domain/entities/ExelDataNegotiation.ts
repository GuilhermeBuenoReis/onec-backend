import { createId } from '@paralleldrive/cuid2';

export class ExelDataNegotiation {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public title: string | null,
    public client: string | null,
    public user: string | null,
    public tags: string | null,
    public status: string | null,
    public step: string | null,
    public value: number | null,
    public startsDate: string | null,
    public observation: string | null,
    public partnerId: string | null,
    public averageGuide: number | null
  ) {}
}
