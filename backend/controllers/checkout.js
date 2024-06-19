const Order = require('../models/order')
const Cart = require('../models/cart')
const { initiateCheckoutSchema } = require('../helper/validation')

const initiateCheckout = async (req, res) => {
    try {
        const { error } = initiateCheckoutSchema.validate(req.body)
        if(error){
            return res.status(400).json({
                mssg: error.details[0].message
            })
        }
        const userId = req.user._id
        const cartinfo = await Cart.findOne({ user: userId })
        if (!cartinfo){
            return res.status(400).json({
                mssg: "Empty cart"
            })
        }
        
        const products = cartinfo.products
        const totalAmount = cartinfo.totalAmount
        const { paymentType, firstname, secondname, address, address2, city, state, zip } = req.body

        const order = await Order.create({
            user: userId,
            products,
            totalAmount,
            paymentType,
            firstname,
            secondname,
            address,
            address2,
            city,
            state,
            zip
        })

        return res.status(200).json({
            mssg: "Order initiated successfully",
            data: { orderId: order._id }
        })


    } catch (error) {
        console.log("initiate checkout error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

const confirmCheckout = async (req, res) => {
    try {
        const { _id: userId } = req.user
        const { orderId } = req.params

        const orderinfo = await Order.findOne({ _id: orderId, user: userId, status: 'Initiated' })
        if (!orderinfo){
            return res.status(400).json({
                mssg: "Order not found"
            })
        }

        const cartinfo = await Cart.findOne({ user: userId })
        if (!cartinfo){
            return res.status(400).json({
                mssg: "Empty cart"
            })
        }

        await Order.findOneAndUpdate(
            { _id: orderId },
            {
                status: 'pending'
            }
        )

        await Cart.findOneAndDelete({ user: userId })

        return res.status(200).json({
            mssg: "Order confirmed successfully"
        })

    } catch (error) {
        console.log("confirm checkout error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}
module.exports = { 
    initiateCheckout,
     confirmCheckout
}
