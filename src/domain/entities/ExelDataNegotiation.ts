import { createId } from '@paralleldrive/cuid2';

export class ExelDataNegotiation {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public title: string,
    public client: string,
    public user: string,
    public tags: string,
    public step: string,
    public status: string,
    public value: number,
    public startsDate: string | null,
    public observation: string | null,
    public partnerId: string | null,
    public averageGuide: number | null
  ) {}
}
