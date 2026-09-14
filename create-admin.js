const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    await mongoose.connect('mongodb+srv://fanossec_admin:Mulugeta4561644%23%40@cluster0.sysb73f.mongodb.net/fanossec');
    console.log('✅ Connected to MongoDB Atlas');
    
    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@fanossec.com' });
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      console.log('📧 Email: admin@fanossec.com');
      console.log('🔑 Password: Admin@123');
      process.exit(0);
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin@123', salt);
    
    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@fanossec.com',
      password: hashedPassword,
      isAdmin: true
    });
    
    console.log('✅ Admin user created successfully!');
    console.log('\n📧 Email: admin@fanossec.com');
    console.log('🔑 Password: Admin@123');
    console.log('\n🚀 You can now login at: http://localhost:5173/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createAdmin();
