import { cloudinary } from '#common';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v4 as uuidv4 } from 'uuid';

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    let tags = [req?.headers?.resource, req?.body?.id, req?.params?.id];
    tags = tags.length > 0 ? tags : 'n/a';

    const allowed_formats = ['jpg', 'png', 'jpeg', 'gif', 'webp'];
    const folder = req?.headers?.resource || 'uploads';
    const sanitizedFilename = file?.originalname.replace(/[^a-zA-Z0-9]/g, '_');
    const public_id = `${sanitizedFilename}_${uuidv4()}`;
    const secure_url = cloudinary.url(public_id, { secure: true });

    cloudinary.api.create_folder(folder, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Folder created: ${folder}`);
      }
    });

    const cloudinaryOptions = {
      folder,
      public_id,
      resource_type: 'auto',
      secure_url,
      tags,
      allowed_formats,
    };

    // append cloudinary options to request file properties
    Object.assign(file, cloudinaryOptions);

    return cloudinaryOptions;
  },
});

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

export const upload = multer({ storage });

export { deleteFile, deleteFileOnError };

