import multer from 'multer';

const upload = multer();

const imageUpload = {
  none: upload.none(),
  consultantSignup: upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'validCertificate', maxCount: 1 },
    { name: 'validIdCard', maxCount: 1 }])
};

export default imageUpload;
