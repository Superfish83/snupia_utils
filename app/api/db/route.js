// app/api/db/route.js
import path from 'path';
import fs from 'fs';

export async function GET(req, res) {
  const dbPath = path.join(process.cwd(), 'components/guessthemusic/db.json');
  const data = fs.readFileSync(dbPath, 'utf8');
  return new Response(data, {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}