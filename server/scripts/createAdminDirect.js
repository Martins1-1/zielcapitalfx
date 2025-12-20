const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.DATABASE_URL || "mongodb+srv://zielcapital_db_user:BIMosmjmj4tN0v9r@zielcapita.ca9a8ij.mongodb.net/zielcapitalfx?appName=zielcapita";
const client = new MongoClient(uri);

async function createAdminDirect() {
  try {
    await client.connect();
    const db = client.db('zielcapitalfx');
    const users = db.collection('User');
    const email = 'zielcapital@example.com';
    const password = 'Valcap123';
    const fullName = 'Ziel Capital';
    const role = 'admin';
    const hashedPassword = await bcrypt.hash(password, 10);
    await users.insertOne({
      email,
      password: hashedPassword,
      fullName,
      role,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Admin user created directly in MongoDB.');
  } catch (err) {
    console.error('Error creating admin:', err);
  } finally {
    await client.close();
  }
}

createAdminDirect();
