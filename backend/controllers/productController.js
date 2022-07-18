const Product = require("../models/productModel");


// createProduct --Admin
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
};

// getAllProducts
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
}

// Get Product Detail
exports.getProductDetails = async(req,res,next) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    if(!product)
    {
        return res.status(500).json({success:false,message:"Product Not Found"})
    }
    console.log(product);
    res.status(200).json({success:true,product});

}
// Update Product
exports.updateProduct = async (req, res, next) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if(!product)
    {
        return res.status(500).json({success:false,message:"Product not found"});
    }
    product = await Product.findByIdAndUpdate(id,req.body,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200).json({success:true,product});
}

// Delete Product
exports.deleteProduct = async(req,res,next) => {
    const id = req.params.id;
    let product = await Product.findById(id);
    if(!product)
    {
        return res.status(500).json({success:false,message:"Product not found"});
    }
    await product.remove();
    console.log(product);
    res.status(200).json({success:true,message:"Product Deleted Successfully"});
};