import { createId } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';
import { db } from '../../index';
import { negotiationStaging, negotiations } from '../../schema';
import { negotiationStagingSchema } from '../schemas/negotiation-staging-schema';

export async function processNegotiationStaging() {
  const pendingRows = await db
    .select()
    .from(negotiationStaging)
    .where(eq(negotiationStaging.importStatus, 'pendente'));

  for (const row of pendingRows) {
    const parse = negotiationStagingSchema.safeParse(row);

    if (!parse.success) {
      await db
        .update(negotiationStaging)
        .set({
          importStatus: 'erro',
          errorMessage: parse.error.message,
        })
        .where(eq(negotiationStaging.id, row.id));

      continue;
    }

    const data = parse.data;

    await db.insert(negotiations).values({
      id: createId(),
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db
      .update(negotiationStaging)
      .set({ importStatus: 'importado' })
      .where(eq(negotiationStaging.id, row.id));
  }
}
