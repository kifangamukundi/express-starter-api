const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please a title"],
    unique: true,
  },
  slug: {
    type: String,
    required: [true, "Please a slug"],
    unique: true,
  },
  summary: {
    type: String,
    required: [true, "Please the summary"],
  },
  content: {
    type: Object,
    required: [true, "Please a content"],
  },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  defaultImage: {
    secure_url: {
      type: String,
      required: false,
      default: "default_secure_url"
    },
    public_id: {
      type: String,
      required: false,
      default: "default_public_id"
    }
  },
  otherImages: [{
    secure_url: {
      type: String,
      required: false
    },
    public_id: {
      type: String,
      required: false
    }
  }],
  
//   Other dynamic fields
},
{
    timestamps: true
});

// Methods here

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
