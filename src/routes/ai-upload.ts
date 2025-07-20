import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import * as XLSX from 'xlsx';
import { z } from 'zod';
import { DrizzleContractRepository } from '../infrastructure/db/cruds/drizzle-contract-repository';
import { DrizzleExelDataNegotiationRepository } from '../infrastructure/db/cruds/drizzle-negotiation-repository';
import { DrizzlePartnerRepository } from '../infrastructure/db/cruds/drizzle-partner-repository';

const contractSchema = z.object({
  city: z.string().nullable().optional(),
  client: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  cnpj: z.string().nullable().optional(),
  sindic: z.string().nullable().optional(),
  year: z.string().nullable().optional(),
  matter: z.string().nullable().optional(),
  forecast: z.string().nullable().optional(),
  contractTotal: z.string().nullable().optional(),
  percentage: z.number().nullable().optional(),
  signedContract: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  averageGuide: z.number().nullable().optional(),
  partner: z.string().nullable().optional(),
  partnerCommission: z.number().nullable().optional(),
  counter: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
});

const dataSchema = z.object({
  title: z.string().nullable().optional(),
  client: z.string().nullable().optional(),
  user: z.string().nullable().optional(),
  tags: z.string().nullable().optional(),
  step: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  value: z.number().nullable().optional(),
  partnerId: z.string().nullable().optional(),
  startsDate: z.string().nullable().optional(),
  observation: z.string().nullable().optional(),
  averageGuide: z.number().nullable().optional(),
});

const partnerSchema = z.object({
  name: z.string().nullable().optional(),
  cpfOrCnpj: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  commission: z.number().nullable().optional(),
  portal: z.string().nullable().optional(),
  channelHead: z.string().nullable().optional(),
  regional: z.string().nullable().optional(),
  coordinator: z.string().nullable().optional(),
  agent: z.string().nullable().optional(),
  indicator: z.string().nullable().optional(),
  contract: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  responsible: z.string().nullable().optional(),
});

function transformRowKeys(
  row: Record<string, unknown>
): Record<string, unknown> {
  const transformed: Record<string, unknown> = {};

  for (const key in row) {
    const cleanKey = key.trim();

    const finalKey = cleanKey
      .replace(/^Usuário Responsável$/i, 'user')
      .replace(/^ususario$/i, 'user')
      .replace(/^Tags$/i, 'tags')
      .replace(/^Etapa$/i, 'step')
      .replace(/^Status$/i, 'status')
      .replace(/^status ?$/i, 'status')
      .replace(/^Valor$/i, 'value')
      .replace(/^ Valor$/i, 'value')
      .replace(/^média guia$/i, 'averageGuide')
      .replace(/^valor guia$/i, 'averageGuide')
      .replace(/^Data Início$/i, 'startsDate')
      .replace(/^Data fechamento$/i, 'startsDate')
      .replace(/^OBS$/i, 'observation')
      .replace(/^PARCEIRO$/i, 'partnerId')
      .replace(/^Título$/i, 'title')
      .replace(/^NOME$/i, 'name')
      .replace(/^CPF\/CNPJ$/i, 'cpfOrCnpj')
      .replace(/^CIDADE$/i, 'city')
      .replace(/^ESTADO$/i, 'state')
      .replace(/^COMISSÃO$/i, 'commission')
      .replace(/^Head de Canal ?$/i, 'channelHead')
      .replace(/^CONTRATO$/i, 'contract')
      .replace(/^TELEFONE ?$/i, 'phone')
      .replace(/^E-MAIL$/i, 'email')
      .replace(/^responsável$/i, 'responsible');

    const rawValue = row[key];

    if (typeof rawValue === 'string' && rawValue.includes('R$')) {
      transformed[finalKey] = Number.parseFloat(
        rawValue.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
      );
    } else if (typeof rawValue === 'string' && rawValue.trim().endsWith('%')) {
      transformed[finalKey] =
        Number.parseFloat(rawValue.replace('%', '').replace(',', '.').trim()) /
        100;
    } else {
      transformed[finalKey] = rawValue;
    }
  }

  return transformed;
}

export const uploadXlsxRoute: FastifyPluginAsyncZod = async app => {
  app.post('/upload-xlsx', async (req, reply) => {
    const parts = req.parts();
    let type = '';
    let buffer: Buffer | null = null;

    for await (const part of parts) {
      if (part.type === 'file') {
        buffer = await part.toBuffer();
      } else if (part.type === 'field' && part.fieldname === 'type') {
        type = part.value;
      }
    }

    if (!buffer || !type)
      return reply.status(400).send({ message: 'Arquivo ou tipo ausente.' });

    const workbook = XLSX.read(buffer, { type: 'buffer' });
    const summary: Record<string, number> = {};

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const raw = XLSX.utils.sheet_to_json(sheet, { defval: null });
      if (!raw.length) continue;

      const data = raw.map(row => transformRowKeys(row as any));

      try {
        if (type === 'data') {
          const parsed = z.array(dataSchema).parse(data);
          const repo = new DrizzleExelDataNegotiationRepository();
          await Promise.all(parsed.map(d => repo.create(d)));
          summary[sheetName] = parsed.length;
        } else if (type === 'contract') {
          const parsed = z.array(contractSchema).parse(data);
          const repo = new DrizzleContractRepository();
          await Promise.all(parsed.map(d => repo.create(d)));
          summary[sheetName] = parsed.length;
        } else if (type === 'partner') {
          const parsed = z.array(partnerSchema).parse(data);
          const repo = new DrizzlePartnerRepository();
          await Promise.all(parsed.map(d => repo.create(d)));
          summary[sheetName] = parsed.length;
        }
      } catch (err) {
        console.error(`[Erro parse ${type}]:`, err);
      }
    }

    if (Object.keys(summary).length === 0) {
      return reply.status(400).send({ message: 'Planilha inválida.' });
    }

    return reply.status(201).send({
      message: 'Upload processado com sucesso',
      summary,
    });
  });
};
