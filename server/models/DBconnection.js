const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/userModel')

const connectDB = async (mongoURI) => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to Database');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

// const users = [
//   { email: 'john.doe@example.com', name: 'John Doe', password: "$2b$10$8qge9UsvqkgQ6APJ88TbQuOFa6UXMp4Kh8mtlDSYoWUyzj0ac4N6u", role: 'seller' },
//   { email: 'jane.smith@example.com', name: 'Jane Smith', password: "$2b$10$8qge9UsvqkgQ6APJ88TbQuOFa6UXMp4Kh8mtlDSYoWUyzj0ac4N6u", role: 'seller' },
//   { email: 'admin@admin.com', name: 'Admin', password: "$2b$10$8qge9UsvqkgQ6APJ88TbQuOFa6UXMp4Kh8mtlDSYoWUyzj0ac4N6u", role: 'admin' }
// ];


// const seedUsers = async () => {
//   try {
//     await User.deleteMany({});
    
//     await User.insertMany(users);

//     console.log('Users seeded successfully!');
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     process.exit(1);
//   }
// };

// seedUsers();

module.exports = connectDB;
