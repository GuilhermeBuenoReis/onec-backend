import fs from 'node:fs';
import { db } from './src/infrastructure/db/index';
import { negotiations } from './src/infrastructure/db/schema';
import 'dotenv/config';

async function main() {
  const raw = fs.readFileSync('./negociacoes_normalized_final.json', 'utf-8');
  const dados = JSON.parse(raw);

  for (const dado of dados) {
    await db.insert(negotiations).values(dado);
    console.log('Inserido:', dado.title ?? '[Sem título]');
  }
  console.log('Importação concluída!');
}

main().catch(console.error);
