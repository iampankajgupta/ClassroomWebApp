const {
    register,
    login,
    uploadImage
} = require('./users.controller');
const { checkToken } = require('../../auth/token_validation');
// const { route } = require('../classroom/classroom.router');

const router = require('express').Router();

// const multer = require('multer');
// const path = require('path');

// // const {
// //     checkToken
// // } = require('../../auth/token_validation');
// const storage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'../../public')
//     },

//     filename:function(req,file,cb){
//         const ext = file.mimetype.split('/')[1];
//         next(null,file.fieldname+"-"+Date.now()+"."+ext);
//         // cb(null,file.filename+'-'+Date.now()+path.extname(file.originalname));
//     }
// })

// let upload = multer({
//     storage:storage
// });

router.post('/register', register);

router.post('/uploadImage',uploadImage)
// router.post('/uploadImage',fileUpload);

// router.post('/upload',upload.single('myImage'), (req, res) => {
//     const file = req.file;
//     if(!file){
//         return (console.log("Error Occured"))
//     }
//     return res.status(200).send(req.file);
// })


router.post('/login', login);   

module.exports = router;