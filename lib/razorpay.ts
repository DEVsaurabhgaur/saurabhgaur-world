import Razorpay from 'razorpay'

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_razorpay_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_razorpay_secret',
})

