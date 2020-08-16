import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    owner: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        }
    },
    customer: {
        name: {
            type: String,
            required: true,
        },
    },
    item: {
        code: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        qtde: {
            type: Number,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        }
    }
});

export default mongoose.model('Order', OrderSchema);