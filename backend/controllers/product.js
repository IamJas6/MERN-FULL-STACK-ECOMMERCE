const Product = require('../models/product')
const fs = require('fs')
const path = require('path')
const { createProductSchema } = require('../helper/validation')

//create product api
const createProduct = async (req,res) => {
    try {
        const { error } = createProductSchema.validate(req.body)
        if (error) {
            return res.status(400).json({
                mssg: error.details[0].message
            })
        }

        const { name, description, category, quantity, pricePerQuantity } = req.body

        if(!req.files || Object.keys(req.files).length === 0){  //if no file is uploaded
            return res.status(400).json({
                mssg: "No file uploaded"
            })
        }

        let image = req.files.image;    
        image.name = Date.now() + "_" + image.name;

        const uploadDir = path.join(__dirname, '..', 'uploads', 'product')  //path to upload directory
        if(!fs.existsSync(uploadDir)){     //create directory if it does not exist
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        const product_logo = `/product/${image.name}`;

        image.mv(path.join(uploadDir, image.name), function(error){  //move image to upload directory
            if(error){
                console.log("error on file upload", error);
                return res.status(500).json({
                    mssg: "Server error on uploading file"
                })
            }
        })

        const product = await Product.create({     //creating product in database
            name: name,
            description: description,
            category: category,
            quantity: quantity,
            pricePerQuantity: pricePerQuantity,
            image: product_logo
        })

        return res.status(201).json({
            mssg: "Product created successfully",
            data: {
                product
            }
        })

    } catch (error) {
        console.log("Create product error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

//product listing api
const productList = async (req, res) => {
    try {
        const { limit = 10, offset = 1 } = req.query;
        const skip = (offset-1) * limit;
        const products = await Product.find().populate('category').skip(skip).limit(limit);
        const total = await Product.countDocuments();

        return res.status(200).json({
            mssg: "Product list",
            data:{ 
                products,
                pagination: {
                    limit: limit,
                    offset: offset,
                    total: total
                }
            }
        })

    } catch (error) {
        console.log("Create product error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

//product details api
const productDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const productinfo = await Product.findById(id).populate('category');

        if(!productinfo){
            return res.status(400).json({
                mssg: "Product not found"
            })
        }

        return res.status(200).json({
            mssg: "Product details",
            data: {
                productinfo
            }
        })

    } catch (error) {
        console.log("product details error", error)
        return res.status(500).json({
            msg: "Internal server error, try again"
        })
    }
}

//edit product api
const editProduct = async (req, res) => {
    try {
        const { id } = req.params
        const productinfo = await Product.findById(id)
        if(!productinfo){
            return res.status(400).json({
                mssg: "Product not found"
            })
        }

        const { name, description, category, quantity, pricePerQuantity } = req.body

        let product_logo = null

        if(req.files){
            let image = req.files.image;    
            image.name = Date.now() + "_" + image.name;

            const uploadDir = path.join(__dirname, '..', 'uploads', 'product')  //path to upload directory
            if(!fs.existsSync(uploadDir)){     //create directory if it does not exist
            fs.mkdirSync(uploadDir, { recursive: true })
            }

            product_logo = `/product/${image.name}`;

            image.mv(path.join(uploadDir, image.name), function(error){  //move image to upload directory
                if(error){
                    console.log("error on file upload", error);
                    return res.status(500).json({
                        mssg: "Server error on uploading file"
                    })
                }
            })
        }

        fs.unlink(path.join(__dirname, '..', 'uploads', productinfo.image), function(error){
            if(error){
                console.log("error on updating file", error);
                return res.status(500).json({
                    mssg: "Server error on updating file"
                })
            }
        })

        await Product.findByIdAndUpdate(id, {
            name: name || productinfo.name,
            description: description || productinfo.description,
            category: category || productinfo.category,
            quantity: quantity || productinfo.quantity,
            pricePerQuantity: pricePerQuantity || productinfo.pricePerQuantity,
            image: product_logo || productinfo.image
        })

        return res.status(200).json({
            mssg: "Product updated successfully"
        })


    } catch (error) {
        console.log("edit product error", error)
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

module.exports = { 
    createProduct,
    productList,
    productDetails,
    editProduct
}