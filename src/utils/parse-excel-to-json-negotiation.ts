import * as XLSX from 'xlsx';

const INTERNAL_FIELDS = [
  'title',
  'client',
  'user',
  'tags',
  'step',
  'status',
  'value',
  'startsDate',
  'observation',
  'partnerId',
  'averageGuide',
];

const FIELD_MAP: Record<string, string> = {
  cliente: 'client',
  ususario: 'user',
  usuario: 'user',
  tags: 'tags',
  etapa: 'step',
  status: 'status',
  valor: 'value',
  'valor r$': 'value',
  'valor (r$)': 'value',
  'data inicio': 'startsDate',
  'data de inicio': 'startsDate',
  'data de início': 'startsDate',
  obs: 'observation',
  observacao: 'observation',
  'media guia': 'averageGuide',
  'média guia': 'averageGuide',
  parceiro: 'partnerId',
  titulo: 'title',
  title: 'title',
  // ...adicione mais variantes se necessário
};

function normalizeKey(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s\.\-_]/g, '')
    .replace(/[^a-zA-Z]/g, '')
    .toLowerCase();
}

function levenshtein(a: string, b: string): number {
  const an = a.length;
  const bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = Array(bn + 1)
    .fill(null)
    .map(() => Array(an + 1).fill(0));
  for (let i = 0; i <= an; i++) matrix[0][i] = i;
  for (let j = 0; j <= bn; j++) matrix[j][0] = j;
  for (let j = 1; j <= bn; j++) {
    for (let i = 1; i <= an; i++) {
      const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        matrix[j - 1][i] + 1,
        matrix[j - 1][i - 1] + indicator
      );
    }
  }
  return matrix[bn][an];
}

function matchField(input: string): string | null {
  const normalizedInput = normalizeKey(input);
  if (FIELD_MAP[normalizedInput]) return FIELD_MAP[normalizedInput];

  let closest: string | null = null;
  let lowestDistance = 2;
  for (const field of INTERNAL_FIELDS) {
    const distance = levenshtein(normalizedInput, normalizeKey(field));
    if (distance <= lowestDistance) {
      closest = field;
      lowestDistance = distance;
    }
  }
  return closest;
}

export function parseExcelToJsonNegotiation(buffer: Buffer): any[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const ignoredFields: Set<string> = new Set();

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
      defval: null,
      raw: false,
    });

    if (json.length === 0) continue;

    const mappedRows = json.map(row => {
      const mapped: Record<string, any> = {};

      for (const key in row) {
        // Ignora headers inválidos
        const trimmed = key.trim();
        if (
          trimmed === '.' ||
          trimmed === '' ||
          trimmed === '-' ||
          trimmed === '_' ||
          trimmed === '#' ||
          trimmed === null ||
          trimmed.toLowerCase() === 'undefined'
        ) {
          continue;
        }
        const matched = matchField(key);
        if (matched) {
          mapped[matched] = row[key];
        } else {
          ignoredFields.add(key);
        }
      }

      // Garante que só vão os campos esperados, os outros caem como null
      const finalObj: Record<string, any> = {};
      for (const f of INTERNAL_FIELDS) {
        finalObj[f] = mapped[f] ?? null;
      }
      return finalObj;
    });

    if (mappedRows.length > 0) {
      if (ignoredFields.size > 0) {
        console.warn(
          `⚠️ Colunas ignoradas na planilha [${sheetName}]:`,
          Array.from(ignoredFields)
        );
      }
      return mappedRows;
    }
  }
  throw new Error('Nenhuma aba reconhecida com colunas compatíveis.');
}
