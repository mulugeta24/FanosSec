const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const ADMIN_EMAIL = 'mulugetaababi237@gmail.com';
const ADMIN_PASSWORD = 'Mulu4561644@';

const ensureAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        let admin = await User.findOne({ email: ADMIN_EMAIL });
        if (!admin) {
            admin = new User({
                name: 'Mulugeta Ababi',
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD,
                role: 'admin',
                isAdmin: true,
            });
        } else {
            admin.name = 'Mulugeta Ababi';
            admin.password = ADMIN_PASSWORD;
            admin.role = 'admin';
            admin.isAdmin = true;
        }

        await admin.save();
        console.log(`Admin account is ready: ${ADMIN_EMAIL}`);
        await mongoose.disconnect();
    } catch (error) {
        console.error(`Could not prepare admin account: ${error.message}`);
        process.exitCode = 1;
    }
};

ensureAdmin();
