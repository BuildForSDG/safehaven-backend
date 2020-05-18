import cloudinary from 'cloudinary';
import uuid from 'uuid';
import path from 'path';
import Datauri from 'datauri';
import upload from '../utils/multer-config';

require('../config/cloudinaryconfig');

const duri = new Datauri();

const uploadimage = async (field, uploadFile, publicId = {}) => {
  const file = uploadFile[0];
  upload.single(field);
  const dataUri = duri.format(path.extname(file.originalname).toString(), file.buffer);
  const { content } = dataUri;

  const result = await cloudinary.v2.uploader.upload(content, {
    public_id: publicId === {} ? `safehaven/${publicId}` : `safehaven/${uuid()}`
  });
  return result.secure_url;
};

export default uploadimage;
