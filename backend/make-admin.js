require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  username: String,
  role: { type: String, default: 'user' },
  isAdmin: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const email = 'mulugetaababi237@gmail.com';
    const plainPassword = 'Mulu4561644@';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    const user = await User.findOneAndUpdate(
      { email },
      {
        name: 'Admin',
        email,
        username: 'admin',
        password: hashedPassword,
        isAdmin: true,
        role: 'admin'
      },
      { upsert: true, new: true }
    );

    console.log('\n✅ Admin user ready!');
    console.log('📧 Email:   ', email);
    console.log('🔑 Password:', plainPassword);
    console.log('🆔 User ID: ', user._id);
    console.log('\n🚀 Login at: http://localhost:5173/login');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
