import { createId } from '@paralleldrive/cuid2';

export class User {
  constructor(
    // biome-ignore lint/style/useDefaultParameterLast: <explanation>
    public id: string = createId(),
    public email: string,
    public passwordHash: string,
    public role: string
  ) {}
}
