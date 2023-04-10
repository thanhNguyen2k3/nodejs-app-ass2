import mongoose from 'mongoose';

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: {
        type: String,
        require: true,
        minLength: 3,
    },
    products: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
});

export default mongoose.model('Category', categorySchema);
