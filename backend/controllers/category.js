const Category = require('../models/category')
const fs = require('fs')
const path = require('path')
const { createCategorySchema } = require('../helper/validation')

//category api
const createCategory = async (req, res) => {    //createCategory function to create new category in database and attach it to req.user variable in request object of next function
    try {
        const { error } = createCategorySchema.validate(req.body);  //validation
        if(error){
            console.log("error", error)
            return res.status(400).json({
                mssg: error.details[0].message
            })
        }

        if(!req.files || Object.keys(req.files).length === 0){  //if no file is uploaded
            return res.status(400).json({
                mssg: "No file uploaded"
            })
        }

        const { name } = req.body;     //get the category name from request body
        let image = req.files.image;    
        image.name = Date.now() + "_" + image.name;    //rename the image with timestamp

        const uploadDir = path.join(__dirname, '..', 'uploads', 'category')  //path to upload directory

        if(!fs.existsSync(uploadDir)){     //create directory if it does not exist
            fs.mkdirSync(uploadDir, { recursive: true })
        }

        const category_logo = `${process.env.BASE_URL}/category/${image.name}`;    //path to image

        image.mv(path.join(uploadDir, image.name), function(error){  //move image to upload directory
            if(error){
                console.log("error on file upload", error);
                return res.status(500).json({
                    mssg: "Server error on uploading file"
                })
            }
        })

        const category = await Category.create({     //creating category in database
            name: name,
            logo: category_logo
        })

        return res.status(201).json({
            mssg: "Category created successfully",
            data: {
                category
            }
        })

    } catch(error) {
        return res.status(500).json({
            mssg: "Internal server error, try again"
        })
    }
}

//category listing api
const categoryList = async (req, res) => {
    try {
        const { limit = 10, offset = 1 } = req.query; //offset = pagenumber & limit = number of records per page
        const skip = (offset-1) * limit;  //offset = 1 , skip = 0 // offset = 2 skip = 2-1 * limit == 10//
        const categories = await Category.find().skip(skip).limit(limit);   //fetching categories from database
        const total = await Category.countDocuments();  //counting total number of categories

        return res.status(200).json({
            mssg: "Category list",
            data:{ 
                categories,
                pagination: {
                    limit: limit,
                    offset: offset,
                    total: total
                }
            }
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error, try again"
        })
    }
}

module.exports = {
    createCategory,
    categoryList
}