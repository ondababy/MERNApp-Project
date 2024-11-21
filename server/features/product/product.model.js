// import { Schema } from '#lib';
// import { ImageSchema } from '#utils';
// import mongoose from 'mongoose';

// const Product = new Schema({
//   name: 'Product',
//   schema: [
//     {
//       name: {
//         type: String,
//         unique: [true, 'Product name must be unique!'],
//         required: [true, 'Product name is required!'],
//       },
//       category: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Categories',
//       },
//       description: {
//         type: String,
//       },
//       slug: {
//         type: String,
//       },
//       price: {
//         type: Number,
//         required: [true, 'Product price is required!'],
//       },
//       stock: {
//         type: Number,
//         required: [true, 'Product price is required!'],
//       },
//       brand: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Brands',
//       },
//       supplier: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Suppliers',
//       },

//       images: [ImageSchema],
//     },
//     { timestamps: true },
//   ],
// });

// Product.statics.fillables = [];
// Product.statics.hidden = [];

// export default Product.makeModel();


import { Schema } from '#lib';
import { ImageSchema } from '#utils';
import mongoose from 'mongoose';

const Product = new Schema({
  name: 'Product',
  schema: [
    {
      name: {
        type: String,
        unique: [true, 'Product name must be unique!'],
        required: [true, 'Product name is required!'],
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories',
      },
      description: {
        type: String,
      },
      slug: {
        type: String,
      },
      price: {
        type: Number,
        required: [true, 'Product price is required!'],
      },
      stock: {
        type: Number,
        required: [true, 'Product price is required!'],
      },
      brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brands',
      },
      supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Suppliers',
      },
      numOfReviews: {
        type: Number,
        default: 0,
      },
      ratings: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
      images: [ImageSchema],
    },
    { timestamps: true },
  ],
});

Product.statics.fillables = [];
Product.statics.hidden = [];

export default Product.makeModel();
