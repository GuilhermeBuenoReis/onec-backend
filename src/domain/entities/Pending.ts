import { createId } from '@paralleldrive/cuid2';

export type statusType = 'Aberto' | 'Encaminhado' | 'Pendente' | 'Concluído';

export type categoryType =
  | 'SAC'
  | 'Atendimento'
  | 'Financeiro'
  | 'Diretoria'
  | 'Comercial'
  | 'Auditoria';

export class Pending {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public client: string | null,
    public callReason: string | null,
    public status: statusType | null,
    public priority: string | null,
    public responsible: string | null,
    public category: categoryType | null,
    public description: string | null,
    public createdAt?: Date,
    public updatedAt?: Date
  ) {}
}
