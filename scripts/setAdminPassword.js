const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = "mongodb+srv://zielcapital_db_user:BIMosmjmj4tN0v9r@zielcapita.ca9a8ij.mongodb.net/zielcapitalfx?appName=zielcapita";
const dbName = "zielcapitalfx";
const email = "admin@admin.com";
const password = "Admin123!";
const fullName = "Admin";
const role = "admin";

async function setAdminPassword() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const users = db.collection('users');
    const hash = await bcrypt.hash(password, 10);
    const result = await users.updateOne(
      { email },
      { $set: { password: hash, role, fullName, email } },
      { upsert: true }
    );
    console.log('Admin user password set successfully.');
    const allUsers = await users.find({}).toArray();
    console.log('All users:', allUsers);
  } catch (err) {
    console.error('Error setting admin password:', err);
  } finally {
    await client.close();
  }
}

setAdminPassword();
