import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://matthewkim1034:nYJAnGKIhXf2OjRb@cluster0.mwlv6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

export async function POST(req) {
  const data = await req.json();

  try {
    await client.connect();
    const database = client.db('musicQuiz');
    const ranks = database.collection('ranks');

    await ranks.insertOne(data);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  } finally {
    await client.close();
  }
}

export async function GET() {
  try {
    await client.connect();
    const database = client.db('musicQuiz');
    const ranks = database.collection('ranks');

    const data = await ranks.find({}).toArray();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  } finally {
    await client.close();
  }
}