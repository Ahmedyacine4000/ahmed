const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: [true, 'Order must be belong to user'],
      },
      cartItems: [
        {
          product: {
            type: mongoose.Schema.ObjectId,
            ref: 'product',
          },
          quantity: Number,
          color: String,
          price: Number,
        },
      ],
      taxPrice: {
        type: Number,
        default: 0,
      },
      shippingAddress: {
        details: String,
        phone: String,
        city: String,
        postalCode: String,
      },
      shippingPrice: {
        type: Number,
        default: 0,
      },
      totalOrderPrice: {
        type: Number,
      },
      paymentMethodType: {
        type: String,
        enum: ['card', 'cash'],
        default: 'cash',
      },
      isPaid: {
        type: Boolean,
        default: false,
      },
      paidAt: Date,
      isDelivered: {
        type: Boolean,
        default: false,
      },
      deliveredAt: Date,
},
{ timestamps: true }
)
module.exports = mongoose.model('order', orderSchema)