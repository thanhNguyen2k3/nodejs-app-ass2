import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
    },
    price: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
    },
});

export default mongoose.model('Products', productsSchema);
