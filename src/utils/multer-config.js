import multer from 'multer';

export default multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
      return cb(new Error('Please upload a valid file type'));
    }
    cb(undefined, true);
  },
});
