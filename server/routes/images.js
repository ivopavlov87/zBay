
// const express = require("express");
// const router = express.Router();
// const mongoose = require('mongoose');
// const keys = require('../../config/keys');

// const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const fs = require("fs");


// // DB SETUP
// const mongoURI = keys.MONGO_URI;

// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return {
//       bucketName: 'images',
//       filename: file.originalname,
//       metadata: req.body
//     }
//   }
// });
// const upload = multer({ storage });

// const conn = mongoose.createConnection(mongoURI);
// let gfs;

// conn.once('open', () => {
//   // Init stream
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection('images');
// });


//IMAGES ROUTES
// router.post('/', upload.single('image'), (req, res) => {

  // console.log('req file is', req.file);

  // const img = fs.readFileSync(req.file.path);
  // const encode_image = img.toString('base64');
  // // Define a JSONobject for the image attributes for saving to database
  // const finalImg = {
  //     contentType: req.file.mimetype,
  //     image: Buffer.from(encode_image, 'base64')
  // };

  // gfs.collection("images").insert(finalImg, (err, result) => {
  //     console.log(result)
  //     if (err) return console.log(err)
  //     console.log('saved to database')
  // })
//   res.redirect('/')
// });


// router.get("/:homeId", (req, res) => {
//   gfs.files.findOne({ "metadata.homeId": req.params.homeId }, (err, files) => {
//     // Check if file
//     if (!files || files.length === 0) {
//       return res.status(404).json({
//         err: "No file exists"
//       });
//     }

//     if (!files || files.length === 0) {
//       return res.status(404).json({
//         responseCode: 1,
//         responseMessage: 'error'
//       });
//     }

//     var readstream = gfs.createReadStream({
//       filename: files.filename
//     });
    // set the proper content type
    // res.set('Content-Type', files.contentType);
    // Return response
    // return readstream.pipe(res);

    // Array.from(files).forEach(file => {
    //   const readstream = gfs.createReadStream(file.filename);
    // })

    // const readstream = gfs.createReadStream(files.filename);
    // console.log(files);
    // if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
    //   // Read output to browser
    //   const readstream = gfs.createReadStream(file.filename);
    //   readstream.pipe(res);
    // } else {
    //   res.status(404).json({
    //     err: "Not an image"
    //   });
    // }
//   });
// });

// router.get('/', (req, res) => {
//   gfs.files.find().toArray((err, files) => {
//     // Check if files
//     if (!files || files.length === 0) {
//       return res.status(404).json({
//         err: 'No files exist'
//       });
//     }

//     // Files exist
//     return res.json(files);
//   });
// });


// module.exports = router;