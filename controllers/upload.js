const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');
const multer = require('multer');
const ErrorResponse = require("../utils/errorResponse");

const upload = multer();

exports.imageUpload = async (req, res, next) => {
  try {
    upload.array('files')(req, res, async (err) => {
      if (err) {
        return next(new ErrorResponse("Error uploading files", 400));
      }
      
      if (!req.files) {
        return next(new ErrorResponse("No files passed", 400));
      }
      
      const cloudinaryConfig = {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      };
      
      cloudinary.config(cloudinaryConfig);

      const streamUploads = req.files.map((file) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });
          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      });

      const results = await Promise.all(streamUploads);
      res.send(results);
    });
  } catch (error) {
    next(error);
  }
};
