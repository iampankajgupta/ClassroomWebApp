const {
    create,
    checkUserExists,
    getEmail,
    uploadImage
} = require('./user.service');
const {
    genSaltSync,
    hashSync,
    compareSync
} = require('bcrypt');

const {
    sign
} = require('jsonwebtoken');

const path = require('path');
const multer = require('multer');

let Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "../../public");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 1000000
    },
}).single("myImage");

module.exports = {
    register: (req, res) => {
        const body = req.body;
        checkUserExists(body.email, (err, results) => {
            if (!results) {
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                create(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send("Database Connection Error");
                    }

                    results.password = undefined;
                    const jsonToken = sign({
                        user: results
                    }, process.env.ENCRYPT_KEY, {
                        expiresIn: "3h"
                    });
                    return res.header("x-auth-token", jsonToken).header("access-control-expose-headers", "x-auth-token").status(200).send(results);

                    // if (!results) {
                    //     return res.send("No files are uploaded");
                    // }

                    // let file = req.files.uploaded_image;
                    // let img_name = file.name;

                    // if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {

                    //     file.mv('../../public' + file.name, function (err) {
                    //         if (err) {
                    //             return res.status(500).send(err);
                    //         }

                    //     })
                    // }
                })
            } else {
                return res.status(400).send("Email is Already Registered");
            }
        })


    },

    // uploadImage: (req, res) => {
    //     const body = req.body;
    //     // uploadImage(body, (err, results) => {
    //     //     if (err) {
    //     //         return res.status(400).send('Error During Image Uploading');
    //     //     }
    //     //     return res.status(200).send(results);
    //     // })
    // },

    uploadImage: (req, res) => {
        uploadImage(req.body,(err,results)=>{
            if(err){
                return res.status(400).send("Error Occured While Uploading Image");
            }
            console.log(req.body.file);
            console.log(results);
            return res.send(results);
        })
    },

    // fileUpload: (req, res) => {
    //     upload(req.body, res, function (err) {
    //         if (err) {
    //             return res.send("something went wrong");
    //         }
    //         return res.send("File Uploaded Successfully");
    //     })
    // },





    // getEmail(body.email, (err, results) => {
    //     if (err) {
    //         console.log(err);
    //     }
    //     if (results) {
    //         return res.status(400).send("Email already registered");
    //     } else {
    //         // uploads = () => {
    //         //     if (req.fileValidationError) {
    //         //         return res.send(req.fileValidationError);
    //         //     } else if (!req.file) {
    //         //         return res.send('Please select an image to upload');
    //         //     } else if (err instanceof multer.MulterError) {
    //         //         return res.send(err);
    //         //     } else if (err) {
    //         //         return res.send(err);
    //         //     }
    //         //     res.send(req.file.path);
    //         // }
    //     }
    // });

    // // updateUsers: (req, res) => {
    //     const body = req.body;
    //     const salt = genSaltSync(10);
    //     body.password = hashSync(body.password, salt);
    //     updateUsers(body, (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return false;
    //         }
    //         if (!results) {
    //             return res.json({
    //                 success: 0,
    //                 message: "Failed to update the user"
    //             });
    //         }
    //         return res.json({
    //             success: 1,
    //             message: "Updated Successfully"
    //         });
    //     });
    // },
    // deleteUser: (req, res) => {
    //     const body = req.body;

    //     deleteUser(body, (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return;

    //         }
    //         if (!results) {
    //             return res.json({
    //                 success: 0,
    //                 message: "Record not found"
    //             });
    //         }
    //         return res.json({
    //             success: 1,
    //             message: "Record deleted Successfully"

    //         });
    //     });
    // },
    login: (req, res) => {
        const body = req.body;
        getEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(400).send("Invalid email or password");
            }
            // comparing the given pass and existing pass with that email 
            const result = compareSync(body.password, results.password);
            // if the email and password matches then we will do 
            if (result) {
                results.password = undefined; // i don't want to pass the password in json web token i.e why undefined

                //  creating the jwt 
                // sign function takes 3 params [ from jwt ] 
                // 1.the data which we form jwt 
                // 2.the encryption key with which i generating the jwt 
                // 3.the time duration under which the token is valid i.e 1 minute or 1 hour after which the token expires

                const jsonToken = sign({
                    result: results
                }, process.env.ENCRYPT_KEY, {
                    expiresIn: "3h"
                });
                // res.header("x-auth-token",jsonToken);
                // return res.status(200).send(jsonToken); // return the jwt
                return res.status(200).send(jsonToken);
            } else {
                //  i.e if the email or password doesn't match then we will give this error 
                return res.status(400).send("Invalid email or password");
            }
        })
    },
}