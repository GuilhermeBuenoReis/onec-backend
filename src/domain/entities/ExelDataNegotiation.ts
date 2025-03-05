export class ExelDataNegotiation {
  constructor(
    public id: string,
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
