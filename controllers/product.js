const mongoose = require('mongoose');
const ErrorResponse = require("../utils/errorResponse");
const Product = require("../models/Product");
const Category = require("../models/Category");

// @desc    Get all products
exports.getAllProductsRoute = async (req, res, next) => {

  try {
    const products = await Product.find();

    if (products.length === 0) {
      return next(new ErrorResponse("No products found", 404));
    }
    
    res.status(200).json({ sucess: true, message: "Success", data:{products: products} });
  } catch (err) {
    next(err);
  }
};

//  @desc Get a product by id
exports.getProductByIdRoute = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Invalid product ID", 400));
  }

  try {
    const product = await Product.findById({_id:id});

    if (product == null) {
      return next(new ErrorResponse("No product found", 404));
    }

    res.status(200).json({ sucess: true, message: "Success", data:{product: product} });
  } catch (err) {
    next(err);
  }
};

//  @desc Get a product by id with all categories populated
exports.getProductByIdWithCategoriesPopulatedRoute = async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorResponse("Invalid product ID", 400));
  }

  try {
    const product = await Product.findById({_id:id}).populate({
      path: 'categories',
      select: 'title slug _id'
    });

    if (product == null) {
      return next(new ErrorResponse("No product found", 404));
    }

    res.status(200).json({ sucess: true, message: "Success", data:{product: product} });
  } catch (err) {
    next(err);
  }
};

//  @desc Get a product by slug
exports.getProductBySlugRoute = async (req, res, next) => {
  const { slug } = req.params;

  try {
    const product = await Product.findOne({slug});

    if (product == null) {
      return next(new ErrorResponse("No product found", 404));
    }

    res.status(200).json({ sucess: true, message: "Success", data:{product: product} });
  } catch (err) {
    next(err);
  }
};

// @desc Create a product
exports.createProductRoute =async (req, res, next) => {
  const { title, summary, slug, categories, content, defaultImage, otherImages} = req.body;

  try {
    const product = await Product.create({
      title,
      summary,
      slug,
      content,
      defaultImage,
      otherImages,
      categories,
    });

    await product.save();

    // Add categories to the product
    for (const categoryId of categories) {
      const category = await Category.findById(categoryId);
      if (category) {
        category.products.push(product._id);
        await category.save();
      }
    }

    res.status(201).json({ sucess: true, message: "Success", data:{product: product} });
  } catch (err) {
    next(err);
  }
};

// desc update a product
exports.updateProductRoute = async (req, res, next) => {
  const { id } = req.params;
  const { title, summary, slug, content, defaultImage, otherImages} = req.body;

  try {
    const product = await Product.findById({_id:id});

    if (product == null) {
      return next(new ErrorResponse("No product found", 404));
    }

    // We are using the if statements to check if the request body contains any properties that we want to update for the product. 
    // This is because we want to only update the properties that are included in the request body, and leave the other properties unchanged.
    if (title != null) {
      product.title = title;
    }

    if (summary != null) {
      product.summary = summary;
    }

    if (slug != null) {
      product.slug = slug;
    }

    if (content != null) {
      product.content = content;
    }
    
    if (defaultImage != null) {
      product.defaultImage = defaultImage;
    }

    if (otherImages != null) {
      product.otherImages = otherImages;
    }

    const updatedProduct = await product.save();

    res.status(200).json({ sucess: true, message: "Success", data:{product: updatedProduct} });
  } catch (err) {
    next(err);
  }
};

// @desc Delete a product
exports.deleteProductRoute = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById({_id:id});

    if (product == null) {
      return next(new ErrorResponse("No product found", 404));
    }

    await product.remove();

    res.status(200).json({ sucess: true, message: "Success", data:{product: product} });
  } catch (err) {
    next(err);
  }
};
