export class Contract {
  constructor(
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
    public partnerCommssion: number | null,
    public counter: string | null,
    public email: string | null
  ) {}
}
