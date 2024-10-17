import { cloudinary } from '#common';

const deleteFiles = async (publicIds) => {
  await cloudinary.api.delete_resources(publicIds);
};

const deleteFile = async (publicId) => {
  await cloudinary.uploader.destroy(publicId);
};

const deleteFileOnError = async (req, res, next) => {
  try {
    await next();
  } catch (error) {
    await deleteFile(req.file.public_id);
    throw error;
  }
};

export { deleteFile, deleteFileOnError, deleteFiles };

