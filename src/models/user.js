import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'admin',
    },
});

export default mongoose.model('User', authSchema);
