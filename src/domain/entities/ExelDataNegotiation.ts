import { createId } from '@paralleldrive/cuid2';
import { ValidationError } from '../../exeptions/validate-error';

export class ExelDataNegotiation {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public title: string,
    public client: string,
    public user: string,
    public tags: string,
    public status: string,
    public step: string | null,
    public value: number | null,
    public startsDate: string | null,
    public observation: string | null,
    public partnerId: string | null,
    public averageGuide: number | null
  ) {
    if (!title) {
      throw new ValidationError('O título é obrigatório!');
    }
    if (!client) {
      throw new ValidationError('O cliente é obrigatório!');
    }
    if (!user) {
      throw new ValidationError('O usuário é obrigatório!');
    }
    if (!tags) {
      throw new ValidationError('As tags é obrigatório!');
    }
    if (!status) {
      throw new ValidationError('O Status é obrigatório!');
    }
  }
}
