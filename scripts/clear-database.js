import { MongoClient } from 'mongodb';

async function clearDatabase() {
  const uri = 'mongodb+srv://pushkarkumarsaini2006:92pyeVnubIrZ5qZ3@nagriksewa.5xyvwas.mongodb.net/?retryWrites=true&w=majority&appName=NagrikSewa';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('test'); // Default database name

    // Collections to clear for fresh testing
    const collections = ['users', 'workerprofiles', 'bookings', 'messages', 'services'];

    for (const collectionName of collections) {
      try {
        const result = await db.collection(collectionName).deleteMany({});
        console.log(`✅ Cleared ${collectionName}: ${result.deletedCount} documents deleted`);
      } catch (error) {
        console.log(`⚠️  Collection ${collectionName} might not exist or error: ${error.message}`);
      }
    }

    console.log('\n🎉 Database cleared successfully for fresh testing!');
    console.log('You can now register new users and test all functionalities.');

  } catch (error) {
    console.error('❌ Error clearing database:', error);
  } finally {
    await client.close();
  }
}

clearDatabase();