// Seed script for users collection
const mongoose = require('mongoose');
const User = require('./src/models/User');

const MONGO_URI = 'mongodb+srv://zielcapital_db_user:BIMosmjmj4tN0v9r@zielcapita.ca9a8ij.mongodb.net/zielcapitalfx?appName=zielcapita';

async function seedUsers() {
  await mongoose.connect(MONGO_URI);
  await User.deleteMany({}); // Remove all users for clean seed
  await User.create([
    {
      email: 'admin@blue.com',
      password: 'Admin123!',
      fullName: 'Admin User',
      role: 'admin',
      balance: 10000
    },
    {
      email: 'user1@blue.com',
      password: 'Userpass1!',
      fullName: 'User One',
      role: 'user',
      balance: 5000
    },
    {
      email: 'user2@blue.com',
      password: 'Userpass2!',
      fullName: 'User Two',
      role: 'user',
      balance: 3000
    }
  ]);
  console.log('Seeded users!');
  await mongoose.disconnect();
}

seedUsers();
